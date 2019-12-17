// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import  FilmList  from "./FilmList";

class MyFavoris extends React.Component {
    
    render() {
        return (
            <FilmList
                films={this.props.favoriteFilms}
                navigation={this.props.navigation}
                favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
            />
        )
    }
}

const styles = StyleSheet.create({
    title : {
        textAlign: 'center'
    }
})
const mapStateToProps = state => {
    return {
        favoriteFilms: state.favoriteFilms
    }
}

export default connect(mapStateToProps)(MyFavoris)