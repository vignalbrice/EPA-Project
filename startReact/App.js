
import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import Firebase from'./src/components/Firebase';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faHome, faPager } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import Store from './src/store/configureStore'

require('firebase/auth');
library.add(faCheckSquare, faCoffee, faHome, faPager);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {}
    };
  }

  componentWillMount(){
    Firebase.init();
  }
  componentDidMount(){

  }

render(){

    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
