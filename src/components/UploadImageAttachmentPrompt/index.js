import { StyleSheet, Text, TouchableWithoutFeedback, View, Image, Touchable, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../utilities/colors'
import { moderateScale } from 'react-native-size-matters'
import PillShapedButton from '../PillShapedButtonV2'
import * as Animatable from 'react-native-animatable';
import { ICON } from '../../utilities/icons';
import textStyles from '../../utilities/textStyles'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { uploadAttachment } from '../../screens/JonInformation/jobInformationReducer'
import { hideUploadImageAttachmentPrompt } from './UploadImageAttachmentPromptSlice'
import { FONT } from '../../utilities/fonts'

const AddImageAttachmentPrompt = ({ handleClosePrompt, imageUri, fileName, jobId, names }) => {

    const { showPrompt } = useSelector(state => state.uploadImageAttachmentPrompt);
    const [error, setError] = useState('');



    const dispatch = useDispatch();

    const currentDate = moment();
    const formattedDateTime = currentDate.format('YYYY-MM-DD-HH-mm-ss'); // Desired format
    const defaultName = `${formattedDateTime}`;

    const [imageName, setImageName] = useState(defaultName);

    useEffect(() => {
        // Reset image name to default when imageUri changes
        setImageName(defaultName);

        console.log("**********************",names)
    }, [imageUri]);

    const getFileExtension = () => {
        if (fileName) {
            const extension = fileName.split('.').pop();
            return extension.toLowerCase(); // Convert to lowercase for consistency
        } else if (imageUri) {
            const uriComponents = imageUri.split('.');
            if (uriComponents.length > 1) {
                const extension = uriComponents.pop().toLowerCase();
                return extension;
            }
        }
        return ''; // Return empty string if unable to determine extension
    };


    const handleInputChange = (value) => {
        setImageName(value); // Allow users to edit the name portion only

        console.log("-------------------", imageName.endsWith('.jpg') ? imageName : `${imageName}.jpg`)
    }

    const handleUpload = () => {

        if (imageName.trim() === '') {
            setError('Image name cannot be empty');
            return;
        }

        // const fileExtension = getFileExtension();
                const fileExtension = "png";

        const nameWithExtension = imageName.endsWith(`.${fileExtension}`) ? imageName : `${imageName}.${fileExtension}`;
// Check if imageName is already in the attachmentNames list
if (names.includes(nameWithExtension)) {
    setError('Found another attachment with same name. Use differnt name');

    return;
}
        

        const payload = {
            selectedFile: imageUri, // Replace with your actual file object
            jobId: jobId, // Replace with your actual job ID
            description: "sampleDescription",
            name: nameWithExtension,
        };
        dispatch(uploadAttachment(payload));

        dispatch(hideUploadImageAttachmentPrompt())
        setError('');

    }

    const handleCancel = () => {
        dispatch(hideUploadImageAttachmentPrompt())
        setError('');

    }

    console.log("-------------------------", imageUri)
    return (

        showPrompt && (
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
                            <View>
                                <Text style={textStyles.promptMessage}>Attachments</Text>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.imageSection}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: imageUri }} style={styles.image} />
                                    </View>
                                </View>
                                <View style={styles.imageDetailsSection}>
                                    <TextInput
                                        style={textStyles.parameterValue}
                                        value={imageName}
                                        onChangeText={handleInputChange}
                                    ></TextInput>
                                </View>


                            </View>
                            {error !== '' && <Text style={styles.errorText}>{error}</Text>}


                            <View style={styles.buttonContainer}>

                                <PillShapedButton buttonText="Cancel" buttonStyle={{ backgroundColor: COLOR.SECONDARY }} onPress={handleCancel} />
                                <PillShapedButton buttonText="Upload" onPress={handleUpload} />

                            </View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        ))
}

export default AddImageAttachmentPrompt

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
    body: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: COLOR.GREY_FOUR,

        // borderRadius: 15,
        marginVertical: moderateScale(15),
        alignItems: 'center'
        // elevation: 15,
    },
    buttonContainer: {
        height: moderateScale(30),
        marginVertical: moderateScale(5),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    imageSection: {
        flex: 1,
        padding: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'

    }, imageDetailsSection: {
        flex: 3,
        padding: moderateScale(5),
        justifyContent: 'center',

        height: 70,
        // backgroundColor: 'red'
    }, imageContainer: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: 5
    }, image: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR.GREY_THREE

    }, errorText: {
        color: 'red',
        marginBottom: moderateScale(10),
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontFamily: FONT.PRIMARY_BOLD
    },

});