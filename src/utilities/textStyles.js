import { StyleSheet } from 'react-native';
import { FONT } from './fonts';
import { COLOR } from './colors';

//
import { moderateScale, scale } from "react-native-size-matters";

const textStyles = StyleSheet.create({
minimalHeader: {
    color: COLOR.WHITE,
    fontFamily: FONT.PRIMARY_MEDIUM,
    fontSize: moderateScale(16, 0.5)
},
sectionHeader: {
    color: COLOR.BLACK,
    fontFamily: FONT.PRIMARY_BOLD,
    fontSize: moderateScale(16, 0.5)
},parameterName: {
    color: COLOR.GREY_TWO,
    fontFamily: FONT.PRIMARY_BOLD,
    fontSize: moderateScale(12, 0.5)
},
parameterValue: {
    color: COLOR.BLACK,
    fontFamily: FONT.PRIMARY_BOLD,
    fontSize: moderateScale(12, 0.5),
    opacity: 1,
},multilineContent: {
    color: COLOR.BLACK,
    fontSize: moderateScale(12, 0.5),
    fontFamily: FONT.PRIMARY_REGULAR
},pillShapeButtonText:{
    color: COLOR.WHITE,
    fontFamily: FONT.PRIMARY_SEMI_BOLD,
    fontSize: moderateScale(16, 0.2)
},promptMessage:{
    fontFamily: FONT.PRIMARY_SEMI_BOLD,
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: COLOR.BLACK
}
});

export default textStyles;
