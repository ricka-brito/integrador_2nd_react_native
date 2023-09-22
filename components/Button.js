import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from "../constants/colors";


export default function Button(props) {
    const {onPress, isActive = true, style, text, colors = [COLORS.secondary, COLORS.primary] } = props;

    return (
        <TouchableOpacity style={{
                width: "100%", 
                height: 45,
                alignSelf: 'center',
                ...style
                }}
                onPress={onPress}
                disabled={!isActive}
                >
                <LinearGradient 
                start={{x: 0.0, y: 0.95}} 
                end={{x: 0.8, y: 1.0}} 
                colors={ isActive ? colors: ['#999', '#999']} 
                style={{
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 10,}}>
                    <Text style={{color: COLORS.white, fontFamily: "MontserratAlternates-regular", fontSize: 16 }}>{text}</Text>
                </LinearGradient>
        </TouchableOpacity>
    )
}