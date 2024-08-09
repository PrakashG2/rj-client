import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Touchable, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../utilities/colors'
import { moderateScale } from 'react-native-size-matters'
import PillShapedButton from '../PillShapedButtonV2'
import * as Animatable from 'react-native-animatable';
import { ICON } from '../../utilities/icons';
import textStyles from '../../utilities/textStyles'
import { FONT } from '../../utilities/fonts'
import { useDispatch } from 'react-redux'
import { addAddhocCost, addNote } from '../../screens/JonInformation/jobInformationReducer'

const AddNotePrompt = ({handleClosePrompt, jobId }) => {
    const dispatch = useDispatch();

    // Description
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState('');


    // Handle Description Change
    const handleDescriptionChange = (value) => {
        setDescription(value);
        if (value.length < 5) {
            setDescriptionError('Description must be at least 5 characters long.');
        } else {
            setDescriptionError('');
        }
    };

    // Handle Submit
    const handleSubmit = () => {
        if (description.length < 5) {
            setDescriptionError('Description must be at least 5 characters long.');
        } else {
            setDescriptionError('');
            handleClosePrompt();

            //
            dispatch(addNote({ noteText: description, jobId: jobId }))

        }
    };

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
                        <View style={styles.promptTitleContainer}>
                            <Text style={textStyles.promptMessage}>Note</Text>
                        </View>


                        <View style={styles.promptBodyContainer}>
                            
                            <TextInput
                                multiline
                                numberOfLines={10}
                                maxLength={300}
                                style={styles.textInput}
                                placeholder='Description'
                                placeholderTextColor={COLOR.BLACK}
                                value={description}
                                onChangeText={handleDescriptionChange}
                            />
                            {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
                        </View>

                        <View style={styles.buttonContainer}>
                            <PillShapedButton buttonText="Cancel" buttonStyle={{ backgroundColor: COLOR.SECONDARY }} onPress={handleClosePrompt} />

                            <PillShapedButton buttonText="Submit" buttonStyle={{ backgroundColor: COLOR.PRIMARY }} onPress={handleSubmit} />


                        </View>
                    </Animatable.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default AddNotePrompt

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
        padding: moderateScale(20),
    },
    promptBodyContainer: {
        width: '100%',


        // borderRadius: 15,
        justifyContent: 'center',
        marginVertical: moderateScale(15),
        justifyContent: 'space-evenly'
        // elevation: 15,
    }, 
    textInput: {
        textAlignVertical: 'top',
        borderWidth: 2,
        borderRadius: 10,
        padding: moderateScale(15),
        borderColor: COLOR.GREY_FOUR,
        marginVertical: moderateScale(15),
        color: COLOR.BLACK,
        fontFamily: FONT.PRIMARY_BOLD,
        fontSize: moderateScale(14)
    },
    button: {
        marginVertical: moderateScale(25),
        height: moderateScale(80),
        width: moderateScale(80),
        padding: moderateScale(5),
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLOR.GREY_FOUR,
        alignItems: 'center',
        justifyContent: 'space-evenly',



    },
    image: {

        height: '100%',
        width: '100%',
        // backgroundColor: 'red'
    },
    promptTitleContainer: {


    },
    buttonContainer: {
        height: moderateScale(30),
        marginVertical: moderateScale(5),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }, errorText: {
        color: 'red',
        fontSize: moderateScale(13),
        marginTop: moderateScale(-10),
        marginBottom: moderateScale(10),
        fontFamily: FONT.PRIMARY_BOLD
    },

});