// import all necessary components
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
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator,
    createDrawerNavigator } from 'react-navigation';
import Login from '../components/Login/Login';
import HomeScreen from '../components/HomeScreen';
import Register from '../components/Login/Register';
import Profile from '../components/UserInterface/Profile';
import Loading from '../components/Loading';
import Feed from'../components/UserInterface/Feed';



class LogoHeader extends React.Component {
    render() {
        return (
            <View style = {{ flex:1, alignItems:'center' }}>
            <Image
                style={styles.logo}
                    source={require('../img/jDK67ry.png')}/>

            </View>
        );
    }
}
// Configuration of transition left-right/right-left
const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(8)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps
            const thisSceneIndex = scene.index
            const width = layout.initWidth
            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [ { translateX } ] }
        },
    }
}


const AppNavigator = createStackNavigator({
    Loading : Loading,
    Home: HomeScreen,
    Register: Register,
    Login: Login
},{
    initialRouteName: "Loading",
    transitionConfig,
        defaultNavigationOptions: (props) => {
            const { navigation } = props;
            return ({
        gesturesEnabled: true,
        transitionStyle: 'inverted',
        headerStyle: {
            backgroundColor: '#3498db',
        },
        headerTintColor: '#fff'
        })
    }
})
/*const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: UserInterfaceTabNavigator
    }
});*/


const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    }
});

export default createAppContainer(AppNavigator);
