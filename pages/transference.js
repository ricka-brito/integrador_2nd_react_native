import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import COLORS from '../constants/colors'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../components/gradientText';
import GradientIcon from '../components/GradientIcon';
import QRCode from 'react-native-qrcode-svg';
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import Input from '../components/Input';

const Transference = ({navigation}) => {

    const [visibleModal, setVisibleModal] = useState(false)

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
            backgroundColor: "rgba(49,49,49, 1)",
            flex: 0.87,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            display: 'flex',
            flexDirection: 'column'
          }}
        > 
                <AntDesign name="close" size={21} color="#fff" onPress={() => setVisibleModal(false)} />
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