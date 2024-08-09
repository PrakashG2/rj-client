import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Touchable, ProgressViewIOS, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLOR } from '../../utilities/colors'
import { moderateScale } from 'react-native-size-matters'
import PillShapedButton from '../PillShapedButtonV2'
import * as Animatable from 'react-native-animatable';
import { ICON } from '../../utilities/icons';
import textStyles from '../../utilities/textStyles'
import { useSelector } from 'react-redux'

const UploadProgressIndicator = ({ buttonOneOnPress, buttonTwoOnPress, handleClosePrompt }) => {

    const { message, visible, percentage } = useSelector(state => state.UploadProgressIndicator);


    return (

        visible && (
            <TouchableWithoutFeedback>
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
                                <Text style={textStyles.promptMessage}>Uploading</Text>
                                <View style={styles.loader}>
                                    {Platform.OS === 'ios' ? (
                                        <ProgressViewIOS style={styles.loader} progress={0.5} /> // ProgressViewIOS for iOS
                                    ) : (
                                        <ActivityIndicator style={styles.loader} size='small' color={COLOR.PRIMARY} /> // ActivityIndicator for Android
                                    )}
                                </View>
                            </View>

                            <View style={styles.progressIndicatorContainer}>
                            <View style={[styles.progressIndicator, { width: `${percentage}%` }]}></View>
                            </View>

                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>)
    )

}

export default UploadProgressIndicator

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: moderateScale(80)
    },
    prompt: {
        width: "95%",
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        padding: moderateScale(10),
        alignItems: 'flex-start',


    }, messageContainer: {
        marginBottom: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    progressIndicatorContainer: {
        backgroundColor: COLOR.GREY_TWO,
        borderRadius: 15,
        overflow: 'hidden',
        width: '100%',

    }, progressIndicator: {
        height: moderateScale(4),
        backgroundColor: COLOR.PRIMARY
    },loader: {
        // backgroundColor: 'red'
    }

});