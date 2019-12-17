import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import Firebase from '../Firebase';
import DatePicker from 'react-native-datepicker';

var today = new Date();

export default class Register extends Component {
      constructor(props) { 
        super(props); 
        this.state ={
            prenom:'',
            nom:'',
            email:'',
            password:'',
            age:'',
            date:today
        }
    }
    //Registration Into Database Firebase

    async _register() {
        const {email, password} = this.state;
        Firebase.registrationInfo.email = email;
        try{
            await Firebase.auth.createUserWithEmailAndPassword(email, password).then(()=>{
                if (Firebase.auth.currentUser) {
                    userId = Firebase.auth.currentUser.uid;
                    if (userId) {
                console.warn("Writting data ")
                var today = new Date();
                        Firebase.database.ref(`users/${userId}`).set({
                            nom: this.state.nom,
                            prenom: this.state.prenom,
                            birthday: this.state.date,
                            age: this.state.age,
                            email: this.state.email,
                            registered: today
                        });
                    }
                }
            })
            this.props.navigation.navigate('Profile');
        }catch(e){
            alert(e);
        }

    }
    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../img/reg.png')} style={styles.ImgBack} />
                        </View>
                        <View style={styles.regContainer}>
                            <TextInput style={styles.input} placeholder="Nom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(nom) => this.setState({ nom })}/>
                            <TextInput style={styles.input} placeholder="Prénom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(prenom) => this.setState({ prenom })}/>
                            <TextInput style={styles.input} placeholder="Age" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(age) => this.setState({ age })}/>
                            
                            <DatePicker
                            style={{color:'white'}}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            maxDate="31-12-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                    borderColor: '#34495e',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginLeft: 36,
                                    paddingLeft: 15,
                                },
                                dateText: {
                                    fontSize: 14,
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                            />
                            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(email) => this.setState({ email })}/>
                            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.7)" onChangeText={(password) => this.setState({ password })} secureTextEntry returnKeyType="go" />
                            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._register()}>
                                <Text style={styles.buttonText}>S'inscrire</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{paddin:20, color:"white", backgroundColor:'#2ecc71'}}
                            ><Text>
                                Vous avez déjà un compte ? Connexion
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    regContainer :{
        padding:15
    },
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        color: 'white', 
        },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop:10
    },
    ImgBack: {
        width: 200,
        height: 200
    },
    title: {
        color: '#FFF',
        marginTop: 5,
        width: 160,
        textAlign: 'center',
        fontSize: 18,
        opacity: 0.9
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        padding: 15,
        marginBottom: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.0)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        borderBottomWidth: 1
    }
});