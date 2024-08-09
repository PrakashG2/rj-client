import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'react-native-linear-gradient'; // Import the library
import apiManager from '../../api';
import { API_METHODS } from '../../api/constants';

import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from './loginReducer';
import { FONT } from '../../utilities/fonts';
import { moderateScale } from 'react-native-size-matters';
import { styles } from "./styles";




export default function LoginScreen() {

  const { serverUrl } = useSelector((state) => state.serverConnect);


  const dispatch = useDispatch();

  const font = require("../../../android/app/src/main/assets/fonts/Chicle-Regular.ttf")



  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Invalid email format';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSignIn = async () => {

    if (validateForm()) {
      // const response = await apiManager.get(API_METHODS.TODO)
   
// console.log(response.data) 

dispatch(startLogin({email: form.email,
password: form.password, serverUrl: serverUrl}));

// console.log("=============================================", serverUrl)
   }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <LinearGradient
        colors={['#EE7DB2', '#15557b']} // Customize the gradient colors here
        style={{flex: 1}} // Ensure the gradient covers the entire screen
      >
        <View style={styles.container}>
          <KeyboardAwareScrollView  contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} behavior="padding">
          <View style={{width: 430, alignSelf: 'flex-start'}}> 
          <View
              style={{
                position: 'absolute',
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,                height: 12,
                width: '100%',
                transform: [{rotate: '-45deg'}],
                top: -15,
                left: -80,
              }}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,                height: 12,
                width: '100%',
                transform: [{rotate: '-45deg'}],
                top: -35,
                left: -130,
              }}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,                height: 12,
                width: '100%',
                transform: [{rotate: '-45deg'}],
                top: -25,
                left: -105,
              }}
            />
</View>
            <View style={styles.header}>
              {/* <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{
                uri: 'https://assets.withfra.me/SignIn.2.png',
              }}
            /> */}

              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 30,
                  // marginTop: moderateScale(30, 1),

                }}>
                <Text style={styles.title}>Remote Job</Text>
              </View>

              {/* <Text style={styles.subtitle}>
              Get access to your portfolio and more
            </Text> */}
            </View>
            <View
              style={{
                // marginBottom: 14,
                flexGrow: 2,
                borderRadius: 15,
                width: '95%',
                alignSelf: 'center',
                alignItems: 'center',
                // backgroundColor: 'green',
                marginTop: moderateScale(1, 105.0)
              }}>
              <View style={styles.form}>
                <View style={styles.input}>
                  {/* <Text style={styles.inputLabel}>Email address</Text> */}

                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={email => setForm({...form, email})}
                    placeholder="Username"
                    placeholderTextColor="black"
                    style={styles.inputControl}
                    value={form.email}
                  
                  />

                  {errors.email && (
                    <Text
                      style={{
                        color: 'red',
                      }}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View style={styles.input}>
                  {/* <Text style={styles.inputLabel}>Password</Text> */}

                  <TextInput
                    autoCorrect={false}
                    onChangeText={password => setForm({...form, password})}
                    placeholder="Password"
                    placeholderTextColor="black"
                    style={styles.inputControl}
                    secureTextEntry={true}
                    value={form.password}
                  />
                  {errors.password && (
                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  )}
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSignIn}>
                    <View style={styles.btn}>
                      <Text style={[styles.btnText, {fontFamily: 'Urbanist-ExtraBold', } ]}>Login</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* <Text style={styles.formLink}>Forgot password?</Text> */}
              </View>
              <View
                style={{
                  height: 125,
                  width: 125,
                  backgroundColor: 'white',
                  position: 'absolute',
                  marginTop: 15,
                  borderRadius: 116,
                  borderWidth: 3,
                  borderColor: '#336C85',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 70, width: 70, alignSelf: 'center'}}
                  resizeMode="cover"
                  source={require('../../../assets/icons/userAvatarBig.png')}
                />
              </View>
            </View>
            {/* <View style={{height: 82}}></View> */}
            <View style={{ height: 160, width: 270, alignSelf: 'flex-end'}}> 
            <View
              style={{
               
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,
                height: 12,
                
                width: '100%',
                transform: [{rotate: '-45deg'}],
                bottom: -70,
                left: 80,
              }}
            />
            <View
              style={{
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,                height: 12,
                width: '100%',
                transform: [{rotate: '-45deg'}],
                bottom: -50,
                left: 130,
              }}
            />
            <View
              style={{
                backgroundColor: 'white', // Change color as needed
                opacity: 0.5,                height: 12,
                transform: [{rotate: '-45deg'}],
                bottom: -50,
                left: 160,
              }}
            /></View>

            
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export const LOGIN_SCREEN = 'Login';

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 0,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   title: {
//     fontSize: 40,
//     // fontWeight: '700',
//     color: '#336C85',
//     marginBottom: 6,
//     fontFamily: FONT.PRIMARY_BOLD,
//   },
//   subtitle: {
//     fontSize: 15,
//     // fontWeight: '500',
//     color: '#929292',
//   },
//   /** Header */
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 135,
//     // marginBottom: 30,
//   },
//   headerImg: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginBottom: 36,
//   },
//   /** Form */
//   form: {
//     paddingTop: 90,
//     marginTop: 74,
//     marginBottom: 84,
//     paddingHorizontal: 24,
    
//     borderRadius: 15,
//     width: '90%',
//     backgroundColor: 'white',
//     // backgroundColor: 'red',
//   },
//   formAction: {
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   formLink: {
//     fontSize: 16,
//     // fontWeight: '600',
//     color: '#075eec',
//     textAlign: 'center',
//   },
//   formFooter: {
//     fontSize: 15,
//     // fontWeight: '600',
//     color: '#222',
//     textAlign: 'center',
//     letterSpacing: 0.15,
//   },
//   /** Input */
//   input: {
//     marginBottom: 25,
//     // backgroundColor: 'red'
//   },
//   inputLabel: {
//     fontSize: 17,
//     // fontWeight: '600',
//     color: '#222',
//     marginBottom: 8,
//   },
//   inputControl: {
//     height: 50,
//     // backgroundColor: '#fff',
//     // borderRadius: 12,
//     fontSize: moderateScale(15),
//     color: '#222',
//     borderBottomWidth: 1,
//     borderColor: '#C9D3DB',
//     borderStyle: 'solid',
//     fontFamily: FONT.PRIMARY_BOLD
//   },
//   /** Button */
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     // borderWidth: 1,
//     backgroundColor: '#EE7DB2',
//     // borderColor: '#075eec',
//     marginBottom: 15,
//   },
//   btnText: {
    
//     fontSize: 18,
//     lineHeight: 26,
//     // fontWeight: '900',
//     color: 'white',
//   },
// });
