import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../../utilities/colors'
import { moderateScale } from 'react-native-size-matters'
import PillShapedButton from '../PillShapedButtonV2'
import * as Animatable from 'react-native-animatable';
import { ICON } from '../../utilities/icons';
import textStyles from '../../utilities/textStyles'

const ImageSourcePrompt = ({  buttonOneOnPress, buttonTwoOnPress, handleClosePrompt }) => {
    return (

        <TouchableWithoutFeedback onPress={handleClosePrompt}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <Animatable.View
                        style={styles.prompt}
                        animation="zoomIn"
                        duration={300}
                        easing="ease-in-out"
                        useNativeDriver
                    >
                        <View style={styles.messageContainer}>
                            <Text style={textStyles.promptMessage}>Attachments</Text>
                        </View>
                        <View style={styles.pictureContainer}>
                            <TouchableOpacity style={styles.button} onPress={buttonOneOnPress}>
                            <Image
                                source={ICON.CAMERA_GREY}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text style={[textStyles.promptMessage, {fontSize: moderateScale(12)}]}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={buttonTwoOnPress}>
                            <Image
                                source={ICON.GALLERY_GREY}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text style={[textStyles.promptMessage, {fontSize: moderateScale(12)}]}>Gallery</Text>
                            </TouchableOpacity>

                        </View>
                        
                        <View style={styles.buttonContainer}>
                            {/* <PillShapedButton buttonText="Camera" buttonStyle={buttonOneStyle} onPress={buttonOneOnPress} />
                            <PillShapedButton buttonText="Gallery" buttonStyle={buttonTwoStyle} onPress={buttonTwoOnPress} /> */}

                              <PillShapedButton buttonText="Cancel" buttonStyle={{backgroundColor: COLOR.SECONDARY}} onPress={handleClosePrompt} />
                            
                        </View>
                    </Animatable.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default ImageSourcePrompt

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    prompt: {
        width: moderateScale(300),
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        padding: moderateScale(25),
    },
    pictureContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 2,
        borderTopWidth:2,
        borderColor: COLOR.GREY_FOUR,

        // borderRadius: 15,
        justifyContent: 'center',
        marginVertical: moderateScale(15),
        justifyContent: 'space-evenly'
        // elevation: 15,
    },button: {
        marginVertical:moderateScale(25),
        height: moderateScale(80),
        width: moderateScale(80),
        padding: moderateScale(5),
        borderWidth:2,
        borderRadius: 15,
        borderColor: COLOR.GREY_FOUR,
        alignItems: 'center',
        justifyContent: 'space-evenly'


    },
     image: {

        height: '45%',
        width: '45%',
        // backgroundColor: 'red'
    },
    messageContainer: {


    },
    buttonContainer: {
        height: moderateScale(30),
        marginVertical: moderateScale(5),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

});