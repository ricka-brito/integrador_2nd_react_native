import { AntDesign } from "@expo/vector-icons";
import { Text, View, Alert } from 'react-native';

import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from 'react';

import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from "react-native-modal";
import Button from "../components/Button";
import { API_URL } from "../constants/utils";
import OverlayPayment from './PaymentOverlay';
import { FloatingLabelInput } from "react-native-floating-label-input";
import useTokenStore from "../tokenStore";
// function calcula_linha(barra)
// {
//     //var barra = form.barra.value; // Codigo da Barra
//     linha = barra.replace(/[^0-9]/g,'');
//     //
//     if (modulo10('399903512') != 8) alert('Função "modulo10" está com erro!');
//     if (linha.length != 44) alert ('A linha do código de barras está incompleta!');
//     //
//     var campo1 = linha.substr(0,4)+linha.substr(19,1)+'.'+linha.substr(20,4);
//     var campo2 = linha.substr(24,5)+'.'+linha.substr(24+5,5);
//     var campo3 = linha.substr(34,5)+'.'+linha.substr(34+5,5);
//     var campo4 = linha.substr(4,1);     // Digito verificador
//     var campo5 = linha.substr(5,14);    // Vencimento + Valor
//     //
//     if (  modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  ) != campo4 )
//         alert('Digito verificador '+campo4+', o correto é '+modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  )+'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
//     //
//     if (campo5 == 0) campo5 = '000';
//     //
//     linha =  campo1 + modulo10(campo1)
//             +' '
//             +campo2 + modulo10(campo2)
//             +' '
//             +campo3 + modulo10(campo3)
//             +' '
//             +campo4
//             +' '
//             +campo5
//             ;
//     //if (form.linha.value != form.linha2.value) alert('Linhas diferentes');
//     return(linha);
// }

// function modulo10(numero)
// {

//     numero = numero.replace(/[^0-9]/g,'');
//     var soma  = 0;
//     var peso  = 2;
//     var contador = numero.length-1;
//     //alert(contador);
//     //numero = '00183222173';
//     //for (var i=0; i <= contador - 1; i++) {
//     //alert(10);
//     //for (contador=10; contador >= 10 - 1; contador--) {
//     while (contador >= 0) {
//         //alert(contador);
//         //alert(numero.substr(contador,1));
//         multiplicacao = ( numero.substr(contador,1) * peso );
//         if (multiplicacao >= 10) {multiplicacao = 1 + (multiplicacao-10);}
//         soma = soma + multiplicacao;
//         //alert(numero.substr(contador,1)+' * '+peso+' = '+multiplicacao + ' =>' + soma) ;
//         //alert(soma);
//         if (peso == 2) {
//             peso = 1;
//         } else {
//             peso = 2;
//         }
//         contador = contador - 1;
//     }
//     var digito = 10 - (soma % 10);
//     //alert(numero + '\n10 - (' + soma + ' % 10) = ' + digito);
//     if (digito == 10) digito = 0;
//     return digito;
// }


// function modulo11_banco(numero)
// {

//     numero = numero.replace(/[^0-9]/g,'');
//     //debug('Barra: '+numero);
//     var soma  = 0;
//     var peso  = 2;
//     var base  = 9;
//     var resto = 0;
//     var contador = numero.length - 1;
//     //debug('tamanho:'+contador);
//     // var numero = "12345678909";
//     for (var i=contador; i >= 0; i--) {
//         //alert( peso );
//         soma = soma + ( numero.substring(i,i+1) * peso);
//         //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
//         if (peso < base) {
//             peso++;
//         } else {
//             peso = 2;
//         }
//     }
//     var digito = 11 - (soma % 11);
//     //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
//     if (digito >  9) digito = 0;

//     if (digito == 0) digito = 1;
//      return digito;
//     }


//     function fator_vencimento (dias) {
//         //Fator contado a partir da data base 07/10/1997
//         //*** Ex: 31/12/2011 fator igual a = 5198
//         //alert(dias);
//         var currentDate, t, d, mes;
//         t = new Date();
//         currentDate = new Date();
//         currentDate.setFullYear(1997,9,7);//alert(currentDate.toLocaleString());
//         t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));//alert(t.toLocaleString());
//         mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
//         dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
//         //campo.value = dia +"."+mes+"."+currentDate.getFullYear();campo.select();campo.focus();
//         return(t.toLocaleString());
//     }


    
export default function CameraPayment() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null)
    const [visibleModal, setVisibleModal] = useState(false)
    const [descricao, setDescricao] = useState()
    const [valor, setValor] = useState()
    const [id, setId] = useState()
    const { token, setToken } = useTokenStore(); // Access the token and setToken function from the store

    useEffect(() => {
        requestPermission();
        
    }, [])
    
    if(!permission?.granted){
        return;
    }

    return (
        <View style={{flex: 1}}>
             <Modal
        isVisible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        transparent={true}
        hasBackdrop={false}
        animationType="slide"
        onBackdropPress={() => setVisibleModal(false)}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalHide={() => {
            setId()
            setValor()
            setDescricao()
        }}
        onModalShow={() => {
            console.log(valor)
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(32,32,32, 1)",
            flex: 0.95,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            display: 'flex',
            flexDirection: 'column'
          }}
        > 
            <AntDesign name="close" size={21} color="#fff" onPress={() => setVisibleModal(false)} />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'MontserratAlternates-Light', 
                        fontSize: 20, 
                        color: "#fff", 
                        marginTop: '5%', textAlign: 'center'}}>Digite o valor a ser transferido e a descricão (opcional)</Text>
            <FloatingLabelInput
            currencyDivider=""
            maskType="currency"
                keyboardType="numeric"
                label={"Valor"}
                containerStyles={{
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    marginTop: "15%",
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
                onChangeText={(a) => setValor(a)}
                inputStyles={{
                    color: "#fff",
                    fontSize: 16,
                }}
                selectionColor={"#fff"}
            />
            <FloatingLabelInput
              label={"Descrição (opcional)"}
              containerStyles={{
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
                marginTop: "15%",
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
              value={descricao}
              onChangeText={(descricao) => setDescricao(descricao)}
              inputStyles={{
                color: "#fff",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
            />
            <Button text="Enviar" style={{marginTop: "10%"}} onPress={() => {
                fetch(`${API_URL}/api/v1/accounts/transfer/`,{
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                      },
                      body: JSON.stringify({
                        "receiver": id,
                        "value": Number(valor.replaceAll('.', '').replaceAll(',', '.')),
                        "description": descricao
                      })
                }).then(response => response.json()).then(data => {console.log(data); Alert.alert("Transferido"); setVisibleModal(false)}).catch(e => Alert.alert("Não foi possivel concluir a transação, saldo insuficiente ou conta inexistente"))
                console.log(valor)
                }}/>
            </View>
        </View>

      </Modal>
        <Camera 
            ref={cameraRef}
            style={{flex: 1, position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, bottom: 0}}
            type={CameraType.back}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={(data) => {
                try {
                    let jsonData = JSON.parse(data.data)
                    if(jsonData.hasOwnProperty("accountId")){
                        if(jsonData.hasOwnProperty("valor")){
                            setValor(jsonData.valor)
                        }
                        setVisibleModal(true)
                        setId(jsonData.accountId)
                        console.log(jsonData)
                    }
                } catch (error) {
                    console.log(error)
                }
                
            }}
        />
        <OverlayPayment/>
        </View>
    )
}