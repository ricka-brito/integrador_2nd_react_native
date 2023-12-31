import {ImageBackground, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from "@expo/vector-icons";
import DraggableSheet from '../components/draggableSheet';
import Transaction from "../components/transaction";
import useTokenStore from "../tokenStore";
import { API_URL } from "../constants/utils";


export default function Home({navigation}) {
    const { token, setToken } = useTokenStore(); // Access the token and setToken function from the store
    const [name, setName] = useState();
    const [balance, setBalance] = useState();
    const [balanceCents, setBalanceCents] = useState();
    const [statement, setStatement] = useState();
    const [accountNum, setAccountNum] = useState();

    useEffect(() => {
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
            
            setAccountNum(data.account.number)
            setName(data.first_name)
            setBalance(String(data.account.balance).split('.')[0])
            setBalanceCents(String(data.account.balance).split('.')[1])
        })

        fetch(`${API_URL}/api/v1/accounts/statement/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.access}`
          },
    }).then(response => response.json()).then(data => {
        
        const transactions = data.results.map(item => ({
            nome: item.transaction_type == "DP" ? "Deposito" : item.transaction_type == "CR" ? `Compra ${item.card.number.slice(0, 4)} ${item.description}` : item.description,
            valor: item.transaction_type == "TR" ? accountNum == item.sender.number ? Number(item.value)*-1  : Number(item.value) : Number(item.value),
            data: new Date(item.created_at),
            pago: '',
            tipo: item.transaction_type == "TR" ? accountNum == item.sender.number && item.transaction_type == "TR" ? "TR-P" : item.transaction_type : item.transaction_type
          }));
        setStatement(transactions)
    }
    )
        

    },[])

    const buttons = [
        { 
            icon: 'https://i.ibb.co/qWhKsyh/card.png',
            desc: 'Cartões',
            onPress: () => {}
        },
        {
            icon: 'https://i.ibb.co/8sG13XC/code.png',
            desc: 'Pagar',
            onPress: () => {navigation.navigate("Pay")}
        },
        {
            icon: 'https://i.ibb.co/QHnvYZR/trocar.png',
            desc: 'Transferir',
            onPress: () => {navigation.navigate("Transference")}
        },
        {
            icon: 'https://i.ibb.co/YBHF6V6/savings-FILL0-wght300-GRAD0-opsz48-1-1.png',
            desc: 'Receber',
            onPress: () => {navigation.navigate("Pix")}
        },
        {
            icon: 'https://i.ibb.co/HPYtq1b/dots.png',
            desc: 'Ver todos',
            onPress: () => {}
        }
    ]

    

    // const transactions = [
    //     {
    //         nome: 'Transferencia - PIX',
    //         valor: 10.00,
    //         pago: '',
    //         data: new Date(2023, 9, 26, 11, 55),
    //         tipo: 'transferencia',
    //     },
    //     {
    //         nome: 'Pagamento cartão',
    //         valor: -523.00,
    //         pago: 'Pago',
    //         data: new Date(2023, 9, 25, 10, 55),
    //         tipo: 'subir',
    //     },
    //     {
    //         nome: 'Compra 8873 *UBERX',
    //         valor: 12.00,
    //         pago: '+R$ 0,12',
    //         data: new Date(2023, 9, 25, 10, 55),
    //         tipo: 'pagar',
    //     },
    //     {
    //         nome: 'Compra 8873 *UBERX',
    //         valor: 12.00,
    //         pago: '+R$ 0,12',
    //         data: new Date(2023, 9, 25, 10, 55),
    //         tipo: 'pagar'
    //     },
    //     {
    //         nome: 'Compra 8873 *UBERX',
    //         valor: 12.00,
    //         pago: '+R$ 0,12',
    //         data: new Date(2023, 9, 25, 10, 55),
    //         tipo: 'pagar'
    //     },
    //     {
    //         nome: 'Compra 8873 *UBERX',
    //         valor: 12.00,
    //         pago: '+R$ 0,12',
    //         data: new Date(2023, 9, 25, 10, 55),
    //         tipo: 'pagar'
    //     },
    // ]
    
    return (
        <View style={{backgroundColor: "#000", flex: 1, display: 'flex', justifyContent: 'center'}}>
            <ImageBackground source={require("../assets/background_home.png")} style={{flex: 1, display: 'flex', alignItems: 'center'}}resizeMode="cover">
                <View style={{ width: "85%", marginTop: "18%", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{fontFamily: 'MontserratAlternates-Light', fontSize: 27, color: "#fff"}}>{new Date().getHours() > 18  && new Date().getHours() < 24 ? "boa noite" : new Date().getHours() > 4 && new Date().getHours() < 12 ? "bom dia" : "boa tarde" },</Text>
                        <Text style={{fontFamily: 'MontserratAlternates-Bold', fontSize: 29, color: "#fff"}}>{name}</Text>
                    </View>
                    <View style={{display:'flex', flexDirection: 'row', alignItems: 'center', width: "29%", justifyContent: "space-between"}}>
                        <Image resizeMode="contain" style={{ width: 25, height: 25}} source={{uri: "https://i.ibb.co/V2wqfky/notifications-FILL1-wght400-GRAD0-opsz48-1.png"}}/>
                        <Image resizeMode="contain" style={{ width: 50, height: 50}} source={{uri: "https://i.ibb.co/Tq1wVzS/person.png"}}/>
                    </View>
                </View>
                <View style={{borderColor: "rgba(255, 255, 255, 0.1)",borderWidth: 1, borderRadius: 16, marginTop: "11%", backgroundColor: "rgba(49,49,49,0.68)", width: "85%", height: "30%"}}>
                    <View style={{flex: 0.65, display: 'flex', alignItems: 'center'}}>
                        <View style={{width: "87%"}}>
                            <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23, letterSpacing: 0.4, marginTop: "10%"}}>
                                Conta corrente
                            </Text>
                            <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "rgba(255, 255, 255, 0.58)", fontSize: 12, marginTop: "10%"}}>
                                Saldo em reais
                            </Text>
                            <View style={{width: "100%", marginTop: "2%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>
                                    <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "rgba(255, 255, 255, 0.58)", fontSize: 12, marginBottom: "1%", marginRight: "2%"}}>
                                        R$
                                    </Text>
                                    <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23}}>
                                        {balance},
                                    </Text>
                                    <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 14, marginBottom: "1.3%"}}>
                                        {balanceCents}
                                    </Text>
                                </View>
                                <AntDesign name="right" size={21} color="#ddd" />
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 0.35, borderTopColor: "rgba(255, 255, 255, 0.2)", borderTopWidth: 1, display: 'flex', alignItems: 'center'}}>
                        <View style={{width: '87%'}}>
                            <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "rgba(255, 255, 255, 0.58)", fontSize: 12, marginTop: "6%"}}>
                                    Total da fatura em reais    
                                </Text>
                                <View style={{width: "100%", marginTop: "2%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>
                                        <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "rgba(255, 255, 255, 0.58)", fontSize: 12, marginBottom: "1%", marginRight: "2%"}}>
                                            R$
                                        </Text>
                                        <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 23}}>
                                            212,
                                        </Text>
                                        <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 14, marginBottom: "1.3%"}}>
                                            57
                                        </Text>
                                        {/* <View style={{width: "20%", paddingVertical: "1.8%", backgroundColor: "rgba(125, 220, 123, 0.21)", borderRadius: 4, display: 'flex', alignItems: 'center', marginLeft: "4%"}}>
                                            <Text style={{color: "#5CC25C"}}>
                                                +5,21%
                                            </Text>  
                                        </View> */}
                                    </View>
                                    <AntDesign name="right" size={21} color="#ddd" />
                                </View>
                        </View>
                    </View>
                </View>
                <FlatList 
                scrollEnabled={false}
                data={buttons} 
                style={{flex: 5, marginHorizontal: 'auto', width: "85%", marginTop: "10%"}}
                numColumns={5} 
                renderItem={({ item }) => {
                    return (
                            <TouchableOpacity style={{width: '20%', margin: 0, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onPress={item.onPress}>
                                <View style={{padding: 9, borderRadius: 10, backgroundColor: "rgba(49,49,49,0.78)"}}>
                                    <Image resizeMode="contain" style={{ width: 35, height: 35}} source={{uri: item.icon}}/>
                                </View>
                                <Text style={{fontFamily: 'MontserratAlternates-Medium', color: "#fff", fontSize: 12, marginTop: "7C%"}}>{item.desc}</Text>
                            </TouchableOpacity>
                    )
                }}/>
                <DraggableSheet>
                    <FlatList
                    data={statement}
                    numColumns={1}
                    renderItem={({item}) => {
                        return (
                            <Transaction nome={item.nome} valor={item.valor} data={item.data} tipo={item.tipo} pago={item.pago}/>
                        )
                    }}
                    />
                </DraggableSheet>
            </ImageBackground>
        </View>
  )
}