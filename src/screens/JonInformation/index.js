import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Platform,
  PermissionsAndroid,
  Alert,
  SafeAreaView
} from 'react-native';

// Components
import AppBar from '../../components/AppBar';
import Ratings from '../../components/Ratings';
import Button from '../../components/Button';

//
import {images} from '../../../assets/icons/index';
import MinimalHeader from '../../components/minimalHeader';
import textStyles from '../../utilities/textStyles';
import { COLOR } from '../../utilities/colors';
import { FONT } from '../../utilities/fonts';
import ContentHeader from '../../components/contentHeader';
import PillShapeButton from '../../components/pillShapeButton';
import { moderateScale, scale } from 'react-native-size-matters';
import KeyValueText from '../../components/KeyValueText';
import { useDispatch, useSelector } from 'react-redux';
import { getJobInformation } from './jobInformationReducer';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { hidePrompt, showPrompt } from '../../components/ConfirmationPrompt/reducer';
import { updateJobs } from '../Home/homeReducer';
import SignatureCanvas from 'react-native-signature-canvas';
import { AirbnbRating } from 'react-native-ratings';
import moment from 'moment-timezone';
import { showPdfViewer } from '../../components/PdfViewer/pdfViewrReducer';

import FileViewer from "react-native-file-viewer";

import base64 from 'base64-js';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';

import { check, request, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';

import RNFS, { stat } from 'react-native-fs';
import { ICON } from '../../utilities/icons';


//
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { hidePicturedPrompt, showPicturedPrompt } from '../../components/PicturedConfirmationPrompt/picturedConfirmationPromptSlice';
import { hideLoader, showLoader } from '../../components/customLoader/reducer';
import ImageSourcePrompt from '../../components/ImageSourcePrompt';
import AddAdhocCostPrompt from '../../components/AddAdhocCostPrompt';
import AddNotePrompt from '../../components/AddNotePrompt';
import AddImageAttachmentPrompt from '../../components/UploadImageAttachmentPrompt';
import { showUploadImageAttachmentPrompt } from '../../components/UploadImageAttachmentPrompt/UploadImageAttachmentPromptSlice';
import { Image as ImageCompressor } from 'react-native-compressor';



const JobInformationScreen = ({ navigation }) => {
  const route = useRoute();
  const  ids  = route.params.id;
  const  status  = route.params.status;
  const jobUniqueId = route.params.jobUniqueId
  const timesheetId = route.params.timesheetId

  // Image Source Prompt Visiblity
  const [imageSourcePrompt, setImageSourcePrompt] = useState(false)

  //Add  AddHoc cost Prompt
  const [addAddhocCostPrompt, setAddAddhocCostPrompt] = useState(false)
  //ADD NOTE PROMPT
  const [addNotePrompt, setAddNotePrompt] = useState(false)
  // ADD IMAGE ATTACHMENT PROMPT
  const [addImageAttachmentPrompt, setAddImageAttachmentPrompt] = useState(false)
  const [imageData, setImageData] = useState({
    imageUri: '',
    name: '',
});

const [attachmentNames, setAttachmentNames] = useState([])





  console.log("_________________________________________________________________",ids);
  const id  = 27;
  //
  const [message, setMessage] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  const sig = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="


  // dispatch
  const dispatch = useDispatch();

  const signatureRef = useRef(null); // Reference to SignatureCanvas component


  



   //
   const jobInformation = useSelector((state) => state.jobInformation.jobInformation);

  //useEffect

  useFocusEffect(
    React.useCallback(() => {
      const jobIdInt = parseInt(ids); // Parse as base 10 (decimal)
      dispatch(getJobInformation({ jobId: ids }))
    }, [])
  );

  const [timestampDummy, setTimestampDummy] = useState('2024-05-08T16:57:00.000Z'); // Replace with your timestamp
  const [userLocalTime, setUserLocalTime] = useState(null);

  const adhocCostDummyData = [
    {
      cost: 150,
      description: "Cost for office supplies",
      time: "2024-05-01T10:00:00Z"
    },
    {
      cost: 300,
      description: "Travel expenses for client meeting",
      time: "2024-05-02T14:30:00Z"
    },
    {
      cost: 200,
      description: "Software subscription fee",
      time: "2024-05-03T09:00:00Z"
    },
    {
      cost: 100,
      description: "Miscellaneous expenses",
      time: "2024-05-04T16:00:00Z"
    }
  ];

//   useEffect(() => {
//     const jobIdInt = parseInt(ids); // Parse as base 10 (decimal)
// dispatch(getJobInformation({ jobId: ids }))
//     // dispatch(getJobInformation({ jobId: ids.toInt })) // Use route.params.id directly
//   }, [ids]);
  


  const handleRatingChange = value => {
    setRatingValue(value);
    console.log(ratingValue);
  };

  // attachment dummy data

  const attachment = [{id: "01", data :"one"},{id: "02", data :"one"}]

  // worker dummy data

  const workers = [{id: "01", data :"John Smith"},{id: "02", data :"Jaons"}, ]


  // Function to handle attachment
// const handleAttachment = (attachmentBase64Data) => {
//   // Extract Base64 string from the data
//   const base64String = attachmentBase64Data.split(';base64,').pop();

//   // Dispatch an action to show the PDF viewer with the extracted Base64 string
//   dispatch(showPdfViewer({ pdfData: base64String }));
// }

const checkPermission = async (attachmentBase64Data, name, mimeType) => {
  try {
    

    let permission;
    if (Platform.OS === 'android') {
      let androidVersion = Platform.constants.Release;

      if (androidVersion >= 13) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        // permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, // Add other permissions if needed
        ]);

        if (
          result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
          result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Both permissions are granted
          console.log('Both permissions are granted', RESULTS.GRANTED);
          handleAttachment(attachmentBase64Data, name, mimeType);

        } else {
          // Handle the case where one or both permissions are denied
          console.log('One or both permissions are denied');
        }
       
      }
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.MEDIA_LIBRARY;
    } else {
      console.warn('Unsupported platform');
      return;
    }

    const status = await check(permission);
    if (status === RESULTS.GRANTED) {
      console.log('Storage access granteds');
      handleAttachment(attachmentBase64Data, name, mimeType);
    } else if (status === RESULTS.DENIED) {
      requestPermission(permission, attachmentBase64Data, name, mimeType);
    } else if (status === RESULTS.BLOCKED) {
      openAppSettings();
    }
  } catch (error) {
    console.error('Error checking permission:', error);
  }
};

const requestPermission = async (permission, attachmentBase64Data, name, mimeType) => {
  try {
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Storage access granted');
      handleAttachment(attachmentBase64Data, name, mimeType);

    } else if (result === RESULTS.DENIED) {
      requestPermission(permission, attachmentBase64Data, name, mimeType);
    } else if (result === RESULTS.BLOCKED) {
      openAppSettings();
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
};

const openAppSettings = () => {
  if (Platform.OS === 'android') {
    Alert.alert(
      'Permission required',
      'Please grant storage access permission in the app settings',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Settings',
          onPress: () => {
           Linking.openSettings();
            
          },
        },
      ],
      { cancelable: false }
    );
  } else if (Platform.OS === 'ios') {
    Alert.alert(
      'Storage Access Required',
      'To grant storage access for this app, please follow these steps:\n1. Open your device Settings.\n2. Find and tap on this app in the list.\n3. Toggle on "Storage" permission.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  } else {
    console.warn('Unsupported platform');
  }
};

const handleAttachment = async (attachmentBase64Data, name, mimeType) => {
  try {
    

    // Construct the file path within the Document Directory
    const path = `${RNFS.DocumentDirectoryPath}/${name}`;

    // Check if file already exists
    const exists = await RNFS.exists(path);
    if (exists) {
      console.log("file already exist")
      await openFile(path, mimeType);
      return; // Exit function if file already exists
    }
    await RNFS.writeFile(path, attachmentBase64Data.split(';base64,').pop(), 'base64');
    
    console.log('File saved successfully:', path);

    await openFile(path, mimeType);
  } catch (error) {
    console.error('Error handling attachment:', error);
    // Handle any error occurred during file handling
  }
};

const openFile = async (path, mimeType) => {
  try {
    if (Platform.OS === 'android') {
      await FileViewer.open(path, { showOpenWithDialog: true });
      
    } else {
      dispatch(showLoader())
      await FileViewer.open(path, { showOpenWithDialog: true });    
      dispatch(hideLoader())
    }
  }catch (error) {
    console.error('An error occurred while opening file:', error);

    if (error.message.includes('No app associated with this mime type')) {
      dispatch(showSnackbar({ message: 'No app found to open this file type', color: 'red' }));
    } else {
      dispatch(showSnackbar({ message: 'Something Went Wrong', color: 'red' }));
    }
  }
};



  //
//   const renderAttachments = (item, index) => (

     
//     <TouchableOpacity style={{flexDirection: 'row',  alignItems: 'center', marginVertical:moderateScale(5)}} onPress={() => checkPermission(item.data, item.documnetValue.name, item.documnetValue.mimeType)}>
//         <View style={{height: moderateScale(40), width: moderateScale(40),  overflow: 'hidden'}}>
//     <Image source={require('../../../assets/icons/attachment.png')} resizeMode='contain' style={{height: '100%', width: '100%'}} />
// </View>

//           <Text style={[textStyles.parameterValue, {marginLeft: moderateScale(10)}]}>{item.documnetValue.name}</Text>

//         </TouchableOpacity>
//   )

// Inside your component function

// Function to update attachmentNames state with unique attachment names
const updateAttachmentNames = (newAttachmentName) => {
  setAttachmentNames(prevAttachmentNames => {
    // Check if the new attachment name already exists in the array
    if (!prevAttachmentNames.includes(newAttachmentName)) {
      // If not, add the new attachment name to the array
      return [...prevAttachmentNames, newAttachmentName];
    }
    return prevAttachmentNames; // Return the current array without changes
  });
};

const renderAttachments = (item, index) => {
  // Extract the attachment name
  const attachmentName = item.documnetValue.name;

  // Update the attachment names array
  updateAttachmentNames(attachmentName);

  return (
    <TouchableOpacity style={{flexDirection: 'row',  alignItems: 'center', marginVertical:moderateScale(5)}} onPress={() => checkPermission(item.data, item.documnetValue.name, item.documnetValue.mimeType)}>
      <View style={{height: moderateScale(40), width: moderateScale(40),  overflow: 'hidden'}}>
        <Image source={require('../../../assets/icons/attachment.png')} resizeMode='contain' style={{height: '100%', width: '100%'}} />
      </View>
      <Text style={[textStyles.parameterValue, {marginLeft: moderateScale(10)}]}>{attachmentName}</Text>
    </TouchableOpacity>
  );
};


  // render worker
  const renderWorkers = (item, index) => (



    <KeyValueText keyText={`Worker ${index + 1} : `} valueText={item.resource.name}></KeyValueText>

  )

  // HANDLE TIMEZONE
  const formatDateTime = (timestamp) => {
    const userTimezone = moment.tz.guess(); 
    
    
    const formattedDateTime = moment(timestamp).tz(userTimezone).format('DD.MM.YYYY - h:mmA');
    
    return formattedDateTime;
}

// HANDLE TIMEZONE WITH SECONDS DATA
// const formatDateTime = (timestamp) => {
//   const userTimezone = moment.tz.guess(); // Detect user's time zone (optional)

//   const formattedDateTime = moment(timestamp).tz(userTimezone).format('h:mm:ssA - DD.MM.YYYY');
  
//   return formattedDateTime;
// }




  if (jobInformation === undefined || jobInformation.length === 0) {
    return (
        <View style={{ flex: 1, height: "100%", width: '100%', backgroundColor: "white" }}></View>
    );
}

// console.log("____________________________________________{{{{{{{-}}}}}}}", jobInformation.attachments[0].documnetValue)

const formatLocation = (location) => {
  if (!location) return ''; // Return empty string if location is not provided

  const { streetAddress1, streetAddress2, streetAddress3, city, administrativeArea, postalCode, country } = location;

  let formattedAddress = `${streetAddress1}, ${streetAddress2}, ${streetAddress3}, ${city}, ${administrativeArea}, ${postalCode}, ${country}`;
  // Remove any commas at the end of the string
  formattedAddress = formattedAddress.replace(/,\s*$/, "");

  return formattedAddress;
};

const handleButtonOne = () => {
 if (status == "Open") {
  dispatch(showPrompt({
    prompt: true,
    buttonOneText: "Yes",
    buttonTwoText: "No",
    message: "Are you sure you want to start the Job?",
    jobId: jobUniqueId,
    buttonOneOnPress: () => {
      dispatch(updateJobs({jobId: jobInformation.data.job.id, action: 'create', timesheetId: timesheetId}));
      dispatch(hidePrompt())
      navigation.goBack()
    },
    buttonTwoOnPress: () => dispatch(hidePrompt())
  }));

  const startJob = () => {
   

  };
 }else if (status == "InProgress") {
 
  
    dispatch(showPrompt({
      prompt: true,
      buttonOneText: "Yes",
      buttonTwoText: "No",
      message: "Are you sure you want to pause the Job?",
      jobId: jobUniqueId,
      buttonOneOnPress: () => {
        dispatch(updateJobs({jobId: jobInformation.data.job.id, action: 'pause', timesheetId: timesheetId}));
        dispatch(hidePrompt())
        navigation.goBack()
      },
      buttonTwoOnPress: () => dispatch(hidePrompt())
    }));
  
  
 }else if (status == "Paused") {
 
  
  dispatch(showPrompt({
    prompt: true,
    buttonOneText: "Yes",
    buttonTwoText: "No",
    message: "Are you sure you want to resume the Job?",
    jobId: jobUniqueId,
    buttonOneOnPress: () => {
      dispatch(updateJobs({jobId: jobInformation.data.job.id, action: 'resume', timesheetId: timesheetId}));
      dispatch(hidePrompt())
      navigation.goBack()
    },
    buttonTwoOnPress: () => dispatch(hidePrompt())
  }));


}
}

// HANDLE END JOB BUTTON
const handleEndJobButton = () => {
  dispatch(showPrompt({
    prompt: true,
    buttonOneText: "Yes",
    buttonTwoText: "No",
    message: "Are you sure you want to end the Job?",
    jobId: jobUniqueId,
    buttonOneOnPress: () => {

      dispatch(updateJobs({jobId: jobInformation.data.job.id, action: 'end', timesheetId: timesheetId}));
      navigation.navigate('JobFeedback', {jobId: jobInformation.data.job.id, uniqueId: jobInformation.data.job.jobNumber.uniqueNumber})

      dispatch(hidePrompt())
      // navigation.goBack()
    },
    buttonTwoOnPress: () => dispatch(hidePrompt())
  }));

}

// HANDLE DURATION
const formatDuration = (durationInSecondsString) => {
  const durationInSeconds = parseFloat(durationInSecondsString); // Convert duration to number
  if (isNaN(durationInSeconds)) {
    return 'Invalid duration'; // Return an error message if the duration is not a valid number
  }
  
  if (durationInSeconds < 60) {
    return `${durationInSeconds} ${durationInSeconds === 1 ? 'second' : 'seconds'}`;
  } else if (durationInSeconds < 3600) {
    const minutes = Math.floor(durationInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else {
    const hours = Math.floor(durationInSeconds / 3600);
    const remainingMinutes = Math.floor((durationInSeconds % 3600) / 60);
    let durationString = '';
    if (hours > 0) {
      durationString += `${hours}${(remainingMinutes > 0 ? '.' + Math.floor((durationInSeconds % 3600) / 60) : '')} hour`;
      if (hours !== 1 || remainingMinutes !== 0) {
        durationString += 's';
      }
    }
    return durationString;
  }
};

// HANDLE CALL FUNCTION
const handleCall = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.openURL(url);
};

// HANDLE ADD ATTACHEMNT
const handleAddAttachments = async () => {
  setImageSourcePrompt(true);
};

// Request Global Permissions
const requestUserPermission = async (permission,deniedMessage) => {

  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      
      const result = await request(permission);

      switch (result) {
        case RESULTS.DENIED:
          return { status: 'DENIED', message: 'The permission has not been requested / is denied but requestable' };
        case RESULTS.LIMITED:
          return { status: 'LIMITED', message: 'Limited Premission Granted' };
        case RESULTS.GRANTED:
          return { status: 'GRANTED', message: 'The permission is granted' };
        case RESULTS.BLOCKED:
          openApplicationSettings(deniedMessage);
          return { status: 'BLOCKED', message: 'The permission is blocked, opening settings' };
        default:
          return { status: 'UNKNOWN', message: 'Unknown permission status' };
      }
    } else {
      console.warn('Unsupported platform');
      return { status: 'UNSUPPORTED_PLATFORM', message: 'Unsupported platform' };
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
    return { status: 'ERROR', message: 'Error requesting permission' };
  }

}

// Open Apllication Settings
const openApplicationSettings = async (deniedMessage) => {
  if (Platform.OS === 'android') {
    Alert.alert(
      'Access Permission required',
      deniedMessage,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Settings',
          onPress: () => {
           Linking.openSettings();
            
          },
        },
      ],
      { cancelable: false }
    );
  } else if (Platform.OS === 'ios') {
    Alert.alert(
      'Access Permission Required',
      deniedMessage,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  } else {
    console.warn('Unsupported Platform');
  }
}

// Add Picture From Gallery
const handleGallery = async () => {

  setImageSourcePrompt(false)

  
  dispatch(hidePicturedPrompt({}))

  const options = {
    mediaType: 'photo',
    selectionLimit: 0, // Allow multiple selections (default: 0 -> no limit)
    quality: 1,
  };

  let permission;

  const checkAndroidVersion = () => {
    let androidVersion = Platform.constants.Release;

    if (androidVersion >= 13) {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      return permission
    } else {
     permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE};
     return permission;
  
  }

  

   permission = checkAndroidVersion();
  const deniedMessage = Platform.OS === 'android'
    ? 'Gallery permission is required to select photos. Please enable it in the app settings.'
    : 'To grant Photo Library access for this app, please follow these steps:\n1. Open your device Settings.\n2. Find and tap on this app in the list.\n3. Toggle on "Photos" permission.';
    const { status, message } = await requestUserPermission(permission, deniedMessage);

    if (status === 'GRANTED' || status === "LIMITED") {
      let compressedImage;


      const result = await launchImageLibrary(options);

      const { uri, fileName, type } = result.assets[0];

      // const isPng = type?.toLowerCase().includes('png'); // Check if image is PNG

      // // Compress and convert to PNG if necessary

      
        compressedImage = await ImageCompressor.compress(uri, {
          quality: 0.6, // Adjust quality for desired compression (0-1)
          output: 'png', // Specify output format as PNG
        });
       
    
  
      // Do something with the compressed PNG image (e.g., upload, display)
      // console.log('Compressed PNG image: --------------------------------------------------------->>>>>>>>>>>>>>>>', compressedImage);
   

        // Check image size
        const statResult = await RNFS.stat(compressedImage);
        const fileSizeInBytes = statResult.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB > 2) {
          dispatch(showSnackbar({ message: 'Select file under 2MB', color: 'red' }));
          return;
        }

      // console.log("----------------------****************", result.assets)
      setImageData({ imageUri: compressedImage, name: fileName });

      // // Log the new state values immediately after setting them
      // console.log(result.assets);
      // setAddImageAttachmentPrompt(true);
      // console.log("-------------------n-----", uri, fileName);
      

      dispatch(showUploadImageAttachmentPrompt())


    } else {
      console.warn(message);
    }


}

const handleCameraPermission = async () => {

  setImageSourcePrompt(false)


  const options = {
    mediaType: 'photo',
    selectionLimit: 3,
    quality: 1,
  };

    const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
    const deniedMessage = Platform.OS === 'android'
    ? 'Camera permission is required to take photos. Please enable it in the app settings.'
    : 'To grant Camera access for this app, please follow these steps:\n1. Open your device Settings.\n2. Find and tap on this app in the list.\n3. Toggle on "Camera" permission.';
    const { status, message } = await requestUserPermission(permission, deniedMessage);

    console.log(status, message);

    if (status === 'GRANTED' || status === "LIMITED") {
      const result = await launchCamera(options);
      const { uri, fileName } = result.assets[0];

      let compressedImage;
        compressedImage = await ImageCompressor.compress(uri, {
          quality: 0.6, // Adjust quality for desired compression (0-1)
          output: 'png', // Specify output format as PNG
        });

      // Check image size
      const statResult = await RNFS.stat(compressedImage);
      const fileSizeInBytes = statResult.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      


     if (fileSizeInMB > 2) {
       dispatch(showSnackbar({ message: 'Select file under 2MB', color: 'red' }));
       return;
     }

      setImageData({ imageUri: compressedImage, name: fileName });

      

      dispatch(showUploadImageAttachmentPrompt())

    } else {
      console.warn(message);
    }
  };

  

  // ADHOC COST LIST RENDER ITEMS ------------------------------------------------------------------
  const renderAdhocCostItems = (item) => (
    <TouchableOpacity style={styles.adhocCostItemContainer}>
      <KeyValueText keyText={"Cost : "} valueText={item.cost} />
      <KeyValueText keyText={"Description : "} valueText={item.description} />
      <KeyValueText keyText={"Date & Time : "} valueText={formatDateTime(item.created)} />
    </TouchableOpacity>
  )

  // NOTES RENDER ITEMS

  const renderNotes = (item) => (
    <TouchableOpacity style={styles.notesItemContainer}>
      <KeyValueText keyText={"Description : "} valueText={item?.notes?.text?.trim() ? item.notes.text : "-"} />
      <KeyValueText keyText={"Date & Time : "} valueText={formatDateTime(item.notes.created)} />
    </TouchableOpacity>
  )

  // ADD ADHOC COST
  const handleAddAddhocCost = () => {
    setAddAddhocCostPrompt(true)
  }

  // ADD ADDHOC COST SUBMIT
  const handleAddNote = () => {
setAddNotePrompt(true)
  }



const totalDurationUsedR = jobInformation.data.job.timeSheets.reduce((total, timesheet) => total + timesheet.timeUsed, 0);

const timeSheetLength = jobInformation.data.job?.timeSheets?.length;



const StartDateTime = formatDateTime(jobInformation.data.job?.timeSheets[0]?.startTime);
const endDateTime = formatDateTime(jobInformation.data.job?.timeSheets[timeSheetLength - 1]?.finishTime);
const durationInSeconds = jobInformation.data.job.duration;


const totalDurationUsed = jobInformation.data.job.timeSheets.reduce((total, timesheet) => total + timesheet.timeUsed, 0);


const formattedDuration = formatDuration(durationInSeconds);

  return (
    <View style={styles.container}>
      {imageSourcePrompt && (<ImageSourcePrompt buttonOneOnPress={handleCameraPermission} buttonTwoOnPress={handleGallery} handleClosePrompt={() => setImageSourcePrompt(false)}/>)}
      {addAddhocCostPrompt && (<AddAdhocCostPrompt jobId={ids} handleClosePrompt={() => setAddAddhocCostPrompt(false)}/>)}
      {addNotePrompt && (<AddNotePrompt jobId={ids} handleClosePrompt={() => setAddNotePrompt(false)}/>)}
      <AddImageAttachmentPrompt imageUri={imageData.imageUri} fileName={imageData.name} jobId={ids} names={attachmentNames}  handleClosePrompt={() => setAddImageAttachmentPrompt(false)}/>


        <MinimalHeader title={`Job# ${jobUniqueId}`} buttonText={"Back"} buttonOnPress={() => navigation.goBack()}/>
<View style={{flex:18, }}>
<ScrollView style={{flexGrow:1,}} showsVerticalScrollIndicator={false}>
      <ContentHeader title={"Job Info"} />
      <View style={styles.sectionContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
          {/* <Text style={textStyles.parameterName}>Parent Job : <Text style={textStyles.parameterValue}>20002221</Text></Text>
          <Text style={textStyles.parameterName}>Master Job : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}
<KeyValueText keyText={"Parent Job : "} valueText={(jobInformation.data.job.parent?.jobNumber?.uniqueNumber) ?? "-"} />
<KeyValueText keyText={"Master Job : "} valueText={(jobInformation.data.job.masterJob?.jobNumber?.uniqueNumber) ?? "-"} />

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <Text style={textStyles.parameterName}>Parent Job : <Text style={textStyles.parameterValue}>20002221</Text></Text>
          <Text style={textStyles.parameterName}>Master Job : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}
<KeyValueText keyText={"Risk Assesment : "} valueText={(jobInformation.data.job.riskAssesmentNumber) ?? "-"} />
<KeyValueText keyText={"Method Statement : "} valueText={(jobInformation.data.job.methodStatementNumber) ?? "-"} />

        </View>
        <KeyValueText keyText={"Customer Purchase Order : "} valueText={(jobInformation.data.job.salesOrder?.externalOrderNumber) ?? "-"} />

        <KeyValueText keyText={"Description : "} valueText={(jobInformation.data.job.description) ?? "-"} valueStyle={{fontFamily: FONT.PRIMARY_REGULAR}}/>
        <KeyValueText keyText={"Details : "} valueText={(jobInformation.data.job.details) ?? "-"} valueStyle={{fontFamily: FONT.PRIMARY_REGULAR}}/>

        {/* <Text style={[textStyles.multilineContent, {marginVertical: moderateScale(5)}]}>{jobInformation.data.job.description}</Text> */}
        <KeyValueText
  keyText={"Priority : "}
  KeyStyle={{ fontFamily: FONT.PRIMARY_SEMI_BOLD, marginVertical: moderateScale(10) }}
  valueText={jobInformation.data.job.priority}
  valueStyle={{
    color: jobInformation.data.job.priority === "Medium"
      ? COLOR.PRIMARY
      : jobInformation.data.job.priority === "High"
      ? COLOR.SECONDARY
      : COLOR.YELLOW, // Low priority
  }}
/>

      </View>

       {/*CUSTOMER INFO */}
       <ContentHeader title={"Customer Info"} />
       <View style={styles.sectionContainer}>

       <KeyValueText keyText={"Customer Name : "} valueText={jobInformation.data.job.customerAlias}></KeyValueText>
       {/* <KeyValueText keyText={"Customer Location : "} valueText={formatLocation(jobInformation.data.job.location.address)}></KeyValueText> */}

       {!jobInformation.data.job.location && (
 <KeyValueText 
 keyText={"Customer Location : "} 
 valueText={"-"}
></KeyValueText>
  
 
)}

{jobInformation.data.job.location && (
  <KeyValueText 
  keyText={"Customer Location : "} 
  valueText={`${jobInformation.data.job.location?.address?.streetAddress1 ?? "No location"}, ${jobInformation.data.job.location?.address?.streetAddress2 ?? ""}, ${jobInformation.data.job.location?.address?.streetAddress3 ?? ""}, ${jobInformation.data.job.location?.address?.city ?? ""}, ${jobInformation.data.job.location?.address?.administrativeArea ?? ""}, ${jobInformation.data.job.location?.address?.postalCode ?? ""}, ${jobInformation.data.job.location?.address?.country ?? ""}`}
></KeyValueText>
)

}
       

<TouchableOpacity onPress={() => handleCall(jobInformation.data.job.contactTelephoneNumber)}>
<KeyValueText keyText={"Customer Phone No : "} valueText={(jobInformation.data.job.contactTelephoneNumber) ?? "-"}></KeyValueText>
</TouchableOpacity>
  </View>

{/* WORKER */}

<ContentHeader title={"Workers"} />
<View style={styles.sectionContainer}>
        
<Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>No of People in Job : <Text style={textStyles.parameterValue}>{jobInformation.Allresources.length}</Text></Text>
        <FlatList
       data={jobInformation.Allresources}
       renderItem={({ item, index }) => renderWorkers(item, index)}

       keyExtractor={(item) => item.id} // Efficient key extraction
     />
 
 
 
         
        </View>
 
{/* ATTACHMENTS */}
<ContentHeader title={"Attachments"}  
actionButtonOneIcon={ICON.PLUS}
actionButtonOneOnPress={handleAddAttachments}
/>

<View style={styles.sectionContainer}>
        
         
{jobInformation.attachments.length > 0 ? (
          <FlatList
          data={jobInformation.attachments}
          virtualized={false} // Disable virtualization

          renderItem={({ item, index }) => renderAttachments(item, index)}
          keyExtractor={(item, index) => index.toString()} // Use index as a key
        />
        ) : (
          <Text style={textStyles.parameterValue}>No Attachments available</Text>
        )}




        
       </View>


          {/* ADHOC COST */}
          <ContentHeader title={"Adhoc Costs"} actionButtonOneIcon={ICON.PLUS}
            actionButtonOneOnPress={handleAddAddhocCost} />
          <View style={[styles.sectionContainer,
          { paddingHorizontal: 0, paddingVertical: 0 }]}>
            {jobInformation.data.job.jobCost.length > 0 ? (

              <FlatList

                data={jobInformation.data.job.jobCost}
                renderItem={({ item, index }) => renderAdhocCostItems(item, index)}
                keyExtractor={(item, index) => index.toString()} // Use index as a key
              />
            ) : (
              <Text style={[textStyles.parameterValue, {paddingVertical: moderateScale(15), paddingHorizontal: moderateScale(20)}]}>No Adhoc Cost available</Text>
            )}

          </View>


          {/* NOTES */}
          <ContentHeader title={"Notes"} actionButtonOneIcon={ICON.PLUS}
            actionButtonOneOnPress={handleAddNote}/>
          <View style={[styles.sectionContainer,
          { paddingHorizontal: 0, paddingVertical: 0 }]}>
            {jobInformation.data?.job?.note?.length > 0 ? (

              <FlatList

                data={jobInformation.data?.job?.note}
                renderItem={({ item, index }) => renderNotes(item, index)}
                keyExtractor={(item, index) => index.toString()} // Use index as a key
              />
            ) : (
              <Text style={[textStyles.parameterValue, {paddingVertical: moderateScale(15), paddingHorizontal: moderateScale(20)}]}>No Note available</Text>
            )}

          </View>


{/* TIME INFO */}


<ContentHeader title={"Time Info"} />
<View style={styles.sectionContainer}>
       {/* <Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>Started Time : <Text style={textStyles.parameterValue}>20002221</Text></Text>
       <Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>Duration : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}


<KeyValueText 
  keyText={"Estimated Duration : "} 
  valueText={formattedDuration}
></KeyValueText>


{status != "Draft" && status != "Open" && (
 <KeyValueText keyText={"Start Date & Time : "} valueText={StartDateTime}></KeyValueText>
  
 
)}
{/* <KeyValueText keyText={"Started Time : "} valueText={StartDateTime}></KeyValueText> */}

       
      

{status == "Completed" && (
 <KeyValueText 
 keyText={"Completed Date & Time : "} 
 valueText={endDateTime}
></KeyValueText>
  
 
)}

{status != "Open" && (
  <KeyValueText keyText={"Total Duration : "} valueText={formatDuration(totalDurationUsed)} />)}

       </View>

       {/* STATUS */}

       <ContentHeader title={"Status"} />
       <View style={[styles.sectionContainer,{borderBottomWidth:1, borderColor: COLOR.GREY_TWO}]}>
       <Text style={[textStyles.parameterValue, {marginVertical: moderateScale(5)}]}>{status}</Text>


       </View>

     
       {status !== "Completed" && status !== "Draft" && (
  <View style={{ height: scale(80), padding: moderateScale(20), alignItems: 'center', backgroundColor: COLOR.WHITE, flexDirection: 'row', justifyContent: 'space-between' }}>
    <PillShapeButton
      buttonText={status === "Open" ? "Start Job" : status === "Paused" ? "Resume Job" : "Pause Job"}
      buttonStyle={{ backgroundColor: COLOR.LIGHT_GREEN }}
      onPress={handleButtonOne}
    />
    {status !== "Open" && status !== "Completed" && (
          <PillShapeButton buttonText={"End Job"} buttonStyle={{ backgroundColor: COLOR.SECONDARY }} onPress={handleEndJobButton}/>

    )}
  </View>
)}


{/* SIGNATURE */}

{status == "Completed" && jobInformation.data.signature.length > 0 && (
  <View>
    <ContentHeader title={"Signature"} />
    <View style={styles.sectionContainer}>
  
  <View style={[styles.signatureContainer]}>
 
  <Image
  
      source={{ uri: jobInformation.data.signature[0].signatureData }} // Access first element in signature array
      style={styles.signatureImage}
    />

 
 </View>
 </View>

  </View>
  
 
)}

{/* RATING */}

{status == "Completed" && jobInformation.data.jobRatings.length > 0 && (
  <View>
    <ContentHeader title={"Rating"} />
    <View style={[styles.sectionContainer, {alignItems: 'flex-start', paddingVertical: moderateScale(15)}]}>
        
<AirbnbRating
isDisabled
        showRating={false}
        size={30}
        defaultRating={jobInformation.data.jobRatings[0].rating}
        // onFinishRating={handleRatingChange}
      />
      
      

       </View>
       <View style={[styles.sectionContainer, {alignItems: 'flex-start', paddingVertical: moderateScale(10), paddingBottom: moderateScale(20)}]}>
       <Text
              multiline
             
              style={[
                textStyles.multilineContent,
                {
                  // backgroundColor: 'red',
                  textAlignVertical: 'top',
                  fontSize: moderateScale(12)
                },
              ]}>{jobInformation.data.jobRatings[0].comment}</Text>
       </View>

  </View>
  
 
)}


{/* ADD FEEDBACK BUTTON */}


{status == "Completed" && jobInformation.data.jobRatings.length == 0 && (
  <View style={styles.sectionContainer}>
   <PillShapeButton buttonText={"Add Feedback"} buttonStyle={{ backgroundColor: COLOR.LIGHT_GREEN, marginVertical: moderateScale(15), alignSelf: 'flex-end', width: moderateScale(150) }} onPress={() => navigation.navigate('JobFeedback', {jobId: jobInformation.data.job.id, uniqueId: jobInformation.data.job.jobNumber.uniqueNumber})} ></PillShapeButton>

  </View>
  
 
)}

      


      </ScrollView>
      
</View>
      
    </View>
  );

};

export default JobInformationScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal:moderateScale(20),paddingVertical: moderateScale(15), backgroundColor: COLOR.WHITE
  },signatureContainer: {
    
    height: moderateScale(100),
    width: '100%',
    borderWidth:2,
    borderColor: COLOR.GREY_THREE,
    borderRadius:15,
    marginVertical: moderateScale(10),
    overflow: 'hidden'
  },signatureImage: {
    height: "100%",
    width: '100%',
    resizeMode: 'contain',
    // marginTop: moderateScale(20),
    // backgroundColor: 'red',
    // transform: [{ scale: 1.1 }]
  },
  adhocCostItemContainer: {

    borderBottomWidth: 2,
    borderBottomColor: COLOR.GREY_ONE,
    paddingHorizontal:moderateScale(20),paddingVertical: moderateScale(15)
  },notesItemContainer: {
    
    borderBottomWidth: 2,
    borderBottomColor: COLOR.GREY_ONE,
    paddingHorizontal:moderateScale(20),paddingVertical: moderateScale(15)
  }
  
})

// //
