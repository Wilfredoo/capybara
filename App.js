import React from "react";
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import History from "./src/screens/History";
import Profile from "./src/screens/Profile";
import SentConfirmation from "./src/screens/SentConfirmation";
import Home from "./src/screens/Home";
import Messages from "./src/screens/Messages";
import MessageThread from "./src/screens/MessageThread";
import firebaseConfigDEV from "./config/FirebaseConfigDEV";
import firebaseConfigPROD from "./config/FirebaseConfigPROD";
import * as firebase from "firebase";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { decode, encode } from "base-64";
import { YellowBox } from "react-native";
import _ from "lodash";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";

if (!firebase.apps.length) {
  if (__DEV__) {
    firebase.initializeApp(firebaseConfigDEV);
  } else {
    firebase.initializeApp(firebaseConfigPROD);
  }
}

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

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
          inactiveTintColor: "gray",
        },
      },
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
          inactiveTintColor: "gray",
        },
      },
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
          inactiveTintColor: "gray",
        },
      },
    },
  },
  {
    initialRouteName: "Main",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
  },
  {}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: DashboardTabNavigator,
      Auth: AuthStack,
      Sent: SentConfirmation,
      MessageThread: MessageThread,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
