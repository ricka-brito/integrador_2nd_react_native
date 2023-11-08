import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";


export default function Transaction({nome, valor, pago, data, tipo}) {

  function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
  }

  function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

  const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];


  const hoje = new Date()

  var icon = tipo == 'transferencia'
  ? require('../assets/transferencia.png')
  : tipo == 'pagar' ? require('../assets/pagar.png') :
  require('../assets/subir.png');

  const data_string = (sameDay(data, hoje) ? "Hoje" : datediff(data, hoje) == 1 ? "Ontem" : datediff(data, hoje) <= 6 ? semana[data.getDay()] : data.getDate() + "/" + (data.getMonth()+1)) + " - " + data.getHours() + ":" + data.getMinutes() 

  return (
    <TouchableOpacity style={{alignSelf: 'center', width: "85%", display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#686868", marginBottom: "5%"}}>
      <View style={{marginBottom: "7%"}}>
        <Image resizeMode="contain" style={{ width:45, height: 45}} source={icon}/>
      </View>
      <View style={{marginBottom: "7%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginLeft: "2%"}}>
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'MontserratAlternates-Medium', fontSize: 15, color: '#d1d1d1', maxWidth: 185}} ellipsizeMode='tail' numberOfLines={1}>
          {nome}
          </Text>
          <Text style={{fontFamily: 'MontserratAlternates-Medium', fontSize: 12, color: '#afafaf'}}>
            {data_string}
          </Text>
        </View>
        <View style={{display: 'flex', alignItems: 'flex-end'}}>
          <Text style={{fontFamily: 'MontserratAlternates-Medium', fontSize: 17, color: '#d1d1d1'}}>
           {Math.sign(valor) == 1 ? "+" : ''}{valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
          </Text>
          <Text style={{fontFamily: 'MontserratAlternates-Medium', fontSize: 12, color: '#afafaf'}}>
            {pago} 
          </Text>
        </View>
        <AntDesign style={{alignSelf: 'center'}} name="right" size={15} color="#ddd" />
      </View>
    </TouchableOpacity>
  )
}