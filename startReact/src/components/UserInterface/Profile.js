import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    FlatList,
    ActivityIndicator,
    ListItem
} from 'react-native';
import Fireabse from'../Firebase';
import * as firebase from 'firebase'
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data : {}
        };
    }
    componentDidMount() {
        this.getUserInfo();
    }
    getUserInfo(){
        const data = this.state.data;
        firebase.auth().onAuthStateChanged(function (users) {
            if (users) {
                    this.setState({data : users})
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} enabled>
                <View style={styles.contentContainer} >
                    <ScrollView
                        style={styles.container}>
                        <Text>Dashboard</Text>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
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
        fontSize: 25,
        alignItems: 'center',
    },
    text: {

    }
});