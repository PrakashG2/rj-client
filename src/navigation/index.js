import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {logger} from '../common/logger';
import {configuration, user} from '../common/user';
import {loginSuccess} from '../screens/Login/loginReducer';
import {hideLoader, showLoader} from '../components/customLoader/reducer';
import { ServerConnectSuccess } from '../screens/ServerConnect/serverConnectSlice';

const AppNavigationContainer = () => {
  const routeNameRef = React.useRef();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => {
    return state.login.isLogin;
});

  console.log("---> nave HomeStack.js ->>>>>>>>>> ", isLogin)
  useEffect(async () => {
    dispatch(showLoader());

    const userData = await user.isLoggedIn();
    const configurationData = await configuration.getServerUrl();
    
    if (configurationData) {
      dispatch(ServerConnectSuccess());
    }
    
    if (userData) {
      dispatch(loginSuccess());
    }


    dispatch(hideLoader());
  }, []);

  console.log(
    '+++++++++++++++ is login from navigation index.js ------->',
    isLogin,
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          logger.log(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
        // dispatch(enableGuestureAction(gestureEnabledScreens.includes(currentRouteName)));
      }}>
      {isLogin ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
