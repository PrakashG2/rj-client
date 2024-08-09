import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'react-native-linear-gradient'; // Import the library
import { COLOR } from '../../utilities/colors';
import { moderateScale, scale } from 'react-native-size-matters';
import PillShapedButton from '../../components/PillShapedButtonV2';
import { FONT } from '../../utilities/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { startServerConnect } from './serverConnectSlice';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';

export default function ServerConnectScreen () {

    const dispatch = useDispatch();

    const [serverUrl, setServerUrl] = useState('');

    const isValidUrlOrIp = (url) => {
        // URL pattern: Match URLs with optional port and path
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/;
        
        // IP pattern: Match IPv4 addresses with optional port
        const ipPattern = /^(https?:\/\/)?((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?(\/\S*)?$/;
        
        return urlPattern.test(url) || ipPattern.test(url);
    };
    const handleEnterPress = () => {
        if (serverUrl.trim() === '') {
            dispatch(showSnackbar({ message: "Server URL cannot be empty.", color: "red" }));

            return;
        }
        if (!isValidUrlOrIp(serverUrl)) {
            dispatch(showSnackbar({ message: "Please enter a valid URL or IP address.", color: "red" }));

            return;
        }
        dispatch(startServerConnect({serverUrl: serverUrl}));
    };

   

    return (
        // <SafeAreaView style={styles.container}>
        //     <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} behavior="padding">

        //         <LinearGradient colors={[COLOR.SECONDARY, COLOR.PRIMARY]} style={styles.linearGradient}>
        //             <View style={styles.topDecorationContainer}>
        //                 <View style={[styles.decorationLine, styles.decorationLine1]} />
        //                 <View style={[styles.decorationLine, styles.decorationLine2]} />
        //                 <View style={[styles.decorationLine, styles.decorationLine3]} />
        //             </View>
                    // <View style={styles.body}>
                    //     <View style={{justifyContent: 'center',height: moderateScale(60),width: "100%", backgroundColor: COLOR.WHITE}}>
                    //     <Text style={styles.title}>Remote Job</Text>

                    //     </View>
                    //     <View style={styles.contentContainer}>
                    //         <TextInput style={styles.urlInput} onChangeText={text => setServerUrl(text)}
                    //             placeholder='Enter Server URL' placeholderTextColor={COLOR.BLACK} />

                    //         <View style={styles.buttonContainer}>
                    //             <TouchableOpacity style={styles.enterButton} onPress={handleEnterPress}>
                    //                 <Text style={styles.enterButtonText}>Enter</Text>
                    //             </TouchableOpacity>
                    //         </View>
                    //     </View>
                    // </View>
        //             <View style={styles.bottomDecorationContainer}>
        //                 <View style={[styles.decorationLine, styles.decorationLineBottom1]} />
        //                 <View style={[styles.decorationLine, styles.decorationLineBottom2]} />
        //                 <View style={[styles.decorationLine, styles.decorationLineBottom3]} />
        //             </View>

        //         </LinearGradient>
        //     </KeyboardAwareScrollView>
        // </SafeAreaView>

        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} behavior="padding">

                <LinearGradient colors={[COLOR.SECONDARY, COLOR.PRIMARY]} style={styles.linearGradient}>
                    <View style={styles.topDecorationContainer}>
                        <View style={[styles.decorationLine, styles.decorationLine1]} />
                        <View style={[styles.decorationLine, styles.decorationLine2]} />
                        <View style={[styles.decorationLine, styles.decorationLine3]} />
                    </View>

                    
                    {/* <TextInput placeholder='red'></TextInput> */}

                    <View style={{ height:moderateScale(610)}}>
                    <View style={styles.body}>
                        <View style={{justifyContent: 'center',height: moderateScale(60),width: "100%", backgroundColor: COLOR.WHITE}}>
                        <Text style={styles.title}>Remote Job</Text>

                        </View>
                        <View style={styles.contentContainer}>
                            <TextInput style={styles.urlInput} onChangeText={text => setServerUrl(text)}
                                placeholder='Enter Server URL' placeholderTextColor={COLOR.BLACK} />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.enterButton} onPress={handleEnterPress}>
                                    <Text style={styles.enterButtonText}>Enter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </View>
                    <View style={{ }}>
                    <View style={styles.bottomDecorationContainer}>
                       <View style={[styles.decorationLine, styles.decorationLineBottom1]} />
                         <View style={[styles.decorationLine, styles.decorationLineBottom2]} />
                         <View style={[styles.decorationLine, styles.decorationLineBottom3]} />
                     </View>
                    </View>

                </LinearGradient>


            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}
export const SERVER_CONNECT_SCREEN = 'ServerConnectScreen';



const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, linearGradient: {
        flex: 1,

    }, topDecorationContainer: {
        height: "14%",
        width: moderateScale(400),
    }, bottomDecorationContainer: {
        height: "14%",
        width: moderateScale(400),

        // backgroundColor: 'green',

        alignSelf: 'flex-end'
    }, body: {
        height: '72%',
        width: '100%',
        alignItems: 'center',
        marginTop: moderateScale(10)
        // justifyContent: 'center',
        // backgroundColor: 'red'
    },
    decorationLine: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.5, height: 12,
        width: '100%',
        transform: [{ rotate: '-45deg' }],
    },
    decorationLine1: {
        top: moderateScale(-30),
        left: moderateScale(-80),
    }, decorationLine2: {
        top: moderateScale(-35),
        left: moderateScale(-135),
    }, decorationLine3: {
        top: moderateScale(-25),
        left: moderateScale(-115),
    },
    decorationLineBottom1: {
        bottom: moderateScale(-30),
        left: moderateScale(80),
    }, decorationLineBottom2: {
        bottom: moderateScale(-25),
        left: moderateScale(115),
    }, decorationLineBottom3: {
        bottom: moderateScale(-35),
        left: moderateScale(135),
    }, contentContainer: {

        height: moderateScale(160),
        width: '85%',
        padding: moderateScale(20),
        justifyContent: 'space-between',
        alignContent: 'space-between',
        backgroundColor: COLOR.WHITE,
        marginTop: moderateScale(130),

        borderRadius: 15
    }, urlInput: {
        borderBottomWidth: 1,
        borderColor: COLOR.GREY_THREE,
        width: '100%',
        fontFamily: FONT.PRIMARY_BOLD,
        fontSize: moderateScale(14),
        color: COLOR.BLACK
    }, buttonContainer: {
        height: moderateScale(50),
        width: '100%',

    }, enterButton: {

        height: '100%',
        backgroundColor: COLOR.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    }, enterButtonText: {
        fontFamily: FONT.PRIMARY_BOLD,
        fontSize: moderateScale(20),
        color: COLOR.WHITE
    },title: {
        fontSize: moderateScale(40),
        // fontWeight: '700',
        color: '#336C85',
        marginBottom: 6,
        fontFamily: FONT.PRIMARY_BOLD,
        textAlign: 'center'
      },
})

