import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Auth from "./auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "./app";
const AppStack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Auth"
                screenOptions={{ headerShown: false }}
            >
                <AppStack.Screen name={"Auth"} component={Auth} />
                <AppStack.Screen name={"AppStack"} component={App} />

            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;