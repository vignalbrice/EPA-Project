import {
    createBottomTabNavigator,
    createAppContainer,createStackNavigator
} from 'react-navigation';
import React from 'react';
import { Platform } from 'react-native';
import {
    Easing,
    Animated,
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import Profile from '../components/UserInterface/Profile';
import Feed from '../components/UserInterface/Feed';
import ModifyProfile from '../components/UserInterface/ModifyProfile';
import MyHistory from '../components/UserInterface/MyHistory';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import FilmDetails from '../components/UserInterface/FilmDetails';
import MyFavoris from '../components/UserInterface/MyFavoris';

const SearchStackNavigator = createStackNavigator({
    Feed: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Feed,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetails,
        navigationOptions: {
            title: 'Détails du film'
        }
    },

});
const ProfileStackNavigator = createStackNavigator({
    Profile: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Profile
    },
    MyFavoris: {
        screen: MyFavoris,
        navigationOptions: {
            title: 'Mes Favoris'
        }
    },
    ModifyProfile :{ 
        screen : ModifyProfile,
        navigationOptions: {
            title: 'Modifier mon profil'
        }
    },
    MyHistory :{ 
        screen : MyHistory,
        navigationOptions: {
            title: 'Mon Historique'
        }
    }

});
const UserInterfaceTabNavigator = createBottomTabNavigator({
    Feed: {
        screen : SearchStackNavigator,
            navigationOptions:{
                tabBarIcon: <FontAwesomeIcon icon={faHome} size={20}/>
            }
        },
    Profile: {
        screen: ProfileStackNavigator ,
            navigationOptions:{
                tabBarIcon: <FontAwesomeIcon icon={faUser} size={20}/>
            }
        }
}, {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        }
    }
)

export default createAppContainer(UserInterfaceTabNavigator);