import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import textStyles from '../../utilities/textStyles'
import { moderateScale } from 'react-native-size-matters'

const KeyValueText = ({keyText, valueText, KeyStyle, valueStyle}) => {
  return (
    <Text style={[textStyles.parameterName,styles.keytext,KeyStyle]}>{keyText}<Text style={[textStyles.parameterValue, valueStyle]}>{valueText}</Text></Text>

  )
}

export default KeyValueText

const styles = StyleSheet.create({
    keytext: {
        marginVertical: moderateScale(5),
    }
})