// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { COLOR } from '../../utilities/colors'
// import textStyles from '../../utilities/textStyles'
// import { moderateScale, scale } from 'react-native-size-matters'

// const ContentHeader = ({ title, actionButtonOneIcon, actionButtonOneOnPress }) => {
//   return (
//     <View style={{ height: moderateScale(40), backgroundColor: COLOR.GREY_ONE, paddingHorizontal: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//       <Text style={textStyles.sectionHeader}>{title}</Text>
//       {!actionButtonOneIcon && (<View style={styles.actionButtonContainer}>
// <View style={styles.actionButton}></View>
// <View style={styles.actionButton}></View>

//       </View>)}

//     </View>
//   )
// }

// export default ContentHeader

// const styles = StyleSheet.create({
//   actionButtonsContainer: {
//     height: "100%",
//     width: '25%',
//     padding: moderateScale(8),
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     // backgroundColor: 'red',
//     overflow: 'hidden'
//   },actionButton: {
//     height: '100%',
//     width: "40%",
//     borderRadius: 5,
//     elevation: 2,
    
//     backgroundColor: COLOR.WHITE
//   }
// })

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLOR } from '../../utilities/colors'
import textStyles from '../../utilities/textStyles'
import { moderateScale } from 'react-native-size-matters'

const ContentHeader = ({ title, actionButtonOneIcon, actionButtonOneOnPress, actionButtonTwoIcon, actionButtonTwoOnPress }) => {
  return (
    <View style={styles.container}>
      <Text style={textStyles.sectionHeader}>{title}</Text>
      <View style={[
        styles.actionButtonsContainer, 
        (!actionButtonOneIcon || !actionButtonTwoIcon) && styles.singleButtonContainer
      ]}>
        {actionButtonOneIcon && (
          <TouchableOpacity style={styles.actionButton} onPress={actionButtonOneOnPress}>
            <Image source={actionButtonOneIcon} style={styles.actionButtonIcon} />
          </TouchableOpacity>
        )}
        {actionButtonTwoIcon && (
          <TouchableOpacity style={styles.actionButton} onPress={actionButtonTwoOnPress}>
            <Image source={actionButtonTwoIcon} style={styles.actionButtonIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ContentHeader

const styles = StyleSheet.create({
  container: {
    height: moderateScale(40),
    backgroundColor: COLOR.GREY_ONE,
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    paddingRight: 15

  },
  actionButtonsContainer: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '23%',
  },
  singleButtonContainer: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    height: '60%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 15,
    elevation:5,
    
    backgroundColor: COLOR.PRIMARY
  },
  actionButtonIcon: {
    height: moderateScale(14),
    width: moderateScale(24),
    resizeMode: 'contain'
   
  },
})
