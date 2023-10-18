import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  LayoutAnimation,
  Alert,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import COLORS from "../constants/colors";
import Checkbox from "../components/Checkbox.js";
import Button from "../components/Button";
import Input from "../components/Input";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { ScrollView } from "react-native-gesture-handler";
import { TypingAnimation } from "react-native-typing-animation";
import * as Haptics from "expo-haptics";
import { FloatingLabelInput } from "react-native-floating-label-input";
import CameraModal from "../components/cameraModal";
import { createNumberMask } from "react-native-mask-input";
import ProgressIndicator from "../components/ProgressIndicator";

function verificaCPF(strCPF) {
  strCPF = strCPF.replaceAll(".", "").replaceAll("-", "");
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  if (new Set(strCPF).size == 1) return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

const Singup = ({ navigation }, props) => {
  const { fontsLoaded } = props;
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
  const [senha, setSenha] = useState("");
  const [visibleModalPassword, setVisibleModalPassword] = useState(false);
  const refInputSenha = useRef(null);

  // input_nome
  const [showNomeInput, setShowNomeInput] = useState(false);
  const [nomeInput, setNomeInput] = useState("");
  const [sendNome, setSendNome] = useState(false);

  // input_email
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  // input_telefone
  const [showTelefoneInput, setShowTelefoneInput] = useState(false);
  const [telefoneInput, setTelefoneInput] = useState("");
  const [sendTelefone, setSendTelefone] = useState(false);

  // senhas
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] =
    useState(false);
  const [willShowConfirmPasswordModal, setWillShowConfirmPasswordModal] =
    useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showButtonSenha, setShowButtonSenha] = useState(false);
  const [deuErroSenha, setDeuErroSenha] = useState(false);
  const refInputPassword = useRef(null);
  const refInputConfirmPassword = useRef(null);

  // input_cep
  const [showCepInput, setShowCepInput] = useState(false);
  const [cepInput, setCepInput] = useState("");
  const [sendCep, setSendCep] = useState(false);
  const [showCepModal, setShowCepModal] = useState(false);
  const [focusCep, setFocusCep] = useState(false);
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numeroInvalido, setNumeroInvalido] = useState(false);
  const [cepValido, setCepValido] = useState(true);
  const [enviarEnd, setEnviarEnder] = useState(false);

  // foto
  const [showFotoButton, setShowFotoButton] = useState(false);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [photo, setPhoto] = useState();

  // salario
  const [salario, setSalario] = useState();
  const [showInputSalario, setShowInputSalario] = useState(false);
  const [sendSalario, setSendSalario] = useState(false);

  // proposta
  const [showButtonProposta, setShowButtonProposta] = useState(false);
  const [propostaAceita, setPropostaAceita] = useState(false);
  const [showModalProposta, setShowModalProposta] = useState(false);

  //modal-Sair
  const [isVisibleModalSair, setIsVisibleModalSair] = useState(false);
  const [sair, setSair] = useState(false);

  // Fim
  const [showButtonContinuar, setShowButtonContinuar] = useState(false);

  //sending
  const [sending, setSending] = useState(false);
  const messageDelay = 2000; // 2 segundos de atraso entre mensagens

  const sendAPI = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, Math.random() * 3000);
    });
  };

  const addMessagesWithDelay = async (initialMessages) => {
    setSending(true);
    for (let i = 0; i < initialMessages.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, messageDelay));
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [initialMessages[i]])
      );
    }
    setSending(false);
  };

  useEffect(() => {
    const initialMessages = [
      {
        _id: uuid.v4(),
        text: "Olá! 😀",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
      {
        _id: uuid.v4(),
        text: "Que bom ver você aqui!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
      {
        _id: uuid.v4(),
        text: "A abertura da sua conta é rápida, segura e leva poucos minutos.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
      {
        _id: uuid.v4(),
        text: "Primeiro, qual tipo de conta você quer abrir?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
    ];

    const init = async () => {
      await addMessagesWithDelay(initialMessages);
      setShowButton(true);
    };
    init();
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  function handleclick(tipo) {
    if (tipo == "pf") {
      if (pjIsChecked) {
        setPjChecked(false);
      }
      setPfChecked(true);
    } else {
      if (pfIsChecked) {
        setPfChecked(false);
      }
      setPjChecked(true);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          backgroundColor: "#000",
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisibleModalSair(true)}
          style={{ marginTop: "14%", marginLeft: "5%" }}
        >
          <AntDesign name="close" size={19} color="#ddd" />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        parsePatterns={(linkStyle) => [
          { type: "email", style: null, onPress: null },
        ]}
        renderAvatar={null}
        renderTime={() => null}
        renderDay={() => null}
        onLongPress={() => null}
        minInputToolbarHeight={60}
        renderFooter={() =>
          sending ? (
            <TypingAnimation
              style={{ height: "3%", marginLeft: "4%" }}
              dotColor="#ccc"
              dotRadius={4.5}
              dotMargin={7}
            />
          ) : null
        }
        renderBubble={(props) => {
          const { currentMessage } = props;
          const { botao } = currentMessage;

          const fadeIn = {
            from: {
              translateY: 70,
            },
            to: {
              translateY: 0,
            },
          };
          return (
            <Animatable.View
              animation={fadeIn}
              duration={200}
              easing={"linear"}
            >
              <Bubble
                {...props}
                renderCustomView={() => (botao ? botao : null)}
                isCustomViewBottom={true}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#333",
                    padding: 10,
                  },
                  right: {
                    backgroundColor: "#eeeeee",
                    padding: 10,
                    marginBottom: 20,
                    marginTop: 20,
                  },
                }}
                textStyle={{
                  left: {
                    fontFamily: "MontserratAlternates-regular",
                    fontSize: 16,
                    color: "#FFF",
                  },
                  right: {
                    fontFamily: "MontserratAlternates-regular",
                    fontSize: 16,
                    color: "#000000",
                  },
                }}
              />
            </Animatable.View>
          );
        }}
        inverted={true}
        renderInputToolbar={() => null}
      />
      {showButton && (
        <Button
          onPress={() => setVisibleModal(true)} //visibleModal
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Selecionar"
        />
      )}
      {showButtonTermos && (
        <Button
          onPress={async () => {
            onSend({
              _id: 14,
              text: "👍",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            setButtonTermos(false);
            await addMessagesWithDelay([
              {
                _id: 15,
                text: "Qual o seu e-mail pessoal?",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowEmailInput(true);
          }}
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Li e estou de acordo"
        />
      )}
      {showCpfInput && (
        <Input
          onSend={async () => {
            if (cpfInput == "269.738.168-60") {
              setVisibleModalPassword(true);
              setShowCpfInput(false);
            } else {
              onSend({
                _id: 9,
                text: cpfInput,
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "User",
                },
              });
              setShowCpfInput(false);
              await addMessagesWithDelay([
                {
                  _id: 10,
                  text: "Como podemos chamar você?",
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: "Bot",
                  },
                },
                {
                  _id: 11,
                  text: "Pode ser seu primeiro nome ou apelido.",
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: "Bot",
                  },
                },
              ]);
              setShowNomeInput(true);
            }
          }}
          maxLength={14}
          value={cpfInput}
          disabled={sendCpf}
          formater={(cpfInput) => {
            setCpfInput(cpfInput);
            cpfInput.length == 14 ? setSendCpf(verificaCPF(cpfInput)) : null;
          }}
          placeHolder="Digite seu CPF..."
          keyType="numeric"
          mask={[
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
        />
      )}
      {showNomeInput && (
        <Input
          onSend={async () => {
            onSend({
              _id: 12,
              text: nomeInput,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            setShowNomeInput(false);
            await addMessagesWithDelay([
              {
                _id: 13,
                text: "Para continuar, você precisa aceitar os Termos de Uso e Politica de Privacidade.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
                botao: (
                  <TouchableOpacity
                    style={{
                      borderRadius: 20,
                      padding: "2%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "3%",
                      borderColor: "#ddd",
                      borderWidth: 1,
                      width: "60%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "MontserratAlternates-regular",
                        color: "#ddd",
                        fontSize: 12,
                      }}
                    >
                      ABRIR TERMOS DE USO
                    </Text>
                  </TouchableOpacity>
                ),
              },
            ]);
            setButtonTermos(true);
          }}
          value={nomeInput}
          disabled={sendNome}
          placeHolder="Digite um nome ou apelido..."
          formater={(nomeInput) => {
            setNomeInput(nomeInput);
            nomeInput.length ? setSendNome(true) : setSendNome(false);
          }}
        />
      )}
      {showEmailInput && (
        <Input
          onSend={async () => {
            await onSend({
              _id: 16,
              text: emailInput,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            setShowEmailInput(false);
            await addMessagesWithDelay([
              {
                _id: 17,
                text: "Qual o número do seu celular (com DDD)?",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowTelefoneInput(true);
          }}
          value={emailInput}
          disabled={sendEmail}
          placeHolder="Digite um e-mail..."
          formater={(emailInput) => {
            setEmailInput(emailInput);
            setSendEmail(
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(
                emailInput
              )
            );
          }}
        />
      )}
      {showTelefoneInput && (
        <Input
          onSend={async () => {
            onSend({
              _id: 18,
              text: telefoneInput,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            setShowTelefoneInput(false);
            await addMessagesWithDelay([
              {
                _id: 19,
                text: "Crie uma senha de 6 números para acessar o app.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
              {
                _id: 20,
                text: "Não é a mesma senha do cartão nem da conta corrente, ok?",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
              {
                _id: 21,
                text: "Ah! Não use números sequenciais ou a data do seu aniversario.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowButtonSenha(true);
          }}
          keyType="numeric"
          maxLength={15}
          value={telefoneInput}
          disabled={sendTelefone}
          placeHolder="Digite um telefone..."
          mask={[
            "(",
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          formater={(telefoneInput) => {
            setTelefoneInput(telefoneInput);
            setSendTelefone(telefoneInput.length == 15);
          }}
        />
      )}
      {showButtonSenha && (
        <Button
          onPress={() => setShowPasswordModal(true)}
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Criar senha"
        />
      )}
      {showCepInput && (
        <Input
          onSend={async () => {
            setShowCepModal(true);
          }}
          keyType="numeric"
          maxLength={9}
          value={cepInput}
          disabled={sendCep}
          placeHolder="Digite o seu cep..."
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
          formater={(cepInput) => {
            setCepInput(cepInput);
            setSendCep(cepInput.length == 9);
          }}
        />
      )}
      {showFotoButton && (
        <Button
          onPress={() => setShowFotoModal(true)}
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Tirar foto"
        />
      )}
      {showInputSalario && (
        <Input
          keyType="numeric"
          mask={createNumberMask({
            delimiter: ".",
            separator: ",",
            precision: 2,
          })}
          prefix="R$"
          placeHolder="0,00"
          value={salario}
          formater={(salario) => {
            setSalario(salario);
            setSendSalario(salario.length > 0);
          }}
          disabled={sendSalario}
          onSend={async () => {
            setShowInputSalario(false);
            onSend({
              _id: 31,
              text: `R$ ${salario}`,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            await addMessagesWithDelay([
              {
                _id: 32,
                text: "Para terminar, você precisa aceitar os termos de abertura de conta.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowButtonProposta(true);
          }}
        />
      )}
      {showButtonProposta && (
        <Button
          onPress={() => setShowModalProposta(true)}
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Ver proposta"
        />
      )}
      {showButtonContinuar && (
        <Button
          onPress={() => navigation.goBack()}
          style={{ marginTop: "-8%", marginBottom: "10%", width: "95%" }}
          text="Ok"
        />
      )}

      <Modal
        isVisible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        transparent={true}
        animationType="slide"
        onBackdropPress={() => setVisibleModal(false)}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 0.3,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
          }}
        >
          <Text
            style={{
              fontFamily: "MontserratAlternates-regular",
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            Que tipo de conta você quer abrir?
          </Text>
          <Checkbox
            text="Abrir uma conta pessoal (PF)"
            value={pfIsChecked}
            onPress={() => handleclick("pf")}
          />
          <Checkbox
            text="Abrir uma conta empresarial (PJ)"
            value={pjIsChecked}
            onPress={() => handleclick("pj")}
          />
          <Button
            text="Continuar"
            isActive={pfIsChecked || pjIsChecked}
            style={{ marginTop: "10%" }}
            onPress={async () => {
              setVisibleModal(false);
              setShowButton(false);
              onSend({
                _id: 6,
                text: pfIsChecked
                  ? "Abrir uma conta pessoal (PF)"
                  : "Abrir uma conta empresarial (PJ)",
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: "User",
                },
              });
              await addMessagesWithDelay([
                {
                  _id: 7,
                  text: "As contas Swift são sempre atreladas ao CPF, tanto a conta pessoal quanto a conta da empresa.",
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: "Bot",
                  },
                },
                {
                  _id: 8,
                  text: "Por isso, digite o número do seu CPF.",
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: "Bot",
                  },
                },
              ]);
              setShowCpfInput(true);
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
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalWillShow={() => setSenha("")}
        onModalShow={() => {
          refInputSenha.current.focus();
        }}
        onModalWillHide={() => refInputSenha.current.blur()}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 0.6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 22,
              marginBottom: "13%",
              marginTop: "5%",
              textAlign: "center",
            }}
          >
            Insira a senha de acesso
          </Text>
          <SmoothPinCodeInput
            animated={true}
            ref={refInputSenha}
            placeholder={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "#fff",
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  backgroundColor: "#fff",
                }}
              ></View>
            }
            maskDelay={0}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={senha}
            onTextChange={(senha) => setSenha(senha)}
            autoFocus={true}
            codeLength={6}
            restrictToNumbers={true}
            cellSpacing={1}
          />
          <TouchableOpacity style={{ marginTop: "7%" }}>
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: "MontserratAlternates-SemiBold",
                fontSize: 12,
              }}
            >
              Redefinir senha
            </Text>
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
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalHide={() => (sair ? navigation.goBack() : null)}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 0.26,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 22,
              marginBottom: "6%",
              marginTop: "5%",
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            Você perdera todas as informações preenchidas.
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button
              onPress={() => setIsVisibleModalSair(false)}
              text="Não"
              colors={[]}
              style={{
                width: "45%",
                height: 55,
                borderColor: "#ddd",
                borderRadius: 10,
                borderWidth: 1,
              }}
            />
            <Button
              onPress={async () => {
                setSair(true), setIsVisibleModalSair(false);
              }}
              text="Sim"
              style={{ width: "45%", height: 55 }}
            />
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
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalWillShow={() => setPassword("")}
        onModalShow={() => {
          setShowButtonSenha(false);
          refInputPassword.current.focus();
        }}
        onModalWillHide={() => refInputPassword.current.blur()}
        onModalHide={() => {
          willShowConfirmPasswordModal
            ? setShowConfirmPasswordModal(true)
            : setShowButtonSenha(true);
          setWillShowConfirmPasswordModal(false);
        }}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 0.6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 22,
              marginBottom: "13%",
              marginTop: "5%",
              textAlign: "center",
            }}
          >
            Crie sua senha de acesso
          </Text>
          <SmoothPinCodeInput
            ref={refInputPassword}
            placeholder={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "#fff",
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  backgroundColor: "#fff",
                }}
              ></View>
            }
            maskDelay={0}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={password}
            onTextChange={(password) => setPassword(password)}
            autoFocus={true}
            codeLength={6}
            restrictToNumbers={true}
            animated={false}
            cellSpacing={1}
            onFulfill={() => {
              setWillShowConfirmPasswordModal(true);
              setShowPasswordModal(false);
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
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalWillShow={() => setConfirmPassword("")}
        onModalShow={() => {
          setWillShowConfirmPasswordModal(false);
          refInputConfirmPassword.current.focus();
        }}
        onModalWillHide={() => {
          refInputConfirmPassword.current.blur();
          password != confirmPassword ? setShowButtonSenha(true) : null;
        }}
        onModalHide={async () => {
          if (willShowConfirmPasswordModal) {
            onSend({
              _id: 22,
              text: "🔐......",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            await addMessagesWithDelay([
              {
                _id: 23,
                text: "Vamos continuar. Qual é o seu endereço residencial?",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
              {
                _id: 24,
                text: "Primeiro, digite o CEP.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowCepInput(true);
          }
        }}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 0.6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 22,
              marginBottom: "13%",
              marginTop: "5%",
              textAlign: "center",
            }}
          >
            Repita sua senha de acesso
          </Text>
          <SmoothPinCodeInput
            ref={refInputConfirmPassword}
            placeholder={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: "#fff",
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 25,
                  backgroundColor: "#fff",
                }}
              ></View>
            }
            maskDelay={0}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={confirmPassword}
            onTextChange={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
            autoFocus={true}
            codeLength={6}
            restrictToNumbers={true}
            animated={true}
            cellSpacing={1}
            onFulfill={(confirmPassword) => {
              setDeuErroSenha(false);
              if (password != confirmPassword) {
                setDeuErroSenha(true);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
                refInputConfirmPassword.current
                  .shake()
                  .then(() => setConfirmPassword(""));
              } else {
                setWillShowConfirmPasswordModal(true);
                setShowConfirmPasswordModal(false);
              }
            }}
          />
          {deuErroSenha && confirmPassword.length == 6 && (
            <Text
              style={{
                color: COLORS.secondary,
                fontFamily: "MontserratAlternates-SemiBold",
                fontSize: 12,
                marginTop: "7%",
              }}
            >
              As senhas não coincidem, digite novamente
            </Text>
          )}
        </View>
      </Modal>
      <Modal
        isVisible={showCepModal}
        onRequestClose={() => setShowCepModal(false)}
        transparent={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onModalShow={async () => {
          await fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
            .then((Response) => Response.json())
            .then((data) => {
              if (data.erro == true) {
                setCepValido(false);
                Alert.alert("Alerta", "CEP não encontrado");
              } else {
                //Alert.alert(JSON.stringify(data))
                setRua(data.logradouro);
                setBairro(data.bairro);
                setEstado(data.uf);
                setCidade(data.localidade);
                setCepValido(true);
              }
            });
        }}
        onModalHide={
          !enviarEnd
            ? () => {
                setRua("");
                setBairro("");
                setEstado("");
                setCidade("");
                setNumero("");
              }
            : async () => {
                setShowCepInput(false);
                onSend({
                  _id: 25,
                  text: `${cepInput}\n${rua}\n${bairro}\n${cidade} - ${estado}`,
                  createdAt: new Date(),
                  user: {
                    _id: 1,
                    name: "User",
                  },
                });
                await addMessagesWithDelay([
                  {
                    _id: 26,
                    text: "Endereço cadastradado.",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: "Bot",
                    },
                  },
                  {
                    _id: 27,
                    text: "Vamos precisar de uma selfie para confirmar sua identidade",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: "Bot",
                    },
                  },
                  {
                    _id: 28,
                    text: "Importante: A selfie deve ser do titular do CPF que está abrindo a conta.",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: "Bot",
                    },
                  },
                ]);
                setShowFotoButton(true);
              }
        }
        onBackdropPress={() => setShowCepModal(false)}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#181616",
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            paddingTop: 0,
          }}
        >
          <View
            style={{
              display: "flex",
              marginTop: 0,
              flexDirection: "row",
              zIndex: 100,
              backgroundColor: "#181616",
            }}
          >
            <TouchableOpacity
              style={{ marginTop: "12%" }}
              onPress={() => setShowCepModal(false)}
            >
              <AntDesign name="left" size={25} color="#ddd" />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                fontSize: 16,
                marginTop: "13.5%",
                flex: 1,
                textAlign: "center",
              }}
            >
              Endereço residencial
            </Text>
          </View>
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            style={{ borderColor: "#fff", borderWidth: 0, maxHeight: "100%" }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-regular",
                fontSize: 14,
                marginTop: "8.5%",
                flex: 1,
                textAlign: "left",
              }}
            >
              Verifique os dados abaixo e preencha os campos restantes.
            </Text>
            <FloatingLabelInput
              label={"CEP"}
              containerStyles={{
                borderBottomColor: !cepValido ? COLORS.secondary : "#ddd",
                borderBottomWidth: 1,
                marginBottom: "5%",
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: !cepValido ? COLORS.secondary : "#ccc",
                colorFocused: !cepValido ? COLORS.secondary : "#ccc",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              mask={"99999-999"}
              value={cepInput}
              onChangeText={(cepInput) => {
                setCepInput(cepInput);
                cepInput.length != 9
                  ? () => {
                      setCepValido(false);
                      setRua("");
                      setBairro("");
                      setEstado("");
                      setCidade("");
                      setNumero("");
                    }
                  : setCepValido(true);
              }}
              inputStyles={{
                color: !cepValido ? COLORS.secondary : "#fff",
                fontSize: 16,
              }}
              selectionColor={!cepValido ? COLORS.secondary : "#fff"}
              inputMode={"numeric"}
              isFocused={focusCep}
              onBlur={() => {
                if (cepInput === "") {
                  setCepValido(false);
                  setFocusCep(false);
                }
                if (cepInput.length == 9) {
                  fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
                    .then((Response) => Response.json())
                    .then((data) => {
                      if (data.erro == true) {
                        setCepValido(false);
                        Alert.alert("Alerta", "CEP não encontrado");
                        setRua("");
                        setBairro("");
                        setEstado("");
                        setCidade("");
                        setNumero("");
                      } else {
                        //Alert.alert(JSON.stringify(data))
                        setRua(data.logradouro);
                        setBairro(data.bairro);
                        setEstado(data.uf);
                        setCidade(data.localidade);
                        setNumero("");
                        setCepValido(true);
                      }
                    });
                } else {
                  setCepValido(false);
                }
              }}
              onFocus={() => {
                setFocusCep(true);
              }}
            />
            {!cepValido && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  top: "23.5%",
                  left: "0%",
                }}
              >
                <AntDesign
                  name="exclamationcircle"
                  size={13}
                  color={COLORS.secondary}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontFamily: "MontserratAlternates-regular",
                  }}
                >
                  Preencha um CEP válido
                </Text>
              </View>
            )}
            <FloatingLabelInput
              label={"Endereço"}
              containerStyles={{
                borderBottomColor: !cepValido ? "#999" : "#ddd",
                borderBottomWidth: 1,
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: !cepValido ? "#999" : "#CCC",
                colorFocused: !cepValido ? "#999" : "#CCC",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={rua}
              onChangeText={(rua) => setRua(rua)}
              inputStyles={{
                color: "#fff",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
              editable={cepValido}
            />
            <FloatingLabelInput
              label={"Número"}
              containerStyles={{
                borderBottomColor: numeroInvalido
                  ? COLORS.secondary
                  : !cepValido
                  ? "#999"
                  : "#ddd",
                borderBottomWidth: 1,
                marginBottom: "3%",
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: numeroInvalido
                  ? COLORS.secondary
                  : !cepValido
                  ? "#999"
                  : "#ccc",
                colorFocused: numeroInvalido
                  ? COLORS.secondary
                  : !cepValido
                  ? "#999"
                  : "#ccc",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={numero}
              onChangeText={(numero) => {
                setNumero(numero);
                setNumeroInvalido(false);
              }}
              inputStyles={{
                color: "#fff",
                fontSize: 16,
              }}
              selectionColor={numeroInvalido ? COLORS.secondary : "#fff"}
              inputMode="numeric"
              editable={cepValido}
            />
            {numeroInvalido && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  position: "absolute",
                  top: "49.5%",
                  left: "0",
                }}
              >
                <AntDesign
                  name="exclamationcircle"
                  size={13}
                  color={COLORS.secondary}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontFamily: "MontserratAlternates-regular",
                  }}
                >
                  Digite o número para prosseguir
                </Text>
              </View>
            )}
            <FloatingLabelInput
              label={"Complemento (Opcional)"}
              containerStyles={{
                borderBottomColor: !cepValido ? "#999" : "#ccc",
                borderBottomWidth: 1,
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: !cepValido ? "#999" : "#ccc",
                colorFocused: !cepValido ? "#999" : "#ccc",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={complemento}
              onChangeText={(complemento) => setComplemento(complemento)}
              inputStyles={{
                color: "#fff",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
              editable={cepValido}
            />
            <FloatingLabelInput
              label={"Bairro"}
              containerStyles={{
                borderBottomColor: !cepValido ? "#999" : "#ccc",
                borderBottomWidth: 1,
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: !cepValido ? "#999" : "#ccc",
                colorFocused: !cepValido ? "#999" : "#ccc",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={bairro}
              onChangeText={(bairro) => setBairro(bairro)}
              inputStyles={{
                color: "#fff",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
              editable={cepValido}
            />
            <FloatingLabelInput
              label={"Estado"}
              containerStyles={{
                borderBottomColor: "#999",
                borderBottomWidth: 1,
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: "#999",
                colorFocused: "#999",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={estado}
              onChangeText={(estado) => setEstado(estado)}
              inputStyles={{
                color: "#999",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
              editable={false}
            />
            <FloatingLabelInput
              label={"Cidade"}
              containerStyles={{
                borderBottomColor: "#999",
                borderBottomWidth: 1,
                marginTop: "17%",
                color: "#DDD",
                paddingBottom: 10,
                paddingLeft: 0,
              }}
              customLabelStyles={{
                colorBlurred: "#999",
                colorFocused: "#999",
                fontSizeFocused: 12,
                fontSizeBlurred: 16,
                leftBlurred: -1,
              }}
              labelStyles={{
                width: "100%",
                borderColor: "#fff",
                borderWidth: 0,
              }}
              value={cidade}
              onChangeText={(cidade) => setCidade(cidade)}
              inputStyles={{
                color: "#999",
                fontSize: 16,
              }}
              selectionColor={"#fff"}
              editable={false}
            />
          </ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            style={{ backgroundColor: "#181616", zIndex: 10 }}
          >
            <View style={{ paddingTop: 30, backgroundColor: "#181616" }}>
              <Button
                isActive={cepValido && !numeroInvalido}
                onPress={() => {
                  if (numero) {
                    setEnviarEnder(true);
                    setShowCepModal(false);
                  } else {
                    setNumeroInvalido(true);
                  }
                }}
                style={{ marginBottom: "8%", width: "100%" }}
                text="Confirmar"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <Modal
        isVisible={showFotoModal}
        onRequestClose={() => setShowCepModal(false)}
        transparent={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={() => setShowCepModal(false)}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalHide={async () => {
          if (photo) {
            setShowFotoButton(false);
            onSend({
              _id: 29,
              text: "Sucesso",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
            });
            await addMessagesWithDelay([
              {
                _id: 30,
                text: "Qual seu salário ou quanto você recebe por mês? Digite apenas a sua renda mensal, sem considerar o valor de outras pessoas da sua familia.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowInputSalario(true);
          }
        }}
      >
        <CameraModal
          retorno={(photo) => {
            setPhoto(photo);
            setShowFotoModal(false);
          }}
        />
      </Modal>
      <Modal
        isVisible={showModalProposta}
        onRequestClose={() => setShowModalProposta(false)}
        transparent={true}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={() => setShowModalProposta(false)}
        style={{
          margin: 0,
          justifyContent: "flex-end",
        }}
        onModalHide={async () => {
          if (propostaAceita) {
            setShowButtonProposta(false);
            onSend({
              _id: 33,
              text: "Enviando meus dados",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "User",
              },
              botao: (
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: "3%",
                    marginVertical: "10%",
                  }}
                >
                  <ProgressIndicator />
                </View>
              ),
            });
            await sendAPI();
            await addMessagesWithDelay([
              {
                _id: 34,
                text: "Pronto!",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
              {
                _id: 35,
                text: "Vamos analisar essas informações e te responderemos em breve, por e-mail e push no seu celular.",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
              {
                _id: 36,
                text: "Obrigado por escolher SWIFT. 💜",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "Bot",
                },
              },
            ]);
            setShowButtonContinuar(true);
          }
        }}
      >
        <View
          style={{
            display: "flex",
            top: 0,
            flexDirection: "row",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "#181616",
          }}
        >
          <TouchableOpacity
            style={{ zIndex: 10, top: 55, left: 20, position: "absolute" }}
            onPress={() => setShowModalProposta(false)}
          >
            <AntDesign name="left" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView style={{ backgroundColor: "#181616", marginTop: "48%" }}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              PROPOSTA DETALHADA PARA ABERTURA DE CONTA NO BANCO SWIFT S.A. -
              PESSOA FISICA E PROSPECTO DE INFORMAÇÕES ESSENCIAIS DA CONTA
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Prezado(a) Cliente, Estamos muito contentes que você tenha
              escolhido o Banco Swift S.A. para cuidar das suas necessidades
              financeiras. Como parte de nosso compromisso em fornecer um
              serviço transparente e eficiente, apresentamos abaixo uma proposta
              mais detalhada para a abertura de conta:
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              1. Elegibilidade
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Para abrir uma conta no Banco Swift S.A., você deve atender aos
              seguintes requisitos: Ser maior de 18 anos. Ser residente no
              Brasil. Possuir documentação válida.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              2. Documentação Necessária
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Para concluir a abertura da sua conta, você precisará fornecer os
              seguintes documentos: Documento de identificação válido, como RG
              ou CNH. CPF (Cadastro de Pessoa Física). Comprovante de residência
              recente, como conta de luz, água, gás ou telefone.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              3. Processo de Abertura de Conta
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              a. Baixe e instale o aplicativo oficial do Banco Swift S.A. em seu
              dispositivo móvel, disponível nas lojas de aplicativos. b. Siga as
              instruções detalhadas no aplicativo para preencher o formulário de
              inscrição. c. Envie fotos legíveis dos documentos solicitados
              através do aplicativo. d. Após o envio, nossa equipe realizará a
              análise da sua solicitação de abertura de conta, que pode levar
              até 48 horas úteis. e. Uma vez aprovada, você receberá as
              informações de sua conta, incluindo o número da conta e detalhes
              para acesso.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              4. Taxas e Tarifas
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              O Banco Swift S.A. tem o compromisso de proporcionar uma
              experiência financeira acessível. Oferecemos uma conta digital sem
              tarifas mensais de manutenção. No entanto, é importante observar
              que certas transações específicas podem estar sujeitas a tarifas,
              como saques em caixas eletrônicos de terceiros ou transferências
              internacionais. Consulte nossa tabela de tarifas para obter
              informações detalhadas.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              5. Segurança
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Sua segurança é nossa prioridade. Utilizamos medidas avançadas de
              segurança para proteger suas informações pessoais e financeiras.
              Certifique-se de manter suas credenciais de acesso em sigilo e não
              compartilhá-las com terceiros.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              6. Suporte ao Cliente
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Estamos disponíveis 24 horas por dia, 7 dias por semana, para
              atender às suas necessidades. Você pode entrar em contato conosco
              pelo aplicativo, site ou telefone para obter assistência ou
              esclarecimentos.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "MontserratAlternates-SemiBold",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              7. Encerramento de Conta
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Se, por qualquer motivo, desejar encerrar sua conta no Banco Swift
              S.A., entre em contato com nossa equipe de suporte ao cliente.
              Esteja ciente de que podem ser aplicadas taxas de encerramento, e
              é necessário resolver todos os saldos e obrigações pendentes antes
              do encerramento.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Agradecemos por considerar o Banco Swift S.A. como seu parceiro
              financeiro. Ao abrir uma conta conosco, você está concordando com
              os termos e condições detalhados nesta proposta. Estamos aqui para
              ajudá-lo a alcançar seus objetivos financeiros e a tornar sua
              experiência bancária mais simples e eficaz.
            </Text>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "justify",
                fontFamily: "MontserratAlternates-regular",
                paddingHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              Se tiver alguma dúvida adicional ou precisar de esclarecimentos
              adicionais, não hesite em entrar em contato conosco. Bem-vindo ao
              Banco Swift S.A., onde suas finanças estão em boas mãos.
            </Text>
          </ScrollView>
          <View style={{ paddingTop: 30, backgroundColor: "#181616" }}>
            <Button
              onPress={() => {
                setPropostaAceita(true);
                setShowModalProposta(false);
              }}
              style={{ marginBottom: "8%", width: "100%" }}
              text="Li e estou de acordo"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Singup;
