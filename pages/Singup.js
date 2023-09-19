import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble  } from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Modal from "react-native-modal";
import COLORS from "../constants/colors";
import Checkbox from 'expo-checkbox';

const Singup = (props) => {


  const {fontsLoaded} = props;
  const [messages, setMessages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pfIsChecked, setPfChecked] = useState(false);
  const [pjIsChecked, setPjChecked] = useState(false);


  useEffect(() => {
    const initialMessages = [
      {
        _id: 1,
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

    const messageDelay = 2000; // 2 segundos de atraso entre mensagens

    const addMessagesWithDelay = async () => {
      for (let i = 0; i < initialMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, messageDelay));
        setMessages(previousMessages => GiftedChat.append(previousMessages, [initialMessages[i]]));
      }
      setShowButton(true);
    };

    addMessagesWithDelay();
  }, []);

  const onSend = newMessages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const messagesUser = [{
    _id: 6,
    text: 'Abrir uma conta pessoal(PF)',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'User',
    },
  },
  ];

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
                padding: 10
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
      {showButton && (
        <TouchableOpacity style={{
          width: "95%", 
          height: 45,
           alignSelf: 'center',
           marginTop: '-8%',
           marginBottom: '10%'
          }}
          onPress={() => {
            setVisibleModal(true)
          }}
          >
          <LinearGradient 
          start={{x: 0.0, y: 0.95}} 
          end={{x: 0.8, y: 1.0}} 
          colors={[ COLORS.secondary, COLORS.primary ]} 
          style={{
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: 10,}}>
              <Text style={{color: COLORS.white }}>Selecionar</Text>
          </LinearGradient>
      </TouchableOpacity>
      )}
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
          <View
            style={{
              display:'flex',
              flexDirection: 'row',
              alignItems:'center',
              justifyContent: 'space-between',
              marginTop: "10%"
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratAlternates-regular",
                fontSize: 14, 
                color: COLORS.white
              }}
            >Abrir uma conta pessoal(PF)</Text>
            <Checkbox 
            onValueChange={() => handleclick("pf")}
            value={pfIsChecked}
            style={{
              borderRadius: "50%"
            }}
            color={pfIsChecked ? COLORS.secondary : undefined}
            />
          </View>
          <View
          style={{
            display:'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'space-between',
            marginTop: "10%"
          }}
          >
            <Text style={{
            fontFamily: "MontserratAlternates-regular",
            fontSize: 14, 
            color: COLORS.white
          }}
            >Abrir uma conta empresarial(PJ)</Text>
            <Checkbox 
            onValueChange={() => handleclick("pj")}
            value={pjIsChecked}
            style={{
              borderRadius: "50%"
            }}
            color={pjIsChecked ? COLORS.secondary : undefined}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Singup