import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import firebaseConfig from './config/FirebaseConfig'
import * as firebase from 'firebase';

 // Your web app's Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const AppStack = createStackNavigator({
  Home: HomeScreen
})
 
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createStackNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)