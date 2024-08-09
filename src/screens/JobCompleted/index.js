import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
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

const JobCompletedScreen = () => {
  //
  const [message, setMessage] = useState('');
  const [ratingValue, setRatingValue] = useState(0);


  const handleRatingChange = value => {
    setRatingValue(value);
    console.log(ratingValue);
  };

  // attachment dummy data

  const attachment = [{id: "01", data :"one"},{id: "02", data :"one"}]

  // worker dummy data

  const workers = [{id: "01", data :"John Smith"},{id: "02", data :"Jaons"}, ]


  //
  const renderAttachments = (item) => (
     
    <TouchableOpacity style={{flexDirection: 'row',  alignItems: 'center', marginVertical:moderateScale(5)}}>
        <View style={{height: moderateScale(50), width: moderateScale(40),  overflow: 'hidden'}}>
    <Image source={require('../../../assets/icons/logout.png')} resizeMode='contain' style={{height: '100%', width: '100%'}} />
</View>

          <Text style={[textStyles.parameterValue, {marginLeft: moderateScale(10)}]}>asdasdasdasd.pdf</Text>

        </TouchableOpacity>
  )

  // render worker
  const renderWorkers = (item, index) => (



    <KeyValueText keyText={`Worker ${index + 1} : `} valueText={item.data}></KeyValueText>

  )


  return (
    <View style={styles.container}>
        <MinimalHeader title={"Job Completed"} buttonText={"Back"}/>
<View style={{flex:18, }}>
<ScrollView style={{flexGrow:1,}} showsVerticalScrollIndicator={false}>
      <ContentHeader title={"Job Info"} />
      <View style={styles.sectionContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: moderateScale(5)}}>
          {/* <Text style={textStyles.parameterName}>Parent Job : <Text style={textStyles.parameterValue}>20002221</Text></Text>
          <Text style={textStyles.parameterName}>Master Job : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}
<KeyValueText keyText={"Parent Job : "} valueText={"20002221"} />
<KeyValueText keyText={"Master Job : "} valueText={"20002221"} />

        </View>

        
        <Text style={[textStyles.multilineContent, {marginVertical: moderateScale(5)}]}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est officia fuga, quidem qui quae dolorum expedita nesciunt ullam? Dignissimos corporis, corrupti mollitia itaque distinctio quasi pariatur optio et saepe deleniti?</Text>
        <KeyValueText keyText={"Priority : "} KeyStyle={{fontFamily: FONT.PRIMARY_SEMI_BOLD, marginVertical: moderateScale(10), }} valueText={"High"} valueStyle={{color: COLOR.SECONDARY}} />

      </View>

       {/*CUSTOMER INFO */}
       <ContentHeader title={"Customer Info"} />
       <View style={styles.sectionContainer}>

       <KeyValueText keyText={"Customer Name : "} valueText={"20002221"}></KeyValueText>
<KeyValueText keyText={"Customer Location : "} valueText={"20002221"}></KeyValueText>
<KeyValueText keyText={"Customer Phone No : "} valueText={"20002221"}></KeyValueText>
  </View>

{/* WORKER */}

<ContentHeader title={"Workers"} />
<View style={styles.sectionContainer}>
        
<Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>No of People in Job : <Text style={textStyles.parameterValue}>{workers.length}</Text></Text>
        <FlatList
       data={workers}
       renderItem={({ item, index }) => renderWorkers(item, index)}

       keyExtractor={(item) => item.id} // Efficient key extraction
     />
 
 
 
         
        </View>
 
{/* ATTACHMENTS */}
<ContentHeader title={"Attachments"} />
<View style={styles.sectionContainer}>
        
       <FlatList
      data={attachment}
      renderItem={renderAttachments}
      keyExtractor={(item) => item.id} // Efficient key extraction
    />



        
       </View>


{/* TIME INFO */}


<ContentHeader title={"Time Info"} />
<View style={styles.sectionContainer}>
       {/* <Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>Started Time : <Text style={textStyles.parameterValue}>20002221</Text></Text>
       <Text style={[textStyles.parameterName, {marginVertical: moderateScale(5)}]}>Duration : <Text style={textStyles.parameterValue}>20002221</Text></Text> */}

<KeyValueText keyText={"Started Time : "} valueText={"20002221"}></KeyValueText>
<KeyValueText keyText={"Duration : "} valueText={"20002221"}></KeyValueText>
<KeyValueText keyText={"Completed Time : "} valueText={"6.00PM - 12.02.2024"}></KeyValueText>



       </View>

       {/* STATUS */}

       <ContentHeader title={"Status"} />
       <View style={styles.sectionContainer}>
       <Text style={[textStyles.parameterValue, {marginVertical: moderateScale(5)}]}>Closed</Text>


       </View>

       {/* ADDING SIGNATURE */}

<ContentHeader title={"Signature"} />
<View style={styles.sectionContainer} >
        
<View style={styles.signatureContainer}>



</View>

 
         
        </View>

       {/* RATING */}
<ContentHeader title={"Rating"} />
<View style={[styles.sectionContainer, {alignItems: 'flex-start', paddingVertical: moderateScale(20)}]}>
        
<AirbnbRating
        showRating={false}
        size={30}
        defaultRating={3}
        onFinishRating={handleRatingChange}
      />
<Text style={[textStyles.multilineContent, {marginVertical: moderateScale(15)}]}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore aspernatur laudantium quis illo et assumenda, voluptatibus ea quisquam culpa sed neque explicabo numquam veniam corrupti enim laborum saepe! Neque, molestiae?</Text>      
</View>
       

      </ScrollView>
      
</View>
      
    </View>
  );

};

export default JobCompletedScreen;



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
  },signatureCanvas: {
   
  },
})

// //
