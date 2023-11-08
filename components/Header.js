import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";

const Header = ({name, navigation}) => {
  return (
    <View style={{width: '100%', height: 50, position: 'absolute', top: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: "4%"}}>
        <AntDesign name="left" size={21} color="#fff" onPress={() => navigation.goBack()} />
        <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23, letterSpacing: 0.4}}>
            {name}
        </Text>
        <TouchableOpacity>
            <AntDesign name="questioncircleo" size={21} color="#fff" />
        </TouchableOpacity>
    </View>
  )
}

export default Header