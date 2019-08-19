import {
    createBottomTabNavigator,
    createAppContainer
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
import Settings from '../components/UserInterface/Settings';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const UserInterfaceTabNavigator = createBottomTabNavigator({
    Feed: {
        screen : Feed,
            navigationOptions:{
                tabBarIcon: <FontAwesomeIcon icon={faHome} size={20}/>
            }
        },
    Profile: {
        screen: Profile,
            navigationOptions:{
                tabBarIcon: <FontAwesomeIcon icon={faUser} size={20}/>
            }
        },
    Settings: {
        screen : Settings,
            navigationOptions:{
                tabBarIcon: <FontAwesomeIcon icon={faCog} size={20}/>
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