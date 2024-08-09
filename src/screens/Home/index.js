// import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
// import {React, useEffect, useState} from 'react';
// import {styles} from './styles';

// // components
// import AppBar from '../../components/AppBar';
// import JobCard from '../../components/JobCard';

// //dummy data
// import DummyDataList, { dummyDataList } from '../../DummyDataList';

// import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
// import { getJobs, getJobsData } from './homeReducer';
// import { useDispatch, useSelector } from 'react-redux';
// import { Image } from 'react-native-animatable';
// import { user } from '../../common/user';
// import { logout } from '../Login/loginReducer';
// import { LOGIN_SCREEN } from '../Login';



// const HomeScreen = ({ navigation }) => {

//   //
//   const dispatch = useDispatch();

//   //
//   const jobs = useSelector((state) => state.home.jobs)
//   const renderedPages = useSelector((state) => state.home.renderedPages)


// //
//   const [page, setPage] = useState(1);
//   const [drawer, setDrawer] = useState(false);



  
//   // useEffect(() => {
  
//   //  getJob();
     
//   //   }, [])
//   const [isEndReachedCalled, setIsEndReachedCalled] = useState();
//   const [focusePage, setFocusePage] = useState(1);


//   useEffect(() => {
//     // Dispatch an action to trigger the saga
//     dispatch(getJobs({page:1}));
//     setIsEndReachedCalled(false);

//   }, [dispatch]);
//       // console.log("hello --------------------------------------------------->", jobs)




//       ///
//       useEffect(() => {
//               console.log("hello --------------------------------------------------->", )
//               setIsEndReachedCalled(false)

//       }, [jobs]);




// const getJob = async () => {
//   dispatch(getJobsData());
//   // console.log("hello --------------------------------------------------->")
// }

// //
// const handleLogout =() => {
//   dispatch(logout({page:1}));

// }

// const filterParameters = [
//   {id: '01', filterParameter: 'All Jobs'},
//   {id: '02', filterParameter: 'Active'},
//   {id: '03', filterParameter: 'Finished'},
//   {id: '04', filterParameter: 'Draft'},

// ];

//   // Component to Render Job Count Bar Item
//   const JobCountBarItem = ({value, label}) => (
//     <TouchableOpacity style={styles.jobCountBarValues} onPress={() => handleFilters(label)}>
//       <View style={{flex:2, resizeMode: 'contain', overflow: 'hidden', justifyContent: 'center'}}>
//         <Image source={require('../../../assets/icons/wrench_grey.png' )} resizeMode='contain' style={{height:20, width: 20, alignSelf: 'center', }}/>
//       </View>
//       <View style={{ flex:3}}>
//       <Text style={{color: 'black', fontWeight: '900', fontSize: 18}}>
//         {value}
//       </Text>
//       <Text style={{color: 'grey', fontSize: 11, fontWeight: '600'}}>{label}</Text>

//       </View>
//     </TouchableOpacity>
//   );

//   // handleFilters
//   const handleFilters = (label) => {

//     if (label == "All Jobs") {
//       console.log(label)


//     }else if (label == "Active") {
//       console.log(label)
//       dispatch(getJobs({ page: 0 }));


//     }else if (label == "Finished"){
//       console.log(label)
//       dispatch(getJobs({page:1, completed: 1}));


//     }else if (label == "Draft") {
//       console.log(label)
//       dispatch(getJobs({ page: 0 }));


//     }
//   }

//   // Handle LIst End
//   const handleListEnd = () => {
//     const nextPage = page + 1;

//     setPage(nextPage);
//     dispatch(getJobs({ page: nextPage }));
//   };

  

// //   const handleListEnd = () => {
// //     setPage(page + 1)
// //     dispatch(getJobs({page: page}));

// //     // setIsEndReachedCalled(true)
// //     // if (!isEndReachedCalled) {
// //     //   console.log("--------------------------------------------------------",)

// //     // }
// // // const newPage = focusePage + 1;
// // // setFocusePage(newPage)

// // // setIsEndReachedCalled(true);

// // // console.log("--------------------------------------------------------", focusePage)


// //     // if (renderedPages < currentPage) {
// //     //   console.log("--------------------------------------------------------", renderedPages, currentPage)

// //     // }
// //     // setCurrentPage(2)
// //     // Dispatch action to load more jobs
// //     // dispatch(getJobs());
// //   };

//   return (
//     <View style={styles.root}>
//       {/* App Bar */}

//       <View style={{flex: 5}}>
//         <View style={{flex: 0.8}}>
//           <Svg
//             height="100%"
//             width="100%"
//             viewBox="0 0 100 100"
//             preserveAspectRatio="none">
//             <Defs>
//               <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <Stop offset="0%" stopColor="#336C85" />
//                 <Stop offset="100%" stopColor="#EE7DB2" />
//               </LinearGradient>
//             </Defs>
//             <Path d="M0,0 L100,0 L100,70 Q50,100 0,70 Z" fill="url(#grad)" />
//             <AppBar title={'Jobs'} />
//           </Svg>

//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               height: 50,
//               width: 50,
//               top: 5,
//               left: 5,
//             }}
//             onPress={() => setDrawer(!drawer)}></TouchableOpacity>

//           {/* Job Counter */}

//           <View
//             style={{
//               height: 180,
//               paddingHorizontal: 15,
//               position: 'absolute',
//               top: 50,
//               alignSelf: 'center',
//             }}>
//             <View
//               style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//               <Text
//                 style={{
//                   fontFamily: 'Urbanist-Bold',
//                   color: 'white',
//                   fontSize: 18,
//                 }}>
//                 Good Afternoon Dhana
//               </Text>
//             </View>
//             <View style={[styles.jobCountBar, {elevation: 5}]}>
//               {/* <FlatList data={filterParameters} renderItem={() => <JobCountBarItem value="431" label="All Jobs" />}
//               key></FlatList> */}
//               <JobCountBarItem value="431" label="All Jobs" />
//               {/* <TouchableOpacity style={{width: 50}} onPress={() => console.log("Active pressed")}> */}
//               <JobCountBarItem value="81" label="Active" />

//               {/* </TouchableOpacity> */}
//               <JobCountBarItem value="52" label="Finished" />
//               <JobCountBarItem value="52" label="Draft" />
//             </View>
//             <View
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Urbanist-Bold',
//                   color: 'black',
//                   fontSize: 15,
//                 }}>
//                 Thursday 25.4.2024
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Job List */}
//       <View style={{flex: 12}}>
//         <FlatList
//           style={{flex: 1, paddingHorizontal: 10, marginVertical: 10}}
//           data={jobs}
//           renderItem={({item}) => (
//             <JobCard item={item} navigation={navigation} />
//           )}
//           keyExtractor={(item, index) => item.id || index.toString()}

//           //
//           onEndReachedThreshold={1}
//           onEndReached={handleListEnd}
//         />
//       </View>
//       {drawer && (
//         <View
//           style={{
//             flex: 1,
//             height: '100%',
//             width: '70%',
//             position: 'absolute',
//             backgroundColor: 'white',
//             top: 0,
//             left: 0,
//           }}>
//             <View style={{flex:1, flexDirection: 'row', borderBottomColor: '#88a5f2', borderBottomWidth: 2, borderStyle: 'solid'}}>
//             <View style={{flex:1, flexDirection: 'row'}}>
//             <TouchableOpacity style={{flex:1,   justifyContent: 'center',alignItems: 'flex-end',paddingTop: 3}} onPress={() =>navigation.navigate("home")}>
//             <Image source={require('../../../assets/icons/close.png')}  style={{ height: '40%', width: '40%',marginRight:5}} resizeMode='contain'></Image>

//             </TouchableOpacity>
//             <View style={{flex:5, justifyContent: 'center'}}>
//             <Text style={{ marginLeft: 5,width: '100%',fontFamily: 'Urbanist-ExtraBold',fontSize: 26, color: '#336C85', marginRight: 80 }}>Remote Job</Text>

//             </View>


//               </View>
//             </View>
//             <View style={{flex:0.6,  flexDirection: 'row',flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 2, borderStyle: 'solid'}}>
//             <View style={{flex:1,   justifyContent: 'center',alignItems: 'flex-end',}}>
//             <Image source={require('../../../assets/icons/tools.png')}  style={{ height: '40%', width: '40%',marginRight:5}} resizeMode='contain'></Image>

//             </View>
//             <View style={{flex:5, justifyContent: 'center'}}>
//             <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: 18, color: 'black', marginRight: 80 }}>Jobs</Text>

//             </View>
//             </View>
//             <TouchableOpacity style={{flex:0.6,flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 2, borderStyle: 'solid'}} onPress={() =>   dispatch(logout())}>
//             <View style={{flex:1,  justifyContent: 'center',alignItems: 'flex-end',}}>
//             <Image source={require('../../../assets/icons/logout.png')}  style={{ height: '40%', width: '40%',marginRight:5}} resizeMode='contain'></Image>

//             </View>
//             <View style={{flex:5, backgroundColor: 'white', justifyContent: 'center'}}>
//             <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: 17, color: 'black', marginRight: 80 }}>Logout</Text>

//             </View>
//             </TouchableOpacity>
//             <View style={{flex:8, backgroundColor: 'white'}}>
//             </View>
//             <View style={{flex:1, backgroundColor: '#eeeeee', paddingLeft: 15, justifyContent: 'center'}}>
//             <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: 14, color: 'black', marginRight: 80 }}>App Version</Text>
//             <Text style={{ marginLeft: 5,fontFamily: 'Urbanist-Bold',fontSize: 12, color: '#c5c5c5', marginRight: 80 }}>Version: 00.00.00</Text>

//             </View>


//           </View>
//       )}
//     </View>
//   );
// };

// export default HomeScreen;


import {StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {React, useEffect, useRef, useState} from 'react';
import {styles} from './styles';

// components
import AppBar from '../../components/AppBar';
import JobCard from '../../components/JobCard';

//dummy data
import DummyDataList, { dummyDataList } from '../../DummyDataList';

import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getJobs, getJobsData } from './homeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native-animatable';
import { user } from '../../common/user';
import { logout } from '../Login/loginReducer';
import { LOGIN_SCREEN } from '../Login';
import { moderateScale } from 'react-native-size-matters';
import { COLOR } from '../../utilities/colors';
import { getCurrentDate, getCurrentTime, getDayOfWeek, getGreeting } from '../../common/dateTime';
import { FONT } from '../../utilities/fonts';



const HomeScreen = ({ navigation }) => {

  //
  const dispatch = useDispatch();

  //
  const jobs = useSelector((state) => state.home.jobs)
  const activejobs = useSelector((state) => state.home.activeJobs)

  const renderedPages = useSelector((state) => state.home.renderedPages)

  const {attachments, counts}  = useSelector((state) => state.home)



//
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState("User");



  
  // useEffect(() => {
  
  //  getJob();
     
  //   }, [])
  const [isEndReachedCalled, setIsEndReachedCalled] = useState();
  const [active, setActive] = useState(false);


  useEffect(() => {
    // Dispatch an action to trigger the saga
    dispatch(getJobs({page:1}));
    setIsEndReachedCalled(false);
          // console.log("hello --------------------------------------------------->", name)


  }, [dispatch]);
      // console.log("hello --------------------------------------------------->", jobs)

      useEffect(async () => {
        
        const name = await user.getLoggedInUserName();
          setUserName(name);
              console.log("hello --------------------------------------------------->", name)
    
    
      }, []);




      ///
      useEffect(() => {
        
              // console.log("hello ---------------------------------------------------> ->", userData )
              setIsEndReachedCalled(false)

      }, [jobs]);




const getJob = async () => {
  dispatch(getJobsData());
}

//
const handleLogout =() => {
  dispatch(logout({page:1}));

}

  console.log("hello -------------------------------------------------- || ->", jobs)


const filterParameters = [
  {id: '01', filterParameter: 'All Jobs'},
  {id: '02', filterParameter: 'Active'},
  {id: '03', filterParameter: 'Completed'},
  // {id: '04', filterParameter: 'Draft'},
  // {id: '05', filterParameter: 'Draft'},


];

  // Component to Render Job Count Bar Item
  const JobCountBarItem = ({value, label}) => (
    <TouchableOpacity style={styles.jobCountBarValues} onPress={() => handleFilters(label)}>
      <View style={{flex:2, resizeMode: 'contain', overflow: 'hidden', justifyContent: 'center'}}>
        <Image source={require('../../../assets/icons/wrench_grey.png' )} resizeMode='contain' style={{height:20, width: 20, alignSelf: 'center', }}/>
      </View>
      <View style={{ flex:3}}>
      <Text style={{color: 'black', fontWeight: '900', fontSize: moderateScale(18)}}>
        {value}
      </Text>
      <Text style={{color: 'grey', fontSize: moderateScale(11), fontWeight: '600'}}>{label}</Text>

      </View>
    </TouchableOpacity>
  );

  // handleFilters
  const handleFilters = (label) => {

    if (label == "All Jobs") {
      console.log(label)


    }else if (label == "Active") {
      console.log(label)
      dispatch(getJobs({ page: 0 }));
      


    }else if (label == "Finished"){
      console.log(label)
      dispatch(getJobs({page:1, completedFilter: 1}));


    }
    // else if (label == "Draft") {
    //   console.log(label)
    //   dispatch(getJobs({ page: 0 }));


    // }
  }

  // Handle LIst End
  const handleListEnd = () => {
    const nextPage = page + 1;

    setPage(nextPage);
    dispatch(getJobs({ page: nextPage }));
  };

  

//   const handleListEnd = () => {
//     setPage(page + 1)
//     dispatch(getJobs({page: page}));


//------------------------------------------------------

const [currentFilterIndex, setCurrentFilterIndex] = useState(0);

const handleFilterButtonOption = (index) => {
  setCurrentFilterIndex(index)
  console.log(index)
  if (index == 0) {
    setActive(false)

    dispatch(getJobs({page:1}));


  }else if (index == 1) {
    setActive(true)
    dispatch(getJobs({page:1}));


  }else if (index == 2){
    setActive(false)

    dispatch(getJobs({page:1, completedFilter: 1}));


  }else if (index == 3) {
    setActive(false)

    dispatch(getJobs({page:1, draftFilter: 1}));



  }

}

const flatListRef = useRef(null);
const scrollPosition = useRef(0);


//filter options

const renderFilterOptions = ({ item, index }) => {
  return (
    <TouchableOpacity style={{
      width: moderateScale(75, 1.0),
      margin: moderateScale(3),
      alignItems: 'center',
      // backgroundColor: 'red',
      borderRadius: 10,
      flexDirection: 'row',
      overflow: 'hidden',
      borderColor: index == currentFilterIndex ? COLOR.LIGHT_GREEN : COLOR.GREY_TWO,
      borderWidth: 1.5
    }} onPress={() => handleFilterButtonOption(index)}>
<View style={{flex:3, alignItems: 'center', justifyContent: 'center'}} >
      <Image source={index == currentFilterIndex ? require('../../../assets/icons/wrench.png' ) : require('../../../assets/icons/wrench_grey.png' )} resizeMode='contain' style={{height:moderateScale(15), width: moderateScale(15)}}/>
</View>
<View style={{flex:5, justifyContent: 'space-evenly'}} >
<Text style={{fontSize: moderateScale(18), color: COLOR.BLACK, fontFamily: FONT.PRIMARY_BOLD,}}>{counts[index]}</Text>

  <Text style={{fontSize: moderateScale(10), color: COLOR.GREY_TWO}}>{item.filterParameter}</Text>

</View>


</TouchableOpacity>
  );
};
//     // setIsEndReachedCalled(true)
//     // if (!isEndReachedCalled) {
//     //   console.log("--------------------------------------------------------",)

//     // }
// // const newPage = focusePage + 1;
// // setFocusePage(newPage)

// // setIsEndReachedCalled(true);

// // console.log("--------------------------------------------------------", focusePage)


//     // if (renderedPages < currentPage) {
//     //   console.log("--------------------------------------------------------", renderedPages, currentPage)

//     // }
//     // setCurrentPage(2)
//     // Dispatch action to load more jobs
//     // dispatch(getJobs());
//   };


  return (
    <View style={styles.container}>

      <View style={{height: moderateScale(200, 0.3),}}>
      <View style={{}}>
  <Svg
    height="100%"
    width="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none">
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#336C85" />
        <Stop offset="100%" stopColor="#EE7DB2" />
      </LinearGradient>
    </Defs>
    <Path d="M0,0 L100,0 L100,60 Q50,90 0,60 Z" fill="url(#grad)" />
  </Svg>
  <View style={{position: 'absolute', top: 0, left: 0,  height: moderateScale(60, 0.3), width: '100%'}}>
    <AppBar title={"Jobs"}></AppBar>
  </View>
  <View style={{width: '100%',position: 'absolute', top: moderateScale(60, 0.3), left: 0, justifyContent: 'center', alignItems: 'center'}}>
  <Text style={{ fontSize: moderateScale(16), fontFamily: FONT.PRIMARY_MEDIUM, color: COLOR.WHITE }}>
  {getGreeting()} {userName.charAt(0).toUpperCase() + userName.slice(1)}
</Text>
  </View>


  <View style={{width: '100%',position: 'absolute', top: moderateScale(90, 0.3), left: 0, justifyContent: 'center', alignItems: 'center',}}>
    <View style={{backgroundColor: COLOR.WHITE, width: "90%", height: moderateScale(65, 0.3), borderRadius:10, elevation: 10, padding: moderateScale(10)}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
  {filterParameters.map((item, index) => (
    <TouchableOpacity
      key={item.id}
      style={{
        width: moderateScale(90, 1.0),
        marginHorizontal: moderateScale(3),
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        borderColor: index === currentFilterIndex ? COLOR.LIGHT_GREEN : COLOR.GREY_TWO,
        borderWidth: 1.5
      }}
      onPress={() => handleFilterButtonOption(index)}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={index === currentFilterIndex ? require('../../../assets/icons/wrench.png') : require('../../../assets/icons/wrench_grey.png')}
          resizeMode='contain'
          style={{ height: moderateScale(15), width: moderateScale(15) }}
        />
      </View>
      <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
        <Text style={{ fontSize: moderateScale(18), color: COLOR.BLACK, fontFamily: FONT.PRIMARY_BOLD }}>
          {counts[index]}
        </Text>
        <Text style={{ fontSize: moderateScale(11), color: COLOR.GREY_TWO, fontFamily: FONT.PRIMARY_BOLD }}>{item.filterParameter}</Text>
      </View>
    </TouchableOpacity>
  ))}
</View>
    </View>

   
    
  </View>
  <View style={{width: '100%',position: 'absolute', bottom:10, left: 0, justifyContent: 'center', alignItems: 'center', }}>
    <Text style={{fontSize: moderateScale(14), color:COLOR.BLACK, fontFamily: FONT.PRIMARY_BOLD}}>{getDayOfWeek()} {getCurrentDate()}</Text>
  </View>
</View>




      </View>
      <View style={{ flex:1}}>
      {jobs.length === 0 && (<View style={{flex:1, alignItems: 'center', justifyContent: 'flex-end'}}><Text>Empty</Text></View>)}

      <FlatList
                ref={flatListRef}

          style={{flex: 1}}
          data={active ? jobs.filter(job => !job.completed && !job.draft) : jobs}
          renderItem={({item}) => (
            <JobCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
          onScroll={(event) => {
            // Store the current scroll position
            scrollPosition.current = event.nativeEvent.contentOffset.y;
          }}

          //
          onEndReachedThreshold={1}
          // onEndReached={handleListEnd}
        />
      </View>

    </View>
  );
};

export default HomeScreen;

