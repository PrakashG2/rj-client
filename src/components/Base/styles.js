// @flow Copyright © 2022 G2 Tech, All Rights Reserved
import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const curveWidth = width;
const curveHeight = width;

const radius = 5000;
export const styles = ScaledSheet.create({
    containerStyle:{
        flex:1,
    },
    base:{
        flex:1,
        position:'absolute',
        width,
        height
    },
    topSquareStyle:{
        backgroundColor:'#FDF6E9',
        height:0,
        width,
        // zIndex:1000
    },
    topCurveStyle:{
        backgroundColor:'#FDF6E9',
        height:curveHeight,
        width:curveWidth,
        borderRadius: width/2,
        transform: [{ scaleX: 1.3 }],
        top:-(curveHeight/2)
    },
    bottomCurveStyle:{
        position:'absolute',
        backgroundColor:'#FDF6E9',
        height:curveHeight,
        width,
        borderRadius: width/2,
        bottom:-(curveHeight-150),
        transform: [{ scaleX: 1.3 }],
    }
});
