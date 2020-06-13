import React from "react";
import Loading from './screens/Loading'
import Login from './screens/Login'
import Register from './screens/Register'
import History from './screens/History'
import Profile from './screens/Profile'
import Home from './screens/Home'
import firebaseConfig from './config/FirebaseConfig'
import * as firebase from 'firebase';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {  FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";

firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
 
const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register
})

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="meho" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#E9446A",
          inactiveTintColor: "gray"
        }
      }
    },

    Main: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Main",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="wine-bottle" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#E9446A",
          inactiveTintColor: "gray"
        }
      }
    },
    History: {
      screen: History,
      headerTitle: "History",
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-paper" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "#E9446A",
          inactiveTintColor: "gray"
        }
      }
    }
  },

  {
    initialRouteName: "Main",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  },
  {}
);


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: DashboardTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)

