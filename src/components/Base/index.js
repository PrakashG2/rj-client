// @flow Copyright © 2022 G2 Tech, All Rights Reserved
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styles';

export const BaseView = ({ style, children, topShapeHeight }) => {

    return (
        <SafeAreaView  style = {[styles.containerStyle, { backgroundColor: 'red' }, style ]}>
            <View style = {styles.base}>
                <View>
                    <View style = {[styles.topSquareStyle, { height:topShapeHeight }]}/>

                    <View style = {styles.topCurveStyle}/>

                </View>

                <View style = {styles.bottomCurveStyle}/>
            </View>

            {children}
        </SafeAreaView>
    );
};

