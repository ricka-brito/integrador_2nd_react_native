import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { GiftedChat, Bubble  } from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';


const Singup = () => {
  const [messages, setMessages] = useState([]);
  const [showButton, setShowButton] = useState(false);

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
        _id: 2,
        text: 'Que bom ver você aqui!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: 3,
        text: 'A abertura da sua conta é rápida, segura e leva poucos minutos.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
      {
        _id: 4,
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
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: 'darkgray',
              },
            }}
            textStyle={{
              right: {
                color: 'white',
              },
            }}
          />
        )}
        inverted={true}
      />
      {showButton && (
        <Button
          title="Selecionar"
          onPress={() => {
            // Faça a ação desejada ao pressionar o botão "Selecionar"
          }}
        />
      )}
    </View>
  );
}

export default Singup