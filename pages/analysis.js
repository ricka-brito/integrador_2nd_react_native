import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import Header from '../components/Header';

const Analysis = ({navigation}) => {
  return (
    <View style={{backgroundColor: "#000", flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <View style={{width: '100%', height: 50, position: 'absolute', top: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: "4%"}}>
        <AntDesign name="left" size={21} color="#fff" onPress={() => navigation.navigate('Welcome')} />
        <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23, letterSpacing: 0.4}}>
            Conta em Analise
        </Text>
        <TouchableOpacity>
            <AntDesign name="questioncircleo" size={21} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23, letterSpacing: 0.4, width: '70%', textAlign: 'center'}}>
        Sua conta ainda está em analise, volte em alguns minutos.
      </Text>
    </View>
  )
}

export default Analysis