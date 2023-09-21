import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble  } from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Modal from "react-native-modal";
import COLORS from "../constants/colors";
//import Checkbox from 'expo-checkbox';
import Checkbox from "../components/Checkbox.js"
import Button from "../components/Button";
import Input from "../components/Input";



function verificaCPF(strCPF){
  strCPF = strCPF.replaceAll(".", "").replaceAll("-", "")
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  if (new Set(strCPF).size == 1) return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}


const Singup = (props) => {


  const {fontsLoaded} = props;
  const [messages, setMessages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pfIsChecked, setPfChecked] = useState(false);
  const [pjIsChecked, setPjChecked] = useState(false);

  // input_cpf
  const [showCpfInput, setShowCpfInput] = useState(false);
  const [cpfInput, setCpfInput] = useState("");
  const [sendCpf, setSendCpf] = useState(false);
 
  // input_nome
  const [showNomeInput, setShowNomeInput] = useState(false);
  const [nomeInput, setNomeInput] = useState("");
  const [sendNome, setSendNome] = useState(false);

  const messageDelay = 2000; // 2 segundos de atraso entre mensagens

  const addMessagesWithDelay = async (initialMessages) => {
    for (let i = 0; i < initialMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, messageDelay));
      setMessages(previousMessages => GiftedChat.append(previousMessages, [initialMessages[i]]));
    }
  };

  function formataCPF(cpf){
    setSendCpf(false)
    cpf2 = cpf.replaceAll(".", "").replaceAll("-", "")
      
    if(cpf2.length == 4) {
        return cpf2.slice(0, 3) + "."  +cpf2.slice(3, 4)
    }
    else if(cpf2.length == 7) {
        return cpf2.slice(0, 3) + "."  + cpf2.slice(3, 6) + "." + cpf2.slice(6, 7)
    }
    else if(cpf2.length == 10){
        return cpf2.slice(0, 3) + "."  + cpf2.slice(3, 6) + "." + cpf2.slice(6, 9) + "-" + cpf2.slice(9, 11)
    }
    else if(cpf2.length == 3){
        return cpf2
    }
    else if(cpf2.length == 6){
        return cpf2.slice(0, 3) + "."  +cpf2.slice(3, 6)
    }
    else if(cpf2.length == 9){
        return cpf2.slice(0, 3) + "."  +cpf2.slice(3, 6) + "." + cpf2.slice(6, 9)
    }
  
    else if(cpf2.length == 11){
        valido = verificaCPF(cpf2)
        if(!valido){
            setSendCpf(false)
        }
        else {
            setSendCpf(true)
        }
        return cpf2.slice(0, 3) + "."  + cpf2.slice(3, 6) + "." + cpf2.slice(6, 9) + "-" + cpf2.slice(9, 11)
    }
    else return cpf
  }

  useEffect(() => {
    const initialMessages = [
      {
        _id: 2,
        text: 'Olá! 😀',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: 3,
        text: 'Que bom ver você aqui!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: 4,
        text: 'A abertura da sua conta é rápida, segura e leva poucos minutos.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: 5,
        text: 'Primeiro, qual tipo de conta você quer abrir?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
    ];



    const init = async () => {await addMessagesWithDelay(initialMessages); setShowButton(true)}
    init()

  }, []);

  const onSend = newMessages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };


  function handleclick(tipo) {
    if(tipo == "pf"){
      if (pjIsChecked){
        setPjChecked(false)
      }
      setPfChecked(true)
    }
    else{
      if (pfIsChecked){
        setPfChecked(false)
      }
      setPjChecked(true)
    }
  }

  return (

    
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        renderAvatar={null}
        renderTime={() => null}
        renderDay ={() => null}
        onLongPress={() => null}
        minInputToolbarHeight={60}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#333',
                padding: 10
              },
              right: {
                backgroundColor: '#d8d8d8',
                padding: 10,
                marginBottom: 20,
                marginTop: 20,
              },
            }}
            textStyle={{
              left: {

                fontFamily: "MontserratAlternates-regular",
                fontSize: 16,
                color: "#FFF"
              },
              right: {
                fontFamily: "MontserratAlternates-regular",
                fontSize: 16,
                color: "#000000"
              },
            }}
          />
        )}
        inverted={true}
        renderInputToolbar={() => null}
      />
      { showButton && (
        <Button onPress={() => setVisibleModal(true)} style={{marginTop: '-8%',marginBottom: '10%', width: "95%"}} text='Selecionar'/>) }
      { showCpfInput && (<Input onSend={async () => {
        onSend({
          _id: 9, 
          text: cpfInput,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'User',
          }
        },)
        setShowCpfInput(false)
        await addMessagesWithDelay([
          {
            _id: 10,
            text: 'Como podemos chamar você?',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
            }
          },
          {
            _id: 8,
            text: 'Pode ser seu primeiro nome ou apelido.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
            }
          }
        ])
      
      }} 
      maxLength={14} 
      value={cpfInput} 
      disabled={sendCpf} 
      formater={(cpfInput) => setCpfInput(formataCPF(cpfInput))} 
      placeHolder='Digite seu CPF...' 
      keyType='numeric' disable/>)}

      {showNomeInput && (<Input value={nomeInput} disabled={sendNome} placeHolder='Digite um nome ou apelido...' formater={(nomeInput) => setNomeInput(nomeInput)} onSend />)}
      
      <Modal
        isVisible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        transparent={true}
        animationType="slide"
        onBackdropPress={() => setVisibleModal(false)}
        style={{
            margin:0,
            justifyContent: 'flex-end',
                }}
      >
        <View style={{
                    backgroundColor: "#181616",
                    flex: 0.30,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
        }}>
          <Text
          style={{
            fontFamily: "MontserratAlternates-regular",
            fontSize: 16, 
            color: COLORS.white
          }}
          >Que tipo de conta você quer abrir?</Text>
          <Checkbox text="Abrir uma conta pessoal (PF)" value={pfIsChecked} onPress={() => handleclick('pf')}/>
          <Checkbox text="Abrir uma conta empresarial (PJ)" value={pjIsChecked} onPress={() => handleclick('pj')}/>
          <Button text="Continuar" isActive={pfIsChecked || pjIsChecked} style={{marginTop: "10%"}} onPress={
            async () => {
              setVisibleModal(false)
              setShowButton(false)
              onSend({
                _id: 6,
                text: pfIsChecked ? 'Abrir uma conta pessoal (PF)' : 'Abrir uma conta empresarial (PJ)',
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'User',
                },
              })
              await addMessagesWithDelay([
                {
                  _id: 7,
                  text: 'As contas Swift são sempre atreladas ao CPF, tanto a conta pessoal quanto a conta da empresa.',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'Bot',
                  }
                },
                {
                  _id: 8,
                  text: 'Por isso, digite o número do seu CPF.',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'Bot',
                  }
                }
              ])
              setShowCpfInput(true)  
            }}
              
            />

              
        </View>
      </Modal>
    </View>
  );
}

export default Singup