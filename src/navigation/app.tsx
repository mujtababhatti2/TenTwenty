import React from "react";
import { List, MoreScreen, MovieDetail, VideoPlay } from "../screens/app";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabBar as RNBottomTabBar,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StyleSheet, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import { Text } from "react-native";

const AppStack = createNativeStackNavigator();
const HomeStack = createStackNavigator(); //DashBoard screen
const MainTab = createBottomTabNavigator();
const MoreTab = createStackNavigator();
const DashBoardStack = createStackNavigator();
const MediaStack = createStackNavigator();

const MoreStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"MoreScreen"}
    >
      <HomeStack.Screen name={"MoreScreen"} component={MoreScreen} />
    </HomeStack.Navigator>
  );
};
const DashboardStackScreens = () => {
  return (
    <DashBoardStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"MoreScreen"}
    >
      <DashBoardStack.Screen name={"MoreScreen"} component={MoreScreen} />
    </DashBoardStack.Navigator>
  );
};

const MediaStackScreen = () => {
  <MediaStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={"MoreScreen"}
  >
    <MediaStack.Screen name={"MoreScreen"} component={MoreScreen} />
  </MediaStack.Navigator>;
};

const WatchStackScreen = () => {
  return (
    <MoreTab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"List"}
    >
      <MoreTab.Screen name={"List"} component={List} />
    </MoreTab.Navigator>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View style={styles.bottomTabBarContainer}>
      {Platform.OS === "ios" ? (
        <>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: responsiveHeight(4),
              width: responsiveWidth(50),
              position: "absolute",
              bottom: 0,
            }}
          />
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              height: responsiveHeight(4),
              width: responsiveWidth(50),
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </>
      ) : null}
      <RNBottomTabBar {...props} />
    </View>
  );
};

const MainTabScreens = () => {
  return (
    <MainTab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        activeTintColor: "white",
        inactiveTintColor: "white",
        allowFontScaling: true,
        tabBarShowLabel: false,
        gestureEnabled: false,
        tabBarStyle: {
          backgroundColor: "#2E2739",
          display: "flex",
          width: responsiveWidth(100),
          alignSelf: "center",
          height:
            Platform.OS === "ios" ? responsiveHeight(9.5) : responsiveHeight(8),

          position: "absolute",
          bottom: 0,
          paddingTop: Platform.OS === "android" ? null : responsiveHeight(2),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
          borderTopRightRadius: responsiveWidth(7),
          borderTopLeftRadius: responsiveWidth(7),
        },
      }}
      initialRouteName={"DashboardStackScreens"}
    >
      <MainTab.Screen
        name={"DashboardStackScreens"}
        component={DashboardStackScreens}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="home-outline"
                  type="ionicon"
                  size={23}
                  color={focused ? "#fff" : "#817d87"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? "#fff" : "#817d87",
                    fontSize: 12,
                  }}
                >
                  Dashboard
                </Text>
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name={"WatchStackScreen"}
        component={WatchStackScreen}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="youtube"
                  type="entypo"
                  size={23}
                  color={focused ? "#fff" : "#817d87"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? "#fff" : "#817d87",
                    fontSize: 12,
                  }}
                >
                  Watch
                </Text>
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={"MediaStackScreen"}
        component={MediaStackScreen}
        options={(props) => ({
          unmountOnBlur: true,

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="message1"
                  type="antdesign"
                  size={23}
                  color={focused ? "#fff" : "#817d87"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? "#fff" : "#817d87",
                    fontSize: 12,
                  }}
                >
                  Media Library
                </Text>
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={"MoreStackScreens"}
        component={MoreStackScreens}
        options={(props) => ({
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.tabIconContainer}>
                <Icon
                  name="person-outline"
                  type="ionicon"
                  size={23}
                  color={focused ? "#fff" : "#817d87"}
                />
                <Text
                  style={{
                    paddingTop: responsiveHeight(1),
                    color: focused ? "#ffff" : "#817d87",
                    fontSize: 12,
                  }}
                >
                  More
                </Text>
              </View>
            );
          },
        })}
      />
    </MainTab.Navigator>
  );
};
const AppScreens = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainTabScreens"
    >
      <AppStack.Screen name="MainTabScreens" component={MainTabScreens} />
      <AppStack.Screen name="MovieDetail" component={MovieDetail} />
      <AppStack.Screen name="VideoPlayer" component={VideoPlay} />
    </AppStack.Navigator>
  );
};

export default AppScreens;

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIconContainer: {
    width: responsiveWidth(20),
    alignItems: "center",
    marginTop: responsiveHeight(1.5)
  },
});
