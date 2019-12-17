import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCRw4LfcXmlHrOBQ8-0p_azJAN0Zi2ukJo",
    authDomain: "startreact-97b36.firebaseapp.com",
    databaseURL: "https://startreact-97b36.firebaseio.com",
    projectId: "startreact-97b36",
    storageBucket: "startreact-97b36.appspot.com",
    messagingSenderId: "216815858395",
    appId: "1:216815858395:web:2dba9ecd21617420"
};
export default class Firebase{
    static auth;
    static storage;
    static registrationInfo = {
        displayName :"",
        email:""
    }
    static init(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        console.log(firebase);
        Firebase.auth = firebase.auth();
        Firebase.facebookProvider = firebase.auth.FacebookAuthProvider();
        Firebase.storage =  firebase.storage();
        Firebase.database = firebase.database();
    }
}
