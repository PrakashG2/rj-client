import React, {useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
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

import SignatureCanvas from 'react-native-signature-canvas';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedBack } from './jobFeedBackReducer';
import { useRoute } from '@react-navigation/native';
import { showPrompt, hidePrompt } from '../../components/ConfirmationPrompt/reducer';



const FeedBackScreen = ({ navigation }) => {
  const route = useRoute();
  const {jobId, uniqueId}  = route.params;

  const signatureRef = useRef(null); // Reference to SignatureCanvas component

  const [scrollEnabled, setScrollEnables] = useState(true);
  const [clearButtonEnabled, setClearButtonEnabled] = useState(false);

  // dispatch
  const dispatch = useDispatch();




  



   //
   const jobInformation = useSelector((state) => state.jobInformation.jobInformation)



  //
  const [message, setMessage] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  //sample base64 signature
  const sig = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="


  

  // attachment dummy data

  const attachment = [{id: "01", data :"one"},{id: "02", data :"one"}]

  // worker dummy data

  const workers = [{id: "01", data :"John Smith"},{id: "02", data :"Jaons"}, ]

  const [signatureData, setSignatureData] = useState(''); // New state variable


  // signature
  const handleSignatureBegin = () => {
setScrollEnables(false);
setClearButtonEnabled(true)
  }

  const handleSignatureEnd = () => {
    setScrollEnables(true);
    signatureRef.current.readSignature()


  
    setSignatureData(signatureRef.current.readSignature());

  }

  const handleData = (signature) => {
    console.log(signature);
    setSignatureData(signature)
  };
  



  const handleClearButton = () => {
    signatureRef.current.clearSignature();
    setSignatureData();

  }

  // handle rating
  const handleRatingChange = value => {
    setRatingValue(value);
    console.log(ratingValue);
  };
  

  //
  const renderAttachments = (item) => (
     
    <TouchableOpacity style={{flexDirection: 'row',  alignItems: 'center', marginVertical:moderateScale(5)}}>
        <View style={{height: moderateScale(50), width: moderateScale(40),  overflow: 'hidden'}}>
    <Image source={require('../../../assets/icons/logout.png')} resizeMode='contain' style={{height: '100%', width: '100%'}} />
</View>

          <Text style={[textStyles.parameterValue, {marginLeft: moderateScale(10)}]}>asdasdasdasd.pdf</Text>

        </TouchableOpacity>
  )
  const isSaveButtonDisabled = !(signatureData && ratingValue && message);

  // render worker
  const renderWorkers = (item, index) => (



    <KeyValueText keyText={`Worker ${index + 1} : `} valueText={item.data}></KeyValueText>

  )

  // save

  const handleSaveButton = () => {
    if (isSaveButtonDisabled) {
      return
    }else{
      dispatch(setFeedBack({jobId: jobId, rating: ratingValue, comment: message, base64data: signatureData}))
navigation.navigate("home")


    }
  }
  const navigateBack = () => {
    navigation.goBack();
    dispatch(hidePrompt());
  };

  const handleBackButtonTwo = () => {
    navigation.navigate("home")
    dispatch(hidePrompt());


  }
  const handleBackButton = () => {
   
  
    dispatch(showPrompt({
      prompt: true,
      buttonOneText: "Yes",
      buttonTwoText: "No",
      message: "Are you sure? you haven't added any feedback yet!",
      buttonOneOnPress: handleBackButtonTwo,
      buttonTwoOnPress: () => dispatch(hidePrompt())
    }));
  };
  

  const webStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .m-signature-pad--footer {
    display: none;
    margin: 0;
    padding: 0;
  }
  .m-signature-pad--body {
    border: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
    margin: 0;
    padding: 0;
  }
`;




  return (
    <SafeAreaView style={styles.container}>
        <MinimalHeader title={`Job# ${uniqueId}`} buttonOnPress={handleBackButton} buttonText={"Back"}/>
<View style={{flex:18, }}>
<ScrollView style={{flexGrow:1,}} showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}
>
      <ContentHeader title={"Job Info"} />
      <View style={styles.sectionContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: moderateScale(5)}}>
          {/* <Text style={textStyles.parameterName}>Parent Job : <Text style={textStyles.parameterValue}>20002221</Text></Text>
          <Text style={textStyles.parameterName}>Master Job : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}
<KeyValueText keyText={"Parent Job : "} valueText={(jobInformation.data.job.parent?.jobNumber?.uniqueNumber) ?? "-"} />
<KeyValueText keyText={"Master Job : "} valueText={(jobInformation.data.job.masterJob?.jobNumber?.uniqueNumber) ?? "-"} />

        </View>
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

       {/* <KeyValueText 
  keyText={"Customer Location : "} 
  valueText={`${jobInformation.data.job.location?.address?.streetAddress1 ?? "No location"}, ${jobInformation.data.job.location?.address?.streetAddress2 ?? ""}, ${jobInformation.data.job.location?.address?.streetAddress3 ?? ""}, ${jobInformation.data.job.location?.address?.city ?? ""}, ${jobInformation.data.job.location?.address?.administrativeArea ?? ""}, ${jobInformation.data.job.location?.address?.postalCode ?? ""}, ${jobInformation.data.job.location?.address?.country ?? ""}`}
></KeyValueText> */}

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


<KeyValueText keyText={"Customer Phone No : "} valueText={(jobInformation.data.job.contactTelephoneNumber) ?? "-"}></KeyValueText>
  </View>
{/* ADDING SIGNATURE */}

<ContentHeader title={"Add Your Signature"} />
<View style={styles.sectionContainer} >
        
<View style={styles.signatureContainerOuter}>
<SignatureCanvas
webStyle={webStyle}

scrollable={false}
        ref={signatureRef}
        style={styles.signatureCanvas}

        onBegin={handleSignatureBegin}
        onEnd={handleSignatureEnd}
        onOK={handleData}

      
      />


</View>
{ clearButtonEnabled && (<PillShapeButton buttonText={"Clear"} buttonStyle={{ backgroundColor: COLOR.SECONDARY, alignSelf: 'flex-end' }} onPress={() => handleClearButton()}></PillShapeButton>
)}
 
         
        </View>
 
{/* RATING */}
<ContentHeader title={"Rating"} />
<View style={[styles.sectionContainer, {alignItems: 'flex-start', paddingVertical: moderateScale(20)}]}>
        
<AirbnbRating
        showRating={false}
        size={30}
        defaultRating={0}
        onFinishRating={handleRatingChange}
      />
      <Text style={{fontFamily: FONT.PRIMARY_MEDIUM, fontSize: moderateScale(14), marginTop: moderateScale(20), color: COLOR.BLACK}}>About your experience</Text>
      
      <TextInput
              multiline
              onChangeText={(text) => setMessage(text)}
              style={[
                styles.signatureContainer,
                {
                  height: moderateScale(130),
                  textAlignVertical: 'top',
                  padding:moderateScale(10),
                  fontSize: moderateScale(14),
                  color: COLOR.BLACK
                },
              ]}></TextInput>
<PillShapeButton buttonText={"Save"} buttonStyle={{ backgroundColor: isSaveButtonDisabled ? COLOR.GREY_ONE : COLOR.LIGHT_GREEN, marginVertical: moderateScale(15), alignSelf: 'flex-end' }} onPress={handleSaveButton}></PillShapeButton>

       </View>


{/* TIME INFO */}





      </ScrollView>
      
</View>
      
    </SafeAreaView>
  );

};

export default FeedBackScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal:moderateScale(20),paddingVertical: moderateScale(15), backgroundColor: COLOR.WHITE
  },signatureContainer: {
    height: moderateScale(100),
    width: '100%',
    borderWidth: 2,
    borderColor: COLOR.GREY_THREE,
    borderRadius: 15,
    marginVertical: moderateScale(10),
    overflow: 'hidden',
  },signatureContainerOuter: {
    height: moderateScale(100),
    width: '100%',
    borderWidth: 2,
    borderColor: COLOR.GREY_THREE,
    borderRadius: 15,
    marginVertical: moderateScale(10),
    overflow: 'hidden',
  },
  signatureCanvas: {
    width: '100%',
    height: '100%',
  },
 
})

// //
