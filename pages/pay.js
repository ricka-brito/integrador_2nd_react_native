import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import CameraPayment from '../components/CameraPayment'
import CameraOverlay from '../components/cameraOverlay'

export default function Pay({navigation}) {
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
        <CameraPayment/>
        <Header name={"Pagamento"} navigation={navigation}/>
    </View>
  )
}