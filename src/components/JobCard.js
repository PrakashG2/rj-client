
// JobCard.js
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

//
import {images} from '../../assets/icons';
import { COLOR } from '../utilities/colors';
import { moderateScale } from 'react-native-size-matters';
import { FONT } from '../utilities/fonts';
import { updateJobApi } from '../screens/Home/api';
import { useDispatch } from 'react-redux';
import { updateJobs } from '../screens/Home/homeReducer';
import { hidePrompt, showPrompt } from './ConfirmationPrompt/reducer';
import { getJobInformation } from '../screens/JonInformation/jobInformationReducer';

//

const JobCard = ({item, navigation}) => {

  const dispatch = useDispatch();
  // console.log("------------..>>>>>.........>>>>>>",item)



  const [play, setPlay] = useState(true);
  // Component for Dot
  const Dot = () => (
    <View
      style={[styles.dot, {backgroundColor: getStatusColor(item)}]}
    />
  );


  // Colored Pill Button Component
  const ColoredPillButton = ({color, onPress, icon, disabled}) => (
    <TouchableOpacity style={[styles.pillButton, {backgroundColor: color}]} onPress={onPress} disabled={disabled}>
      <Image style={{height: 20, width: 20}} source={icon}  />
    </TouchableOpacity>
  );

  // Function to get color based on status
  const getStatusColor = (item) => {
    switch (item?.completed) {
      case true:
        return COLOR.LIGHT_GREEN;
      default:
        switch (jobState) {
          case 'Completed':
            return COLOR.LIGHT_GREEN;
          case 'InProgress':
            return COLOR.YELLOW;
          case 'Open':
            return COLOR.PRIMARY;
          case 'Paused':
            return COLOR.SECONDARY;
          default:
            return COLOR.GREY_THREE;
        }
    }
  };
  
  

  const getPriorityColor = status => {
    const PriorityColors = {
      Low: COLOR.YELLOW,
      Medium: COLOR.PRIMARY,
      High: COLOR.SECONDARY,
    };

    // Check if the status is in the lookup object, otherwise return a default color
    return PriorityColors[status] || 'black';
  };

  // const [buttonThreeIcon, setButtonThreeIcon] = useState(require("../../assets/icons/rightArrow.png"))

  const buttonStates = {
    Completed: {
      buttonOne: getButtonConfig(COLOR.GREY_THREE, true, 'check-circle', () => {
        // Your onPress logic for completed state
      }),
      buttonTwo: getButtonConfig(COLOR.GREY_THREE, true, 'check-circle', () => {
        // Your onPress logic for completed state
      }),
      buttonThree: getButtonConfig(COLOR.GREY_THREE, true, require('../../assets/icons/rightArrow.png'), () => {
      }),
    },
    Open: {
      buttonOne: getButtonConfig(COLOR.LIGHT_GREEN, false, 'play-circle', () =>     navigation.navigate("JobLocation", {jobId: item.jobId, uniqueId: item.uniqueId})
    ),
    buttonTwo: getButtonConfig(COLOR.GREY_THREE, false, 'play-circle', () => {}),
      buttonThree: getButtonConfig(COLOR.PRIMARY, false, require('../../assets/icons/rightArrow.png'), () => handleStartButton()),
    },
    InProgress: {
      buttonOne: getButtonConfig(COLOR.LIGHT_GREEN, false, 'play-circle', () => navigation.navigate("JobLocation", {jobId: item.jobId, uniqueId: item.uniqueId})
    ),
      buttonTwo: getButtonConfig(COLOR.SECONDARY, false, 'play-circle', () => handleStopButton()),
      buttonThree: getButtonConfig(COLOR.PRIMARY, false, require('../../assets/icons/pause.png'), () => handlePauseButton()),
    },
    Paused: {
      buttonOne: getButtonConfig(COLOR.LIGHT_GREEN, false, 'pause-circle', () => {
        navigation.navigate("JobLocation", { jobId: item.jobId, uniqueId: item.uniqueId });
        dispatch(getJobInformation({ jobId: item.jobId }));
      }
      
    ),
      buttonTwo: getButtonConfig(COLOR.SECONDARY, false, 'pause-circle', () => handleStopButton()),
      buttonThree: getButtonConfig(COLOR.PRIMARY, false, require('../../assets/icons/continue.png'), ()=> handleResumeButton()),
    },
    default: {
      buttonOne: getButtonConfig(COLOR.GREY_THREE, false, 'circle', () => {
        // Your default onPress logic
      }),
      buttonTwo: getButtonConfig(COLOR.GREY_THREE, false, 'circle', () => {
        // Your default onPress logic
      }),
      buttonThree: getButtonConfig(COLOR.GREY_THREE, false, require('../../assets/icons/rightArrow.png'), () => {
        // Your default onPress logic
      }),
    },
  };
  
  function getButtonConfig(iconColor, disabled, icon, onPress) {
    return { iconColor, disabled, icon, onPress };
  }
  //
  function getJobState(item) {
    if (item.completed) {
      return 'Completed'; // Return state string
    } else if (item.draft) {
      return 'Draft';
    } else if (item.timesheetId !== null && item.status === 'pending') {
      return 'InProgress';
    }else if (item.timesheetId !== null && item.status === 'new') {
      return 'Paused';
    } else if (item.timesheetId === null) {
      const buttonData = [{ color: 'green'}]
      return 'Open'; // Green color for this state
    } 
  }
  
  // Usage in your component
  const jobState = getJobState(item); // Get the job state
  const color = jobState === 'Completed' ? 'red' : jobState === 'Open' ? 'green' : jobState === 'running' ? 'blue' : jobState === 'paused' ? 'yellow' : 'black'; // Determine color based on state
  
  const buttoncolor = jobState === 'Completed' ? 'red' : jobState === 'Open' ? 'green' : jobState === 'running' ? 'blue' : jobState === 'paused' ? 'yellow' : 'black';


  
  //
  const handlePress = () => {
    navigation.navigate("JobDetail", {id: item.jobId, status: getJobState(item), jobUniqueId: item.uniqueId, timesheetId: item.timesheetId })
  }

  const buttonConfig = buttonStates[jobState] || buttonStates.default;

  const buttonOneConfig = buttonConfig.buttonOne;
  const buttonTwoConfig = buttonConfig.buttonTwo;
  const buttonThreeConfig = buttonConfig.buttonThree;

  //
  const handleLocationButtton = () => {
    // console.log("location button pressed", item.completed)
    // dispatch(updateJobs())

    // console.log("location button pressed", item.completed)

    // if (jobState == 'ready') {
    //   console.log("location button pressede", jobState),
    //   dispatch(updateJobs({jobId: item.jobId, action: 'create', timesheetId: item.timesheetId}))
    // }

    if (jobState == 'running') {
      console.log("location button pressede", jobState),
      dispatch(updateJobs({jobId: item.jobId, action: 'pause', timesheetId: item.timesheetId}))
    }
  }

  //
  // const handleStartButton = () => {
  //   console.log("location button pressed", item.completed)

  //   if (jobState === 'Open') {
  //     console.log("location button pressed", item.completed)
  //   }
  // }

  const handleStopButton = () => {
    dispatch(showPrompt({
      prompt: true,
      buttonOneText: "Yes",
      buttonTwoText: "No",
      message: "Are you sure you want to End the Job?",
      jobId: item.uniqueId,
      buttonOneOnPress: stopJob,
      buttonTwoOnPress: () => dispatch(hidePrompt())
    }));
  };
  
  const stopJob = () => {
    dispatch(updateJobs({jobId: item.jobId, action: 'end', timesheetId: item.timesheetId}));
    dispatch(hidePrompt());
  };
  

  //
  const handleStartButton = () => {
    dispatch(showPrompt({
      prompt: true,
      buttonOneText: "Yes",
      buttonTwoText: "No",
      message: "Are you sure you want to Start the Job?",
      jobId: item.uniqueId,
      buttonOneOnPress: () => startJob(),
      buttonTwoOnPress: () => dispatch(hidePrompt())
    }));
  };
  
  const startJob = () => {
    dispatch(updateJobs({jobId: item.jobId, action: 'create', timesheetId: item.timesheetId}));
    dispatch(hidePrompt())
  };
  

  const handlePauseButton = () => {
    dispatch(showPrompt({
      prompt: true,
      buttonOneText: "Yes",
      buttonTwoText: "No",
      message: "Are you sure you want to Pause the Job?",
      jobId: item.uniqueId,

      buttonOneOnPress: () => pauseJob(),
      buttonTwoOnPress: () => dispatch(hidePrompt())
    }));
  };
  
  const pauseJob = () => {
    dispatch(updateJobs({jobId: item.jobId, action: 'pause', timesheetId: item.timesheetId}));
    dispatch(hidePrompt())
  };
  

const handleResumeButton = () => {
  dispatch(showPrompt({
    prompt: true,
    buttonOneText: "Yes",
    buttonTwoText: "No",
    message: "Are you sure you want to Resume the Job?",
    jobId: item.uniqueId,

    buttonOneOnPress: () => resumeJob(),
    buttonTwoOnPress: () => dispatch(hidePrompt())
  }));
};

const resumeJob = () => {
  dispatch(updateJobs({ jobId: item.jobId, action: 'resume', timesheetId: item.timesheetId }))
  dispatch(hidePrompt())
};



  //
  // const handlePress = () => {
  //   navigation.navigate("JobDetail")
  // }

  return (
   <TouchableOpacity onPress={() => handlePress()} >
    <Animatable.View   duration={1000}
   delay={ item * 500} >
     <View style={styles.jobCard}>
      <View
        style={[
          styles.cardColorIndicator,
          {backgroundColor: getStatusColor(item.status)},
        ]}></View>
      <View style={styles.jobCardContent}>
        <View style={styles.jobCardHeader}>
          <Text style={{color: COLOR.PRIMARY, fontSize: moderateScale(14),fontFamily: FONT.PRIMARY_BOLD,
}}>
           Job# {item.uniqueId}
          </Text>
          <View style={styles.jobStatus}>
            <Dot />
            <Text style={{color: COLOR.GREY_TWO, fontSize: moderateScale(13),fontFamily: FONT.PRIMARY_BOLD
}}>{jobState}</Text>
          </View>
        </View>

        {/* Other content */}
        
        {/* <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Urbanist-Bold'}}>{item.description ?? "Local Sample Description"}</Text> */}
        <Text style={{ color: COLOR.BLACK, fontSize: moderateScale(12), fontFamily: FONT.PRIMARY_REGULAR, marginTop: moderateScale(10)}}>{item.details ?? "Details are currently unavailable."}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
          <Text style={styles.title}>
            Parent Job : <Text style={{color: 'black'}}>{item.parentUniqueId}</Text>
          </Text>
          <Text style={styles.title}>
            Master Job : <Text style={{color: 'black'}}>{item.masterUniqueId}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>
            Risk Assessment : <Text style={{color: 'black'}}>{item.riskAssesmentNumber ?? "-"}</Text>
          </Text>
          <Text style={styles.title}>
            Method Statement : <Text style={{color: 'black'}}>{item.methodStatementNumber ?? "-"}</Text>
          </Text>
        </View>
        <Text style={styles.title}>
         Customer Purchase Order : <Text style={{color: 'black'}}>{item.salesOrder?.externalOrderNumber ?? "-"}</Text>
        </Text>

        <Text style={styles.title}>
          Customer Name : <Text style={{color: 'black'}}>{item.customerName}</Text>
        </Text>

        {/* Job Card Footer */}
        <View style={styles.jobCardFooter}>
          <Text style={[styles.title, {fontFamily: FONT.PRIMARY_SEMI_BOLD}]}>
            Priority :{' '}
            <Text style={{color: getPriorityColor(item.priority)}}>
              {item.priority}
            </Text>
          </Text>

          <View style={{flexDirection: 'row'}}>
            <ColoredPillButton color={buttonOneConfig.iconColor} icon={require('../../assets/icons/pin_white.png')} onPress={buttonOneConfig.onPress} />
            <ColoredPillButton  color={buttonTwoConfig.iconColor} icon={require('../../assets/icons/stop_white.png')} onPress={buttonTwoConfig.onPress}  />
            <ColoredPillButton   color={buttonThreeConfig.iconColor} icon={buttonThreeConfig.icon} onPress={buttonThreeConfig.onPress}  />
            {/* <ColoredPillButton  color={'#336C85'} icon={require('../../assets/icons/rightArrow.png')} disabled={false} onPress={() => navigation.navigate("SignatureScreen")} /> */}
          </View>
        </View>
      </View>
    </View>
   </Animatable.View>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  jobCountBar: {
    flex: 1,
    height: '40%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    shadowColor: 'black',
    // elevation: 50,
  },
  jobCountBarValues: {
    alignItems: 'center',
  },
  jobCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLOR.WHITE,
    shadowColor: 'black',
    // elevation: 5,
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(15)
  },
  jobCardContent: {
    flex: 1,
    padding: moderateScale(10),
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  title: {
    color: '#BAB8B8',
    marginVertical: 5,
    fontFamily: FONT.PRIMARY_BOLD,
    fontSize: moderateScale(12)
  },

  jobCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pillButton: {
    backgroundColor: '#00D1B8',
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 30,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardColorIndicator: {
    height: '100%',
    width: '2%',
  },
  TouchableOpacity: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
  jobCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLOR.WHITE,
    shadowColor: 'black',
    // elevation: 5,
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(15)
  },
  jobCardContent: {
    flex: 1,
    padding: moderateScale(10),
  },
});

export default JobCard;
