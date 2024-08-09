// import {StyleSheet, Text, View, Platform, Button} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import MinimalHeader from '../../components/minimalHeader';
// import { useRoute } from '@react-navigation/native';
// import { jobLocationApi } from './api';
// import { useDispatch, useSelector } from 'react-redux';
// import { getJobInformation } from '../JonInformation/jobInformationReducer';

// const JobLocationScreen = ({ navigation }) => {

//   const route = useRoute();
//   const {jobId, uniqueId}  = route.params;

  
//   const jobLocation = useSelector((state) => state.jobInformation.jobLocation)

//   // dispatch

//   const dispatch = useDispatch();

// // First useEffect: Fetch job information when component mounts
// useEffect(() => {
//   dispatch(getJobInformation({ jobId }));
// }, [dispatch, jobId]);

// // Second useEffect: Update map region when jobLocation changes
// useEffect(() => {
//   console.log("++++++++===========+++++++=========> ", jobLocation.length == [], jobLocation);

//   const fetchAndAnimateMap = async () => {
//     if (jobLocation != []) {



//     try {
//       const { streetAddress1, streetAddress2, streetAddress3, city, postalCode } = jobLocation;
//       const addressData = `${streetAddress3},${city},${postalCode}`;
//       const result = await jobLocationApi({ jobLocation: addressData });

//       if (mapRef.current && result) {
//         mapRef.current.animateToRegion({
//           latitude: parseFloat(result.lat),
//           longitude: parseFloat(result.long),
//           latitudeDelta: 0.0025,
//           longitudeDelta: 0.005,
//         });

//         setMarkerData({
//           latitude: parseFloat(result.lat),
//           longitude: parseFloat(result.long),
         
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching job location:', error);
//     }}else{
   

//       mapRef.current.animateToRegion({
//         latitude: 37.78825, // Set your marker's latitude (e.g., San Francisco)
//           longitude: -122.4324, // Set your marker's longitude
//           latitudeDelta: 0.0025, // More zoomed-in view for streets
//           longitudeDelta: 0.005,
//       });

//       setMarkerData({
//         latitude: 37.78825,
//         longitude: -122.4324,

       
//       });
//     }
//   };

//   fetchAndAnimateMap();
// }, [jobLocation]);

  
//   //
    

//   // const jobLocation = jobInformation.data.job.location;



//   // console.log("__________________________--------------_______________", jobInformation.data.job)



//   const [markerData, setMarkerData] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
    
//   });

  

//   const mapRef = useRef(null); // Reference to the MapView component
//   const markerRef = useRef(null);


//   // const markerData = {
//   //   latitude: 37.78825, // Set your marker's latitude (e.g., San Francisco)
//   //   longitude: -122.4324, // Set your marker's longitude
//   //   title: 'Marker Title................................',
//   //   description: 'Marker Description',
//   // };

//   const handleRecenterPress = () => {
//     if (mapRef.current) {
//       const {latitude, longitude} = markerData;
//       mapRef.current.animateToRegion({
//         latitude,
//         longitude,
//         latitudeDelta: 0.0025, // Maintain similar zoom level
//         longitudeDelta: 0.005,
//       });
//     }
//   };

//   // handleBackButtonPress

//   const handleBackButton = () => {
//     navigation.goBack();
//   }

//   return (
//     <View style={styles.container}>
      
//         <MinimalHeader title={`Job# ${uniqueId}`} buttonOnPress={handleBackButton} buttonText={"Back"}/>

//       <MapView
//         ref={mapRef} // Assign the reference to the MapView
//         initialRegion={{
//           latitude: 37.78825, // Set your marker's latitude (e.g., San Francisco)
//           longitude: -122.4324, // Set your marker's longitude
//           latitudeDelta: 0.0025, // More zoomed-in view for streets
//           longitudeDelta: 0.005,
//         }}
//         showsCompass
//         zoomControlEnabled // Enable zoom controls for user interaction
//         style={styles.map}>
//         <Marker

//           key={markerData.latitude + markerData.longitude} // Unique key
//           coordinate={markerData}          title={markerData.title}
//           description={markerData.description}
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
  
//   map: {
//     flex: 18,
//   },
// });

// export default JobLocationScreen;


import {StyleSheet, Text, View, Platform, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MinimalHeader from '../../components/minimalHeader';
import { useRoute } from '@react-navigation/native';
import { jobLocationApi } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { getJobInformation } from '../JonInformation/jobInformationReducer';

const JobLocationScreen = ({ navigation }) => {

  const route = useRoute();
  const {jobId, uniqueId}  = route.params;

  
  const jobLocation = useSelector((state) => state.jobInformation.jobLocation)

  // dispatch

  const dispatch = useDispatch();

// First useEffect: Fetch job information when component mounts
useEffect(() => {
  dispatch(getJobInformation({ jobId }));
}, [dispatch, jobId]);

// Second useEffect: Update map region when jobLocation changes
useEffect(() => {
  const fetchAndAnimateMap = async () => {
    if (jobLocation.length === 0) {
      console.log("============= => M O T T A")

      mapRef.current.animateToRegion({
                latitude: 37.78825, // Set your marker's latitude (e.g., San Francisco)
                  longitude: -122.4324, // Set your marker's longitude
                  latitudeDelta: 0.0025, // More zoomed-in view for streets
                  longitudeDelta: 0.005,
              });
        
              setMarkerData({
                latitude: 37.78825,
                longitude: -122.4324,
        
               
              });
    }
    
    try {
      const { streetAddress1, streetAddress2, streetAddress3, city, postalCode } = jobLocation;
      const addressData = `${streetAddress3},${city},${postalCode}`;
      const result = await jobLocationApi({ jobLocation: addressData });

      if (mapRef.current && result) {
        mapRef.current.animateToRegion({
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.long),
          latitudeDelta: 0.0025,
          longitudeDelta: 0.005,
        });

        setMarkerData({
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.long),
         
        });
      }
    } catch (error) {
      console.error('Error fetching job location:', error);
    }
  };

  fetchAndAnimateMap();
}, [jobLocation, mapRef]);

  
  //
    

  // const jobLocation = jobInformation.data.job.location;



  // console.log("__________________________--------------_______________", jobInformation.data.job)



  const [markerData, setMarkerData] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'Marker Title',
    description: 'Marker Description',
  });

  

  const mapRef = useRef(null); // Reference to the MapView component
  const markerRef = useRef(null);


  // const markerData = {
  //   latitude: 37.78825, // Set your marker's latitude (e.g., San Francisco)
  //   longitude: -122.4324, // Set your marker's longitude
  //   title: 'Marker Title................................',
  //   description: 'Marker Description',
  // };

  const handleRecenterPress = () => {
    if (mapRef.current) {
      const {latitude, longitude} = markerData;
      mapRef.current.animateToRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.0025, // Maintain similar zoom level
        longitudeDelta: 0.005,
      });
      
    }
  };

  // handleBackButtonPress

  const handleBackButton = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      
        <MinimalHeader title={`Job# ${uniqueId}`} buttonOnPress={handleBackButton} buttonText={"Back"}/>

      <MapView
        ref={mapRef} // Assign the reference to the MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.005,
        }}
        
        showsCompass
        zoomControlEnabled // Enable zoom controls for user interaction
        style={styles.map}>
        <Marker

          key={markerData.latitude + markerData.longitude} // Unique key
          coordinate={markerData}          title={markerData.title}
          description={markerData.description}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  map: {
    flex: 18,
  },
});

export default JobLocationScreen;
