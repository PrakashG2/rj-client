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
import { addAddhocCost } from '../../screens/JonInformation/jobInformationReducer'

const AddAdhocCostPrompt = ({handleClosePrompt, jobId }) => {
    const dispatch = useDispatch();

    // Cost
    const [cost, setCost] = useState(0);
    const [costError, setCostError] = useState('');

    // Description
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState('');


    // Handle Increment Button
    const handleIncrementButton = () => {
        const newCost = cost + 1;
        if (newCost.toString().length <= 7) {
            setCost(newCost);
            setCostError('');
        }
    };


    // Handle Decrement Button
    const handleDecrementButton = () => {
        if (cost > 0) {
            setCost(cost - 1);
        }
    };

    // Handle Cost Change
    const handleCostChange = (value) => {
        const newValue = parseInt(value, 10);
        if (!isNaN(newValue) && newValue.toString().length <= 7) {
            setCost(newValue);
            if (newValue === 0) {
                setCostError('Cost can\'t be 0');
            } else {
                setCostError(''); const handleCostChange = (value) => {
                    if (value === '') {
                        setCost(0);
                        setCostError('Cost can\'t be 0');
                        return;
                    }

                    const newValue = Number(value);

                    if (!isNaN(newValue) && newValue.toString().length <= 7) {
                        setCost(newValue);
                        if (newValue === 0) {
                            setCostError('Cost can\'t be 0');
                        } else {
                            setCostError('');
                        }
                    }
                };

            }
        } else if (value === '') {
            setCost(0);
            setCostError('Cost can\'t be 0');
        }
    };

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
        // if (cost === 0) {
        //     setCostError('Cost Cant be 0')
        // }
        // else
        if (description.length < 5) {
            setDescriptionError('Description must be at least 5 characters long.');
        } else {
            setDescriptionError('');
            // Proceed with submission
            console.log('Cost:', cost);
            console.log('Description:', description);
            handleClosePrompt();

            //
            dispatch(addAddhocCost({ cost: cost, description: description, jobId: jobId }))

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
                            <Text style={textStyles.promptMessage}>Adhoc Cost</Text>
                        </View>


                        <View style={styles.promptBodyContainer}>
                            <View style={styles.costContainer}>

                                <TextInput
                                    style={styles.costTextInput}
                                    value={cost.toString()}
                                    keyboardType='numeric'
                                    onChangeText={handleCostChange}
                                />
                                <View style={styles.counterContainer}>
                                    <TouchableOpacity style={styles.counterButtonContainer} onPress={handleIncrementButton}>
                                        <View style={styles.counterButton}
                                        >
                                            <Image style={styles.image} source={ICON.PLUS} />


                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.counterButtonContainer} onPress={handleDecrementButton}>
                                        <View style={[styles.counterButton,
                                        { backgroundColor: COLOR.SECONDARY }]}
                                        >
                                            <Image style={styles.image} source={ICON.MINUS_WHITE} />


                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>
                            {/* {costError ? <Text style={styles.errorText}>{costError}</Text> : null} */}

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

export default AddAdhocCostPrompt

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
    }, costContainer: {
        // backgroundColor: 'red',


        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        borderColor: COLOR.GREY_FOUR,



    }, counterContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'space-around',
    }, counterButtonContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-around'

    }, counterButton: {
        height: moderateScale(15),
        width: moderateScale(15),
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 5,
        elevation: 5,
        padding: moderateScale(3),




    },
    costTextInput: {
        width: '80%',
        textAlign: 'center',
        fontFamily: FONT.PRIMARY_BOLD,
        fontSize: moderateScale(19),
        padding: 15,
        color: COLOR.BLACK


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