import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    FlatList,
    ActivityIndicator,
    ListItem,
    Image,
    TouchableOpacity,
    Button,
    YellowBox 
} from 'react-native';
import Firebase from '../Firebase';
import { faPager,faBirthdayCake, faEnvelope, faPlusCircle, faStar, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ImagePicker from "react-native-image-picker";
import { Overlay } from 'react-native-elements';
import _ from 'lodash';


export default class Profile extends React.Component {
    constructor(props) {
        
        super(props);
        YellowBox.ignoreWarnings(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
          if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
          }
        };
        this.state = {
            isLoading :true,
            currentUser: null,
            isVisible: false,
            dataUsers :{},
            avatar: require('../../img/ic_tag_faces.png')
        };
    }

    async componentWillUnmount(){
       this.handleChoosePhoto;
    }
    /** Fonction d'upload de la photo */
    handleChoosePhoto = () =>{
        const options ={};
        ImagePicker.showImagePicker({options}, (response) => {
            if (response.didCancel) {
              console.log('L\'utilisateur a annulé')
            }
            else if (response.error) {
              console.log('Erreur : ', response.error)
            }
            else {
              console.log('Photo : ', response.uri )
              let requireSource = { uri: response.uri }

              this.setState({
                avatar: requireSource,
                isVisible: true
              },()=>{
                var userId = Firebase.auth.currentUser.uid;
                Firebase.database.ref('users/' + userId).update({
                      photoUri: requireSource
                },
                console.log('Update Photo'));
              })
              alert('Photo successfully added !')
            }
          })
    }
    componentDidMount() {
        const { currentUser } = Firebase.auth;
        this.setState({ currentUser })
        var userId = Firebase.auth.currentUser.uid;
        var dataUsers = [];
        Firebase.database.ref(`users/${userId}`).on('value', (data) => {
            dataUsers.push({
                nom : data.val().nom,
                prenom : data.val().prenom,
                birthday : data.val().birthday,
                age : data.val().age,
                email : data.val().email,
                photo: data.val().photoUri
            })
            this.setState({
                isLoading: false,
                dataUsers : dataUsers
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
              </View>
            );
          }
        const dataUsers = this.state.dataUsers;

        return dataUsers.map((item)=>( 
            <KeyboardAvoidingView behavior='padding'   keyboardVerticalOffset={
                Platform.select({
                   ios: () => 0,
                   android: () => 200
                })()
              } style={styles.container} enabled>
                <View style={styles.contentContainer} >
                    <ScrollView
                        style={styles.container}>
                            <View style={styles.logoContainer}>
                                <TouchableOpacity 
                                        onPress={this.handleChoosePhoto}>
                                <Image source={item.photo == null ? this.state.avatar : item.photo} style={styles.ImgBack} 
                                    PlaceholderContent={<ActivityIndicator/>}/>
                                
                                <FontAwesomeIcon icon={faPlusCircle} size={48} style={{marginLeft:100,marginTop:-30,marginBottom:10, color:'#FFF'}}/>
                                </TouchableOpacity>
                            </View>
                                <Text style={{textAlign: 'center', fontSize:18,
                                         color:'#FFF'}}>{`${item.nom} ${item.prenom}`}</Text>
                                <Text style={{textAlign: 'center',textTransform:'lowercase',
                                         color:'#FFF',marginBottom:10}}>{`@${item.nom}${item.prenom}`}</Text>
                            <View style={styles.contentDetails}>
                            <Text style={{fontSize:16, fontWeight:'bold',marginBottom:5}}>Mes Infos Personnelles</Text>
                                <TouchableOpacity 
                                    onPress={()=>this.props.navigation.navigate('ModifyProfile')}>
                                <Text style={styles.textImg}>
                                    <FontAwesomeIcon icon={faPager} style={styles.itemImg} size={ 16 } /> {item.age} Ans
                                </Text>
                                <Text style={styles.textImg}>
                                        <FontAwesomeIcon icon={faBirthdayCake} style={styles.itemImg} size={ 16 }/> {item.birthday}
                                </Text>
                                <Text style={styles.textImg}>
                                        <FontAwesomeIcon icon={faEnvelope} style={styles.itemImg} size={ 16 }/> {item.email}
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between'}}>
                                <View style={styles.contentSeparated}>
                                    <Text style={{fontSize:16, fontWeight:'bold',marginBottom:7}}>Mes Favoris</Text>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyFavoris')}>
                                    <FontAwesomeIcon icon={faStar} size={48} style={{color:'#f1c40f', margin:'auto'}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contentSeparated}>
                                    <Text style={{fontSize:16, fontWeight:'bold',marginBottom:10}}>Mon Historique</Text>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyHistory')}>
                                    <FontAwesomeIcon icon={faHistory} size={48} style={{color:'#bdc3c7', textAlign:'center'}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                                <TouchableOpacity
                                    onPress={() => Firebase.auth.signOut()}
                                    style={styles.btnlogout}>
                                        <Text style={{color:'#FFF',
                                                      textAlign:'center',
                                                      fontSize:15,
                                                    }}>Deconnexion
                                        </Text>
                                </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        ))
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#34495e",
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        color: '#FFF',
        fontSize: 25,
        marginLeft:20,
        marginRight:20,
        marginBottom:20

    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop:10
    },
    text: {
        color:'#FFF'
    },

    ImgBack: {
        width: 150,
        height: 150,
        borderRadius:200
    },
    contentDetails:{
        backgroundColor:'#FFF',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#FFF',
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding:20
    },
    itemImg:{
        marginTop:-40,
        paddingTop:20,
        color:'#333',
    },
    textImg:{
        color:'#333',
        fontSize:18,
        alignItems:'center',
    },
    btnlogout:{
        marginTop:20,       
        padding:15,
        backgroundColor:"#c0392b",
    },
    contentSeparated:{
        backgroundColor:'#FFF',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#FFF',
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width:'45%',
        alignItems:"center",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 5,
        marginRight: 6,
        marginTop: 15,
        padding:20
    }
});