// import * as React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { LOGIN_SCREEN } from "../screens/Login";

// //
// import LoginScreen from "../screens/Login";

// const Stack = createNativeStackNavigator();

// const AuthStack = ({ navigation }) => {
//     return (
//         <Stack.Navigator initialRouteName = {LOGIN_SCREEN}>
//             <Stack.Screen
//                 name = {LOGIN_SCREEN}
//                 component = {LoginScreen}
//                 options = {{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// };

// export default AuthStack;


import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREEN } from "../screens/Login";

import LoginScreen from "../screens/Login";
import ServerConnectScreen, { SERVER_CONNECT_SCREEN } from "../screens/ServerConnect";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
    const { serverConnected } = useSelector((state) => state.serverConnect);
    // Generate a unique key based on the serverConnected value
    const navigatorKey = serverConnected ? 'logged-in' : 'logged-out';

    return (
        <Stack.Navigator key={navigatorKey} initialRouteName={serverConnected ? LOGIN_SCREEN : SERVER_CONNECT_SCREEN}>
            <Stack.Screen
                name={SERVER_CONNECT_SCREEN}
                component={ServerConnectScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={LOGIN_SCREEN}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
