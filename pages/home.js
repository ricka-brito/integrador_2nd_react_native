import {ImageBackground, View, Text, Image } from 'react-native'
import React from 'react'


export default function Home() {
  return (
    <View style={{backgroundColor: "#000", flex: 1}}>
        <ImageBackground source={require("../assets/background_home.png")} style={{flex: 1}}resizeMode="cover">
            <View style={{ marginTop: "18%", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text style={{fontFamily: 'MontserratAlternates-Light', fontSize: 27, color: "#fff", marginLeft: "8%"}}>{new Date().getHours() > 18  && new Date().getHours() < 24 ? "boa noite" : new Date().getHours() > 4 && new Date().getHours() < 12 ? "bom dia" : "boa tarde" },</Text>
                    <Text style={{fontFamily: 'MontserratAlternates-Bold', fontSize: 29, color: "#fff", marginLeft: "8%"}}>Henrique</Text>
                </View>
                <View style={{display:'flex', flexDirection: 'row', alignItems: 'center', marginRight: "5%", width: "23%", justifyContent: "space-between"}}>
                    <Image resizeMode="contain" style={{ width: 30, height: 30}} source={{uri: "https://i.ibb.co/V2wqfky/notifications-FILL1-wght400-GRAD0-opsz48-1.png"}}/>
                    <Image resizeMode="contain" style={{ width: 50, height: 50}} source={{uri: "https://i.ibb.co/Tq1wVzS/person.png"}}/>
                </View>
            </View>
            
        
        </ImageBackground>
    </View>
  )
}