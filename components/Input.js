import { View, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from "react-native-gesture-handler"
import { Ionicons  } from '@expo/vector-icons';
import COLORS from "../constants/colors";

export default function Input(props) {
    const {keyType, placeHolder, formater, value, onSend, disabled, maxLength} = props;
    const [margin, setMargin] = useState('10%');
    return (
        <KeyboardAvoidingView behavior='position' 
            contentContainerStyle={{
                marginTop: '-10%', 
                marginBottom: margin, 
                width: "100%", 
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
            >
            <View style={{borderRadius: "50%", display: 'flex', alignItems: 'center', flexDirection: 'row', height: 50, backgroundColor: '#333', width: '95%'}}>
                <TextInput
                    selectionColor={'#fff'}
                    keyboardAppearance="dark"
                    style={{fontSize: 16, color: COLORS.white, paddingLeft: 20, fontFamily: "MontserratAlternates-regular", width: "100%", flex: 1,}}
                    placeholderTextColor="#a7a7a7"
                    onFocus={() => setMargin('6%')}
                    onBlur={() => setMargin('19%')}
                    placeholder={placeHolder}
                    value={value}
                    onChangeText={formater}
                    inputMode={keyType}
                    maxLength={maxLength}
                />        
                <TouchableOpacity disabled={!disabled} onPress={onSend} style={{ marginRight: 4, display:'flex', alignItems: 'center', justifyContent:'center', backgroundColor: !disabled ? '#3f3f3f' : COLORS.primary, borderRadius: '50%', height: 43, width: 43}}>
                    <Ionicons  
                        name="send" 
                        size={17} 
                        color={!disabled ? '#acacac': '#333'} 
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}