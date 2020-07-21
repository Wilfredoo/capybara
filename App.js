import React from "react";
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import History from "./src/screens/History";
import Profile from "./src/screens/Profile";
import Home from "./src/screens/Home";
import MessageThread from "./src/screens/MessageThread";
import firebaseConfigDEV from "./config/FirebaseConfigDEV";
import firebaseConfigPROD from "./config/FirebaseConfigPROD";
import * as firebase from "firebase";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { decode, encode } from "base-64";
import { YellowBox, Text } from "react-native";
import _ from "lodash";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import IconBadge from "react-native-icon-badge";

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
        header: null,
        title: "Profile",
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="baby-face"
            size={30}
            color={tintColor}
          />
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
        header: null,
        tabBarLabel: "Main",
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="message" size={30} color={tintColor} />
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
        header: null,
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <IconBadge
            MainElement={
              <Ionicons name="md-paper" size={30} color={tintColor} />
            }
            IconBadgeStyle={{
              left: 10,
              width: 10,
              height: 20,
              backgroundColor: "#E9446A",
            }}
            Hidden={true}
          />
        ),
        tabBarOptions: {
          activeTintColor: "#E9446A",
          inactiveTintColor: "gray"
        },
      },
    },
  },
  {
    initialRouteName: "Main"
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: DashboardTabNavigator,
      Auth: AuthStack,
      MessageThread: MessageThread,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
