import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, ScrollView,TextInput,TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user :{}
        }
    }

    async _login() {
        const { email, password } = this.state;
        const userData = this.state.user;
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){
                console.log(user);
                this.props.navigation.navigate('Profile');
            });
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
                        <Image source={require('../../img/movies.png')} style={styles.ImgBack} />
                        <Text style={styles.title}>An app made for list all films around the worlds</Text>
                    </View>
                    <View style={styles.formContainer}>
                            <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(email) => this.setState({ email })} />
                            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.7)" onChangeText={(password) => this.setState({ password })} secureTextEntry returnKeyType="go" />
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._login()}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 0,

    },
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        color: 'white'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
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
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.0)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
    formContainer:{
        marginTop:10,
        padding:20
    }
});