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
                <Image source={require('../img/kisspng-rocket.png')} style={{width:200,height:200}}/>
                <Text style={{color:'#FFF', fontSize:18}}>Innovation is the future..</Text>
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