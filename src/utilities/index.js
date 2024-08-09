import {View, Text} from 'react-native';
import React from 'react';

//
import {useDispatch} from 'react-redux';
import { user } from '../common/user';
import { loginSuccess } from '../screens/Login/loginReducer';

export const InitialOperations = async () => {

    const dispatch = useDispatch();

    // global.store.dispatch(loginSuccess);

    // global.store.dispatch(loginSuccess());

    dispatch(startLogin({email: "form.email",
        password: "form.password"}));
        
    console.log("--------> INITIAL OPRATIONS ========>")

  const isLoggedIn = await user.isLoggedIn();

  if (isLoggedIn) {
    console.log("--------> INITIAL OPRATIONS ========>",isLoggedIn)
  }

  return <View></View>
};


export default InitialOperations;
