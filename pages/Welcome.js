import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../constants/colors'
import * as Font from 'expo-font';
import { Button } from 'react-native-web'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useFonts from '../hooks/useFonts';
import AppLoading from 'expo-app-loading';
import { Shadow } from 'react-native-shadow-2';



const Welcome = ({ navigation }) => {
    const [IsReady, SetIsReady] = useState(false);

    const LoadFonts = async () => {
        await useFonts();
      };

    if (!IsReady) {
    return (
        <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
        />
    );
    }

    return (
        <View style={{
            flex:1, 
            backgroundColor: "#000",
            alignItems: 'center',
        }}>
            <Image
                source={require("../assets/r-l-e2jMoCvoKY4-unsplash.jpg")} 
                style={{
                    justifyContent: 'center',
                    resizeMode: 'cover',
                    height: "65%",
                    width: "100%"
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
                    <TouchableOpacity>
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
        </View>

    )
}

export default Welcome