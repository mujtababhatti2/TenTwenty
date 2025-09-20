import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash, } from '../screens/auth';

const AuthStack = createNativeStackNavigator();

const Auth = () => {
    return (
        <AuthStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }} >
            <AuthStack.Screen name="Splash" component={Splash} />
        </AuthStack.Navigator>
    )
}
export default Auth