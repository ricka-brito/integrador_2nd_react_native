import { View, Text, Image, ImageBackground, SafeAreaView, TextInput, StatusBar, Switch} from 'react-native'
import React, { useCallback, useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../constants/colors'
import Font, {useFonts} from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Shadow } from 'react-native-shadow-2';
import * as SplashScreen from 'expo-splash-screen';
import Login from './Login';
import Modal from "react-native-modal";
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

const Welcome = ({ navigation }) => {

    function formataCPF(cpf){
        setCpfColor(COLORS.white)
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
                setCpfColor(COLORS.secondary)
            }
            return cpf2.slice(0, 3) + "."  + cpf2.slice(3, 6) + "." + cpf2.slice(6, 9) + "-" + cpf2.slice(9, 11)
        }
        else return cpf
    }


    const [fontsLoaded, fontError] = useFonts({
        'MontserratAlternates-SemiBold': require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
        'MontserratAlternates-thin': require('../assets/fonts/MontserratAlternates-Thin.ttf'),
        'MontserratAlternates-regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    });

    const [visibleModal, setVisibleModal] = useState(false);
    const [cpf, setCpf] = useState("");
    const [cpfColor, setCpfColor] = useState("#fff");
    const refInput = useRef(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    return (
        <View  
        style={{
            flex:1, 
            backgroundColor: "#000",
            alignItems: 'center',
            padding: 0
        }}
        onLayout={onLayoutRootView}
        >
            <Image
                source={require("../assets/r-l-e2jMoCvoKY4-unsplash.jpg")} 
                style={{
                    justifyContent: 'center',
                    resizeMode: 'cover',
                    height: "65%",
                    width: "100%",
                }}
            />
            <Image
                    source={require("../assets/logo.png")}
                    style={{
                        height: "10%",
                        width:"80%",
                        position: 'absolute',
                        top: "48%",
                        left:"10%",
                        resizeMode: "contain"

                    }}
            />
            <Shadow
            distance={50}
            sides={'top'}
            startColor={"#000"}>
                <View style={{
                    alignItems: 'center',
                    flex: 1
                }}>
                <Text
                    style={{
                        marginTop: "5%",
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-thin",
                        fontSize: 45,
                        textAlign: 'center',
                        width: "80%"
                    }}
                >
                    Faça parte do
                    <Text
                        style={{
                            fontFamily: "MontserratAlternates-regular"
                        }}
                    > futuro
                    </Text>
                </Text>
                    <TouchableOpacity
                        style={{
                            marginTop:"6%",
                            width: "80%",
                            padding: 15,
                            borderRadius: 10,
                            borderColor: COLORS.white,
                            borderWidth:  2,
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text 
                            style={{
                                color: COLORS.black,
                                textAlign: 'center',
                                fontFamily: 'MontserratAlternates-SemiBold',
                                fontSize: 18
                            }}
                        >
                            Comece agora
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setVisibleModal(true)}
                    >
                        <Text
                            style={{
                                color: COLORS.grey,
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontSize: 12,
                                marginTop: "10%"
                            }}
                        >
                            ja tem uma conta?
                        </Text>
                    </TouchableOpacity>

                </View>
            </Shadow>

            <Modal
                isVisible={visibleModal}
                onRequestClose={() => setVisibleModal(false)}
                transparent={true}
                animationType="slide"
                onBackdropPress={() => setVisibleModal(false)}
                style={{
                    margin:0,
                    justifyContent: 'flex-end'
                }}
                onModalShow={() => refInput.current.focus()}
                onModalWillHide={() => refInput.current.blur()}
            >
                <View style={{
                    backgroundColor: "#181616",
                    flex: 0.67,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "4%",
                }}>
                    <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: "MontserratAlternates-regular",
                        fontSize: 22,
                        marginBottom: "13%",
                        marginTop: "5%"
                    }}
                    >
                        Digite seu CPF
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TextInput 
                            inputMode="numeric"
                            ref={refInput}
                            editable={true}
                            style={{
                                fontSize: 35,
                            }}
                            color={cpfColor}
                            maxLength={14}
                            onChangeText={(cpf) => setCpf(formataCPF(cpf))}
                            value={cpf}
                            selectionColor={'#fff'}
                        />
                        <TouchableOpacity
                            activeOpacity={0.1}
                            onPress={() => {setCpf(""); setCpfColor(COLORS.white)}}
                        > 
                            <AntDesign name="closecircle" size={22} color='#666'/>
                        </TouchableOpacity>
                    </View>
                    {(() => { if (cpfColor == COLORS.secondary) {
                       return ( 
                       <View 
                            style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    top: "26.5%",
                                    left: "5%"
                                    }}  
                        >
                        <AntDesign name="exclamationcircle" size={13} color={COLORS.secondary} style={{marginRight: 10}}/>
                        <Text style={{color: COLORS.secondary, fontFamily: "MontserratAlternates-regular"}}>CPF inválido</Text>
                    </View>)}
                    }
                    )()}
                    <View  
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '10%', 
                            justifyContent: 'space-between',
                            alignItems: 'center' 
                        }}
                        
                    >
                    <Text
                        style={{
                            color: COLORS.grey,
                            fontFamily: "MontserratAlternates-regular"
                        }}

                    >Lembrar CPF
                    </Text>
                    <Switch
                    trackColor={{false: '#767577', true: COLORS.primary}}
                    thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
                    </View>
                    <TouchableOpacity style={{width: "90%", height: 45}}>
                        <LinearGradient start={{x: 0.0, y: 0.95}} end={{x: 0.8, y: 1.0}} colors={[ COLORS.secondary, COLORS.primary]} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>aaaa</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View >

    )
}

export default Welcome