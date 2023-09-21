import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import COLORS from "../constants/colors.js";

export default function Checkbox(props) {

    const { text, onPress, value } = props
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 30}}>
                <Text style={{fontFamily: "MontserratAlternates-regular", fontSize: 14, color: COLORS.white}}>{text}</Text>
                <View style={{display: "flex", alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: value ? COLORS.primary : COLORS.white, width: 18, height: 18, borderRadius: "50%"}}>{value ? <View style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: COLORS.primary}}/>: null}</View>
            </View>
        </TouchableWithoutFeedback>
    )
}