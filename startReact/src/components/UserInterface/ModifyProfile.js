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
    TextInput
} from 'react-native';
import * as firebase from 'firebase'
import Firebase from '../Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class ModifyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            email : "",
            name : "",
            photo: {},

        };
    }
    componentDidMount() {
        const { currentUser } = Firebase.auth;
        this.setState({ currentUser })
    }
    _updateProfile = () =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: this.setState({name}),
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    render() {
        const { name } = this.state.name;
        const { email } = this.state.email;

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container} enabled>
                <View style={styles.contentContainer} >
                    <ScrollView
                        style={styles.container}>
                        <Text>Modification du profil</Text>
                        <Text>Email : </Text><TextInput placeholder="Email" placeholderTextColor="rgba(255,255,255,0.7)" returnKeyType="next" onChangeText={(email) => this.setState({ email })} />
                        <TouchableOpacity onPress={() => this._updateProfile()} style={styles.buttonModifyProf}><Text>Enregistrer les modifications</Text></TouchableOpacity>
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

    },
    buttonModifyProf: {
        padding: 15,
        backgroundColor: '#ecf0f1'
    }
});