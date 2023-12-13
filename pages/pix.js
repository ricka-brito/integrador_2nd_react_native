import { View, Text, Keyboard,  TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import QRCode from 'react-native-qrcode-svg';
import useTokenStore from "../tokenStore";
import { API_URL } from '../constants/utils';
import { FloatingLabelInput } from "react-native-floating-label-input";

const DismissKeyboard = ({ children, refa }) => (
  <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); refa.current.blur()}}>
    {children}
  </TouchableWithoutFeedback>
);


const Pix = ({navigation}) => {
  const { token, setToken } = useTokenStore(); // Access the token and setToken function from the store
  const [ accountId, setAccountId ] = useState()
  const [valor, setValor] = useState(0)
  const refa = useRef(null)
  useEffect(()=>{
    fetch(`${API_URL}/api/v1/user/me/`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`
      },
  }).then(response => { 
      if (response.status == 403){
          navigation.navigate('Analysis')
      }
      return response.json()}).then(data => {
      
        setAccountId(data.id)
  })
  },
  [])

  return (
  <DismissKeyboard refa={refa}>
    <View style={{backgroundColor: '#000', flex: 1, alignItems: 'center'}}>
      <Header navigation={navigation}/>
      <View style={{width: '80%', paddingTop: "30%"}}>
      <Text style={{fontFamily: 'MontserratAlternates-Light', 
                        fontSize: 20, 
                        color: "#fff", 
                        marginBottom: '20%', textAlign: 'center'}}>Digite o valor a ser transferido</Text>
      <FloatingLabelInput
            currencyDivider=""
            maskType="currency"
                keyboardType="numeric"
                label={"Valor (opcional)"}
                containerStyles={{
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    marginTop: "0%",
                    marginBottom: "20%",
                    color: "#DDD",
                    paddingBottom: 10,
                    paddingLeft: 0,
                }}
                customLabelStyles={{
                    colorBlurred: "#CCC",
                    colorFocused: "#CCC",
                    fontSizeFocused: 12,
                    fontSizeBlurred: 16,
                    leftBlurred: -1,
                }}
                labelStyles={{
                    width: "100%",
                    borderColor: "#fff",
                    borderWidth: 0,
                }}
                value={valor}
                onChangeText={(valor) => setValor(valor)}
                inputStyles={{
                    color: "#fff",
                    fontSize: 16,
                }}
                selectionColor={"#fff"}
                style={{flex: 0}}
                ref={refa}
            />
      <QRCode
            size={350}
            value={JSON.stringify({
              accountId: accountId,
              valor: valor
            })}
          />
          </View>
    </View>
    </DismissKeyboard>
  )
}

export default Pix