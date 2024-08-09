import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { LAUNCH_SCREEN, Launch } from "../screens/launch/container";
// import { PRODUCT_SCAN_SCREEN, ProductScan } from "../screens/scan/container";
// import { PICK_LIST_SCREEN, PickList } from "../screens/pickList/container";
// import { PRODUCT_LIST_SCREEN, ProductList } from "../screens/productList/container";

//
import HomeScreen from "../screens/Home";
import JobLocationScreen from "../screens/JobLocation";
import FeedBackScreen from "../screens/Feedback";
import JobInformationScreen from "../screens/JonInformation";
import JobCompletedScreen from "../screens/JobCompleted";
import JobDetailsScreen from "../screens/JobInfo";
import ServerConnectScreen from "../screens/ServerConnect";

const Stack = createNativeStackNavigator();


const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName = {'home'}>
            <Stack.Screen
                name = {'home'}
                component = {HomeScreen}
                // component = {ServerConnectScreen}

                options = {{ headerShown: false }}
            />


<Stack.Screen
                name = {'JobLocation'}
                component = {JobLocationScreen}
                options = {{ headerShown: false }}
            />

<Stack.Screen
                name = {'JobDetail'}
                component = {JobInformationScreen}
                options = {{ headerShown: false }}
            />

<Stack.Screen
                name = {'JobFeedback'}
                component = {FeedBackScreen}
                options = {{ headerShown: false }}
            />


           
        </Stack.Navigator>
    );
};

export default HomeStack;
