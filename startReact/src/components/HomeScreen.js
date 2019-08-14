import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
export default class HomeScreen extends Component {
    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <Image source={require('../img/kisspng-rocket.png')} style={styles.ImgBack} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.buttonContainer}><Text styles={styles.buttonText}>Connectez-vous</Text></TouchableOpacity>
                    <Text styles={{color:"#FFF"}}>Ou</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonSubscribe}><Text styles={styles.buttonText}>S'inscrire</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    ImgBack: {
        width: 300,
        height: 300
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
        padding:15,
        marginBottom:5
    },
    buttonSubscribe:{
        marginTop:5,
        backgroundColor: '#c0392b',
        padding: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#ecf0f1'
    }
});