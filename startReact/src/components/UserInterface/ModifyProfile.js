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
    Button,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import * as firebase from 'firebase'
import Firebase from '../Firebase';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var sexe = [
    {label: "Mr", value: 0},
    {label: "Mme", value: 1},
  ];

export default class ModifyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            dataUsers:{},
            isLoading:true,
            email:'',
            nom:'',
            prenom:'',
            age:'',
            tel:'',
            value:'',
            label:sexe

        };
    }
    componentDidMount(){
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
                tel: !data.val() ? data.val() : data.val().tel
            })
            this.setState({
                isLoading: false,
                dataUsers : dataUsers
            })
        })
    }

   async _updateProfile(){
        let userId = Firebase.auth.currentUser.uid;
        Firebase.database.ref(`users/${userId}`).on('value', (data) => {
        var nom = data.val().nom;
        var prenom = data.val().prenom;
        var email = data.val().email;
        var tel = data.val().tel;
        var label = data.val().label;

        Firebase.database.ref(`users/${userId}`).update({
            nom: this.state.nom ? this.state.nom : nom,
            prenom: this.state.prenom ? this.state.prenom : prenom,
            email: this.state.email ? this.state.email : email,
            tel: this.state.tel && this.state.tel > 0 ? this.state.tel : tel,
            label: this.state.label && this.state.label > 0 ? this.state.label : label
        }).then(snapshot =>snapshot.val()).catch(error=>({
            errorCode: error.code,
            errorMessage : error.message
        }));
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
          const {email, nom, prenom, age, tel, label} = this.state;
          return  dataUsers.map((item)=>(
            <KeyboardAvoidingView behavior='padding' style={styles.container} enabled>
                <View style={styles.contentContainer} >
                    <ScrollView
                        style={styles.container}>
                        <View style={styles.contentDesc}>
                            <Text style={{textTransform:'uppercase', color:'#333'}}>Mes Identifiants</Text>
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold'}}>E-mail*</Text>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5 }} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(email) => this.setState({ email })} value={email ? email : item.email } />
                        </View>
                        <View style={styles.contentDesc}>
                            <Text style={{textTransform:'uppercase', color:'#333'}}>Mes Informations Personnelles</Text>
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold',marginTop:5,marginBottom:5}}>Vous êtes </Text><RadioForm
                                radio_props={sexe}
                                initial={0}
                                onPress={(label) => {label.toString()}}
                                buttonSize={10}
                                labelStyle={{ fontSize: 12, }}
                                disabled={false}
                                formHorizontal={false}
                                />
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold'}}>Nom</Text>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,marginBottom:5 }} placeholder="Nom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(nom) => this.setState({ nom })} value={nom ? nom : item.nom} />
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold'}}>Prenom</Text>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,marginBottom:5 }} placeholder="Prenom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(prenom) => this.setState({ prenom })} value={prenom ? prenom : item.prenom} />
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold'}}>Téléphone</Text>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,marginBottom:5 }} placeholder="Téléphone" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(tel) => this.setState({ tel })} value={tel ? tel : item.tel} />
                            <Text style={{color:'#bdc3c7', fontSize:12, fontWeight:'bold'}}>Date de naissance</Text>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:5,marginBottom:5 }} placeholder="Date de naissance" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(birthday) => this.setState({ birthday })} value={item.birthday} />
                        </View>
                        <View style={{marginLeft: 15,
                                marginRight: 15,
                                padding:20}}>
                            <TouchableOpacity onPress={() => this._updateProfile()} style={styles.buttonModifyProf}>
                                <Text style={{color:"#FFF",textAlign:'center'}}>Enregistrer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.buttonAnnule}>
                                <Text style={{color:"#FFF",textAlign:'center'}}>Annuler</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
      )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        color: '#FFF',
        fontSize: 25
    },
    text: {

    },
    buttonModifyProf: {
        marginTop:10,
        padding: 15,
        backgroundColor: '#2ecc71'
    },
    buttonAnnule:{
        marginTop:20,
        padding: 15,
        backgroundColor: '#e74c3c'
    },
    contentDesc:{
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
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom:10,
        padding:20
    }
});