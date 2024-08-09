// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import LoginScreen from "./screens/Login";
import JobDetailsScreen from "./screens/JobInfo";
import Home from "./screens/Home";
import SignScreen from "./screens/Signature";
import FeedBackScreen from "./screens/Feedback";
import CustomLoader from "./components/customLoader";
import { View } from "react-native-animatable";
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import CustomSnackbar from "./components/customSnackbar";
import BootSplash from "react-native-bootsplash"
import { user, configuration } from "./common/user";
import AppNavigationContainer from "./navigation";
import ConfirmationPrompt from "./components/ConfirmationPrompt";
import Drawer from "./components/Drawer";
import PdfViewer from "./components/PdfViewer";
import PicturedConfirmationPrompt from "./components/PicturedConfirmationPrompt";
import UploadProgressIndicator from "./components/UploadProgressIndicator";

const stack = createNativeStackNavigator();

function App() {

 


  useEffect(() => {
    const init = async () => {
      const configData = await configuration.getServerUrl();

        await BootSplash.hide({ fade: true, duration: 250 });

    };

    init().finally(async () => {
      // user.logout();
        const userData = await user.isLoggedIn();

        const configData = await configuration.getServerUrl();


        console.log("-> slpash closed", userData)
    });
}, []);



  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <CustomLoader />
        <CustomSnackbar />
        <ConfirmationPrompt />
        <PicturedConfirmationPrompt />
        <AppNavigationContainer />
        <PdfViewer />
        <Drawer />
        <UploadProgressIndicator />
        {/* <NavigationContainer>
          <stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
            <stack.Screen name='LoginScreen' component={LoginScreen} />
            <stack.Screen name='JobDetailsScreen' component={JobDetailsScreen} />
            <stack.Screen name='SignatureScreen' component={SignScreen} />
            <stack.Screen name='HomeScreen' component={Home} />
            <stack.Screen name='FeedBackScreen' component={FeedBackScreen} />
          </stack.Navigator>
        </NavigationContainer> */}
      </View>
    </Provider>
  );
}

export default App;
