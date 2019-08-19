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
} from 'react-native';
import * as firebase from 'firebase'
import Firebase from '../Firebase';
export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }
    componentDidMount() {
        const { currentUser } = Firebase.auth;
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} enabled>
                <View style={styles.contentContainer} >
                    <ScrollView
                        style={styles.container}>
                        <Text>Settings</Text>
                        <Text>
                            Bienvenue {currentUser && currentUser.email} !
                        </Text>
                        <Button
                            title="Sign out"
                            onPress={() => firebase.auth().signOut()}
                        />
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