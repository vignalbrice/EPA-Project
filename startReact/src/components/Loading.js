// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class Loading extends React.Component {
      componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Profile' : 'Home')
    })
  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white', fontSize:18}}>Chargement..</Text>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0984e3"
    },
    ImgBack: {
        width: 300,
        height: 300
    },
})