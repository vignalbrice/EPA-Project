import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import Firebase from '../Firebase';
export default class Register extends Component {
      constructor(props) { 
        super(props); 
        this.state ={
            prenom:'',
            nom:'',
            email:'',
            password:''
        }
    }
    //Registration Into Database Firebase
    async _register() {
        const { prenom, nom, email, password } = this.state;
        Firebase.registrationInfo.displayName = prenom + ' ' + nom;
        Firebase.registrationInfo.email = email;
        try{
            await Firebase.auth.createUserWithEmailAndPassword(email, password);
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
                            <TextInput style={styles.input} placeholder="Prénom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(prenom) => this.setState({ prenom })}/>
                            <TextInput style={styles.input} placeholder="Nom" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(nom) => this.setState({ nom })}/>
                            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(email) => this.setState({ email })}/>
                            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.7)" onChangeText={(password) => this.setState({ password })} secureTextEntry returnKeyType="go" />
                            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this._register()}>
                                <Text style={styles.buttonText}>S'inscrire</Text>
                            </TouchableOpacity>
                            <Button
                                title="Already have an account? Login"
                                onPress={() => this.props.navigation.navigate('Login')}
                            />
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