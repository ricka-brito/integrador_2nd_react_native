import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import MaskInput from 'react-native-mask-input';
import Modal from "react-native-modal";
import GradientIcon from '../components/GradientIcon';
import Header from '../components/Header';
import GradientText from '../components/gradientText';
import COLORS from '../constants/colors';
import { FloatingLabelInput } from "react-native-floating-label-input";
import Button from "../components/Button";
import { API_URL } from "../constants/utils";
import useTokenStore from "../tokenStore";

const Transference = ({navigation}) => {
    const { token, setToken } = useTokenStore(); // Access the token and setToken function from the store

    const [visibleModal, setVisibleModal] = useState(false)
    const [id, setId] = useState()
    const [valor, setValor] = useState()
    const [descricao, setDescricao] = useState()

    const options = [
        {
            icon: 'https://i.ibb.co/L6RksD1/Pix.png',
            nome: 'PIX'
        },
        {
            icon: 'https://i.ibb.co/DGcJV2b/Transf.png',
            nome: 'Conta Swift'
        },
        {
            icon: 'https://i.ibb.co/0MVv3KD/Interbank.png',
            nome: 'Outros bancos'
        },

        
    ]

    return (
        <>
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
                        marginTop: '5%', textAlign: 'center'}}>Digite o id da conta destino e o valor a ser transferido</Text>
            <FloatingLabelInput
                keyboardType="numeric"
                label={"Id"}
                containerStyles={{
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    marginTop: "8%",
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
                value={id}
                onChangeText={(id) => setId(id)}
                inputStyles={{
                    color: "#fff",
                    fontSize: 16,
                }}
                selectionColor={"#fff"}
            />
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
                onChangeText={(valor) => setValor(valor)}
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
                }).then(response => response.json()).then(data => {Alert.alert("Transferido")}).catch(e => Alert.alert("Não foi possivel concluir a transação, saldo insuficiente ou conta inexistente"))
                console.log(valor)
                }}/>
            </View>
        </View>

      </Modal>
        <View style={{flex: 1, backgroundColor: COLORS.black}}>
        <Header name={"Transferir"} navigation={navigation}/>
        <View style={{marginHorizontal: '4%', borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1, marginTop: "35%",}}>
            <Text
                    style={{
                        fontFamily: 'MontserratAlternates-Light', 
                        fontSize: 20, 
                        color: "#fff", 
                        marginBottom: '5%'
                    }}
                >
                Nova transferencia
                </Text>
        </View>
        <FlatList
            scrollEnabled={false}
            data={options}
            style={{marginHorizontal: "4%", marginTop: "7%"}}
            numColumns={3}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={{width: 50, marginHorizontal: "3%",  display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} onPress={() => setVisibleModal(true)}>
                    <View style={{width: 60, height: 60, display: 'flex', backgroundColor: "rgba(49,49,49,0.78)", alignItems: 'center', justifyContent: 'center'}}>
                        <Image resizeMode="contain" style={{ width: 35, height: 35}} source={{uri: item.icon}}/>
                    </View>
                    <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 12, marginTop: "7%", textAlign: 'center'}}>{item.nome}</Text>
                </TouchableOpacity>
                )
            }}
        />
        <View style={{marginHorizontal: '4%', borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1, marginTop: "5%", flex: 11, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
                    style={{
                        fontFamily: 'MontserratAlternates-Light', 
                        fontSize: 20, 
                        color: "#fff", 
                        marginBottom: '5%'
                    }}
                >
                Meus contatos
            </Text>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row'}}>
                <GradientText style={{fontFamily: 'MontserratAlternates-Light', 
                            fontSize: 20}}>Adicionar</GradientText>
                           <GradientIcon name="adduser" 
                                size={22}/> 
            </TouchableOpacity>

        </View>
        </View>
        </>
    )
}

export default Transference