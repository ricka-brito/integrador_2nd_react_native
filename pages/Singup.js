import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble  } from 'react-native-gifted-chat';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import Modal from "react-native-modal";
import COLORS from "../constants/colors";
//import Checkbox from 'expo-checkbox';
import Checkbox from "../components/Checkbox.js"
import Button from "../components/Button";
import Input from "../components/Input";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { AntDesign } from '@expo/vector-icons';


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

function applyMask(inputField) {
  // Remove todos os caracteres não numéricos
  let phoneNumber = inputField.replaceAll(/\D/g, '');
  
  if (phoneNumber == 2)
  return phoneNumber;
}

const Singup = ({ navigation }, props) => {


  const {fontsLoaded} = props;
  const [messages, setMessages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showButtonTermos, setButtonTermos] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pfIsChecked, setPfChecked] = useState(false);
  const [pjIsChecked, setPjChecked] = useState(false);

  // input_cpf
  const [showCpfInput, setShowCpfInput] = useState(false);
  const [cpfInput, setCpfInput] = useState("");
  const [sendCpf, setSendCpf] = useState(false);
  const [senha, setSenha] = useState('');
  const [visibleModalPassword, setVisibleModalPassword] = useState(false);
  const refInputSenha = useRef(null);
 
  // input_nome
  const [showNomeInput, setShowNomeInput] = useState(false);
  const [nomeInput, setNomeInput] = useState("");
  const [sendNome, setSendNome] = useState(false);

  // input_email 
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [sendEmail, setSendEmail] = useState(false);

  // input_telefone
  const [showTelefoneInput, setShowTelefoneInput] = useState(false);
  const [telefoneInput, setTelefoneInput] = useState('');
  const [sendTelefone, setSendTelefone] = useState(false);

  // senhas
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] = useState(false)
  const [willShowConfirmPasswordModal, setWillShowConfirmPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showButtonSenha, setShowButtonSenha] = useState(false)
  const [deuErroSenha, setDeuErroSenha] = useState(false)
  const refInputPassword = useRef(null);
  const refInputConfirmPassword = useRef(null);

  

  //modal-Sair
  const [isVisibleModalSair, setIsVisibleModalSair] = useState(false)
  const [sair, setSair] = useState(false)

  const messageDelay = 500; // 2 segundos de atraso entre mensagens

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
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '10%',
        backgroundColor: '#000',
        zIndex: 100
      }}>
        <TouchableOpacity onPress={() => setIsVisibleModalSair(true)} style={{marginTop: '14%', marginLeft: '5%'}}>
          <AntDesign name="close" size={19} color="#ddd" />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        parsePatterns={(linkStyle) => [
          { type: 'email', style: null, onPress: null },
        ]}
        renderAvatar={null}
        renderTime={() => null}
        renderDay ={() => null}
        onLongPress={() => null}
        minInputToolbarHeight={60}
        renderBubble={(props) => {
          const { currentMessage } = props;
          const { botao } = currentMessage;

          return(
          <Bubble
            {...props}
            renderCustomView={() => (botao ? botao : null)}
            isCustomViewBottom={true}
            wrapperStyle={{
              left: {
                backgroundColor: '#333',
                padding: 10
              },
              right: {
                backgroundColor: '#eeeeee',
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
        )}}
        inverted={true}
        renderInputToolbar={() => null}
      />
      { showButton && (
        <Button onPress={() => setVisibleModal(true)} style={{marginTop: '-8%',marginBottom: '10%', width: "95%"}} text='Selecionar'/>) }
      { showButtonTermos && (
        <Button onPress={async () => {
          onSend({
            _id: 14,
            text: '👍',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'User',
            }
          })
          setButtonTermos(false)
          await addMessagesWithDelay([
            {
              _id: 15,
              text: 'Qual o seu e-mail pessoal?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            }
          ])
          setShowEmailInput(true)
        }} style={{marginTop: '-8%',marginBottom: '10%', width: "95%"}} text='Li e estou de acordo'/>) }
      { showCpfInput && (<Input onSend={async () => {
        if (cpfInput == '269.738.168-60'){
          setVisibleModalPassword(true)
          setShowCpfInput(false)
        }
        else{
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
              _id: 11,
              text: 'Pode ser seu primeiro nome ou apelido.',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            }
          ])
        setShowNomeInput(true)
        }
      }} 
      maxLength={14} 
      value={cpfInput} 
      disabled={sendCpf} 
      formater={(cpfInput) => {setCpfInput(cpfInput); cpfInput.length == 14 ? setSendCpf(verificaCPF(cpfInput)) : null}} 
      placeHolder='Digite seu CPF...' 
      keyType='numeric'
      mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
      />
      )}

      {showNomeInput && (<Input onSend={async () => {
        onSend({
          _id: 12,
          text: nomeInput,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'User',
          }
        })
        setShowNomeInput(false)
        await addMessagesWithDelay([
          {
            _id: 13,
            text: 'Para continuar, você precisa aceitar os Termos de Uso e Politica de Privacidade.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
            },
            botao: <TouchableOpacity 
            style={{
              borderRadius: 20,
              padding: '2%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: "3%",
              borderColor: '#ddd',
              borderWidth: 1,
              width: '60%'
            }}
          >
            <Text style={{
              fontFamily: "MontserratAlternates-regular",
              color: '#ddd',
              fontSize: 12
            }}>ABRIR TERMOS DE USO</Text>
          </TouchableOpacity> 
          }
        ])
        setButtonTermos(true)
      }} value={nomeInput} disabled={sendNome} placeHolder='Digite um nome ou apelido...' formater={(nomeInput) => { setNomeInput(nomeInput); nomeInput.length ? setSendNome(true) : setSendNome(false)}}/>)}
      
      {showEmailInput && (<Input

        onSend={async () => {
          await onSend({
            _id: 16,
            text: emailInput,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'User',
            }
          })
          setShowEmailInput(false)
          await addMessagesWithDelay([
            {
              _id: 17,
              text: 'Qual o número do seu celular (com DDD)?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            }
          ])
          setShowTelefoneInput(true)
        }}
        value={emailInput} disabled={sendEmail} placeHolder='Digite um e-mail...' formater={(emailInput => {setEmailInput(emailInput); setSendEmail(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(emailInput))
      })}
      />)}
      {showTelefoneInput && <Input

        onSend={async () => {
           onSend({
            _id: 18,
            text: telefoneInput,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'User',
            }
          })
          setShowTelefoneInput(false)
          await addMessagesWithDelay([
            {
              _id: 19,
              text: 'Crie uma senha de 6 números para acessar o app.',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            },
            {
              _id: 20,
              text: 'Não é a mesma senha do cartão nem da conta corrente, ok?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            },
            {
              _id: 21,
              text: 'Ah! Não use números sequenciais ou a data do seu aniversario.',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot',
              }
            }
          ])
          setShowButtonSenha(true)

        }}
      
        keyType='numeric' maxLength={15} value={telefoneInput} disabled={sendTelefone} placeHolder='Digite um telefone...' mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} formater={telefoneInput => {setTelefoneInput(telefoneInput); setSendTelefone(telefoneInput.length == 15)}}
      
      />}
      { showButtonSenha && (
        <Button onPress={() => setShowPasswordModal(true)} style={{marginTop: '-8%',marginBottom: '10%', width: "95%"}} text='Criar senha'/>) }
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
      <Modal
                isVisible={visibleModalPassword}
                onRequestClose={() => setVisibleModalPassword(false)}
                transparent={true}
                animationType="slide"
                style={{
                    margin:0,
                    justifyContent: 'flex-end',
                }}
                onModalWillShow={() => setSenha("")}
                onModalShow={() => {
                    refInputSenha.current.focus()
                }}
                onModalWillHide={() => refInputSenha.current.blur()}
            >
                <View style={{
                    backgroundColor: "#181616",
                    flex: 0.60,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 22,
                        marginBottom: "13%",
                        marginTop: "5%",
                        textAlign: 'center'
                    }}
                    >
                        Insira a senha de acesso
                    </Text>
                    <SmoothPinCodeInput
                        ref={refInputSenha}
                        placeholder={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            borderWidth:  1,
                            borderColor: "#fff"
                        }}></View>}
                        mask={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            backgroundColor: "#fff",
                        }}></View>}
                        maskDelay={0}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={null}
                        value={senha}
                        onTextChange={senha => setSenha(senha)}
                        autoFocus={true}
                        codeLength={6}
                        restrictToNumbers={true}
                        animated={false}
                        cellSpacing={1}
                    />
                    <TouchableOpacity style={{marginTop: "7%"}}>
                        <Text style={{
                            color: COLORS.primary,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontSize: 12,
                        }}>Redefinir senha</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
            <Modal
              isVisible={isVisibleModalSair}
              onRequestClose={() => setIsVisibleModalSair(false)}
              transparent={true}
              onBackdropPress={() => setIsVisibleModalSair(false)}
                animationType="slide"
                style={{
                    margin:0,
                    justifyContent: 'flex-end',
                }}
              onModalHide={() => sair ? navigation.goBack() : null}
            >
              <View style={{
                    backgroundColor: "#181616",
                    flex: 0.26,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
                    alignItems: 'center'
                }}>
                  <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 22,
                        marginBottom: "6%",
                        marginTop: "5%",
                        textAlign: 'center'
                    }}
                    >
                        Deseja cancelar a abertura da sua conta?
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 12,
                        marginBottom: "6%",
                        textAlign: 'center'
                    }}
                    >
                      Você perdera todas as informações preenchidas.
                    </Text>
                    <View style={{
                      display: 'flex',
                      flexDirection: "row",
                      justifyContent: 'space-around',
                      width: '100%'
                    }}>
                      <Button onPress={() => setIsVisibleModalSair(false)} text='Não' colors={[]} style={{width: '45%', height: 55, borderColor: '#ddd', borderRadius: 10, borderWidth: 1, color: '#ddd'}}/>
                      <Button onPress={async () => { setSair(true), setIsVisibleModalSair(false)}} text='Sim' style={{width: '45%', height: 55}}/>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={showPasswordModal}
                onRequestClose={() => setShowPasswordModal(false)}
                transparent={true}
                animationType="slide"
                onBackdropPress={() => setShowPasswordModal(false)}
                style={{
                    margin:0,
                    justifyContent: 'flex-end',
                }}
                onModalWillShow={() => setPassword("")}
                onModalShow={() => {
                  setShowButtonSenha(false)
                  refInputPassword.current.focus()
                }}
                onModalWillHide={() => refInputPassword.current.blur()}
                onModalHide={() => {willShowConfirmPasswordModal ? setShowConfirmPasswordModal(true) : setShowButtonSenha(true); setWillShowConfirmPasswordModal(false)}}
            >
                <View style={{
                    backgroundColor: "#181616",
                    flex: 0.60,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 22,
                        marginBottom: "13%",
                        marginTop: "5%",
                        textAlign: 'center'
                    }}
                    >
                      Crie sua senha de acesso
                    </Text>
                    <SmoothPinCodeInput
                        ref={refInputPassword}
                        placeholder={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            borderWidth:  1,
                            borderColor: "#fff"
                        }}></View>}
                        mask={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            backgroundColor: "#fff",
                        }}></View>}
                        maskDelay={0}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={null}
                        value={password}
                        onTextChange={password => setPassword(password)}
                        autoFocus={true}
                        codeLength={6}
                        restrictToNumbers={true}
                        animated={false}
                        cellSpacing={1}
                        onFulfill={() => {
                          setWillShowConfirmPasswordModal(true)
                          setShowPasswordModal(false)
                        }}
                    />
                </View>

            </Modal>
            <Modal
                isVisible={showConfirmPasswordModal}
                onRequestClose={() => setShowConfirmPasswordModal(false)}
                transparent={true}
                animationType="slide"
                onBackdropPress={() => setShowConfirmPasswordModal(false)}
                style={{
                    margin:0,
                    justifyContent: 'flex-end',
                }}
                onModalWillShow={() => setConfirmPassword("")}
                onModalShow={() => {
                    setWillShowConfirmPasswordModal(false)
                    refInputConfirmPassword.current.focus()
                }}
                onModalWillHide={() => {refInputConfirmPassword.current.blur(); password != confirmPassword ? setShowButtonSenha(true) : null}}
                onModalHide={async () => {
                  if (willShowConfirmPasswordModal) {
                    onSend({
                      _id: 22,
                      text: '🔐......',
                      createdAt: new Date(),
                      user: {
                        _id: 1,
                        name: 'User',
                      }
                    })
                    await addMessagesWithDelay([
                      {
                        _id: 23,
                        text: 'Vamos continuar. Qual é o seu endereço residencial?',
                        createdAt: new Date(),
                        user: {
                          _id: 2,
                          name: 'Bot',
                        }
                      },
                      {
                        _id: 24,
                        text: 'Primeiro, digite o CEP.',
                        createdAt: new Date(),
                        user: {
                          _id: 2,
                          name: 'Bot',
                        }
                      },
                    ])
                  }
                }}
            >
                <View style={{
                    backgroundColor: "#181616",
                    flex: 0.60,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
                    alignItems: 'center'
                }}>
                    <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 22,
                        marginBottom: "13%",
                        marginTop: "5%",
                        textAlign: 'center'
                    }}
                    >
                      Repita sua senha de acesso
                    </Text>
                    <SmoothPinCodeInput
                        ref={refInputConfirmPassword}
                        placeholder={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            borderWidth:  1,
                            borderColor: "#fff"
                        }}></View>}
                        mask={<View style={{
                            width: 18,
                            height: 18,
                            borderRadius: 25,
                            backgroundColor: "#fff",
                        }}></View>}
                        maskDelay={0}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={null}
                        value={confirmPassword}
                        onTextChange={confirmPassword => {setConfirmPassword(confirmPassword)}}
                        autoFocus={true}
                        codeLength={6}
                        restrictToNumbers={true}
                        animated={false}
                        cellSpacing={1}
                        onFulfill={(confirmPassword) => {
                          setDeuErroSenha(false)
                          if (password != confirmPassword){
                            setDeuErroSenha(true)
                          }
                          else {
                            setWillShowConfirmPasswordModal(true)
                            setShowConfirmPasswordModal(false)

                          }
                        }}
                    />
                    {deuErroSenha && confirmPassword.length == 6 && <Text style={{
                            color: COLORS.secondary,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontSize: 12,
                            marginTop: "7%"

                        }}>As senhas não coincidem, digite novamente</Text>}
                </View>

            </Modal>
    </View>
  );
}

export default Singup