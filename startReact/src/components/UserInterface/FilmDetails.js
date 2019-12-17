// Components/FilmDetail.js

import React from 'react';
import { StyleSheet, Share, View, ActivityIndicator, ScrollView, Text, Image, Platform, TouchableOpacity  } from 'react-native';
import { getFilmDetails, getImageFromApi } from '../../API/API'
import moment from 'moment';    
import numeral from 'numeral';
import { connect } from'react-redux';
import EnlargeShrink from'../../animations/EnlargeShrink';
import Firebase from '../Firebase';

class FilmDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../../img/ic_share.ios.png')} />
                </TouchableOpacity>
            }
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true,
            currentUser : null
        }
    }
    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    componentDidMount(){
        const { currentUser } = Firebase.auth;
        this.setState({ currentUser });
        const favoriteFilmIndex = this.props.favoriteFilms.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
            // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
                film: this.props.favoriteFilms[favoriteFilmIndex]
            }, () => { 
                this._updateNavigationParams() 
            })
            return
        }
        // Le film n'est pas dans nos favoris, on n'a pas son détail
        // On appelle l'API pour récupérer son détail
        this.setState({ isLoading: true })
        getFilmDetails(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })

    }
    _shareFilm(){
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }
    _displayFloatingActionButton(){
        const { film } = this.state
        if(film != undefined && Platform.OS ==='android'){
            return(
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../../img/_ic_share.android.png')}/>
                </TouchableOpacity>
            )
        }
    }
     componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoriteFilms)
    }
    _displayFavoriteImage() {
        var sourceImage = require('../../img/ic_favorite_border.png')
        var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
        if (this.props.favoriteFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../../img/ic_favorite.png')
            shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
        }
        return (
            <EnlargeShrink
                shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }
    _toggleFavorite(){
        const action = { type : "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
        let userId = Firebase.auth.currentUser.uid;
        Firebase.database
        .ref()
        .child(`users/${userId}`).update({
            films : this.state.film
        },
        console.log('Update Data'));
    }
    _displayFilm(){
        const film = this.state.film
        if(film != undefined){
            return(
                <ScrollView  style={styles.scollview}>
                    <Image style={styles.image} source={{ uri: getImageFromApi(film.backdrop_path)}}/>
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity style={styles.favorite_container} title="Favoris" onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.desc}>{film.overview}</Text>
                    <Text style={styles.defaulttxt}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.defaulttxt}>Note : {film.vote_average}/10</Text>
                    <Text style={styles.defaulttxt}>Nombres de votes : {film.vote_count}</Text>
                    <Text style={styles.defaulttxt}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.defaulttxt}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.defaulttxt}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }
    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
        <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayFilm()}
            {this._displayFloatingActionButton()}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      scrollview:{
          flex:1
    }, image: {
        height: 169,
        margin: 5
    },
    title :{
        textAlign:'center',
        fontSize: 30,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10
    },
    desc:{
        marginBottom:10,
        color:'#444444',
        fontStyle:'italic'
    },
    sortie :{

    },
    favorite_container:{
        alignItems: 'center'
    },

    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
})
const mapStateToProps = (state) =>{
    return {
        favoriteFilms : state.favoriteFilms
    }
}

export default connect(mapStateToProps)(FilmDetail)