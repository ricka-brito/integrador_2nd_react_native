import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Camera, CameraType} from "expo-camera";
import { useEffect } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import CameraOverlay from "./cameraOverlay";
import axios from "axios";
import Button from './Button'
import GradientIcon from "./GradientIcon";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default function CameraModal(props) {


    const {retorno} = props
    const cameraRef = useRef(null)
    const [takingPicture, setTakingPicture] = useState(false);
    const [photo, setPhoto] = useState();


    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        requestPermission();
        
    }, [])
    
    if(!permission?.granted){
        return;
    }

    async function takepicture() {
      let newphoto = await cameraRef.current.takePictureAsync({quality: 1, base64: true, isImageMirror:true});

      newphoto = await manipulateAsync(
      newphoto.localUri || newphoto.uri,
        [
            { rotate: 180 },
            { flip: FlipType.Vertical },
        ],
        { compress: 1, format: SaveFormat.PNG }
    );

      setPhoto(newphoto)
      setTakingPicture(true)

    }

    return (
        <View
        style={{
          backgroundColor: "#181616",
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: "0%",
          paddingTop: 0
        }}
      >
        <View style={{ display: "flex", top: 0, flexDirection: "row", zIndex: 2, position: 'absolute'}}>
          <TouchableOpacity
            style={{marginTop: "12%", marginLeft: "5%", marginRight: "-10%", zIndex: 10 }}
            onPress={event => retorno(photo)}
          >
            <AntDesign name="left" size={25} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: "MontserratAlternates-SemiBold",
              fontSize: 16,
              marginTop: "13.5%",
              flex: 1,
              textAlign: "center",
            }}
          >
            Foto para validação facial
          </Text>
        </View>
        <Camera 
            ref={cameraRef}
            style={{flex: 1, position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, bottom: 0}}
            type={CameraType.front}
        />
        <CameraOverlay/>
        <TouchableOpacity style={{position: 'absolute', bottom: "30.5%", backgroundColor: 'rgb(236, 236, 236)', borderRadius: "50%", width: 85, height: 85, alignItems: 'center', justifyContent: 'center', display: 'flex', left: "50%", transform: [
          {translateX: -42.5}
        ]}}
        onPress={() => {takepicture()}}
        >
          <GradientIcon 
          name="face-recognition"
          start={{x: 0.0, y:0}} 
          end={{x: 0.3, y: 1.0}} 
          colors={[COLORS.primary, COLORS.secondary]}
          size={45}
          />
        </TouchableOpacity>
        <Text
        style={{color: COLORS.black,
          fontFamily: "MontserratAlternates-regular",
          fontSize: 16,
          marginTop: "60%",
          flex: 1,
          textAlign: "center",}}
        >Clique para capturar a foto</Text>
        {takingPicture && <View style={{position: 'absolute', backgroundColor: "white", width: "100%", height: "100%", zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: "center"}}>
        
        <View style={{ display: "flex", top: 0, flexDirection: "row", zIndex: 2, position: 'absolute'}}>
          <TouchableOpacity
            style={{marginTop: "13%", marginLeft: "5%", marginRight: "-10%", zIndex: 10 }}
            onPress={() => setTakingPicture(false)}
          >
            <AntDesign name="close" size={25} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: "MontserratAlternates-SemiBold",
              fontSize: 16,
              marginTop: "13.5%",
              flex: 1,
              textAlign: "center",
            }}
          >
            Tirar outra foto
          </Text>
        </View>
        <Image
        style={{width: "100%", height: "100%"}}
        source={{uri: photo.uri}}
        />
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            flex: 0.33,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "4%",
            alignItems: "center",
            position: 'absolute',
            bottom: 0,
            paddingBottom: "10%"
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 22,
              marginBottom: "6%",
              marginTop: "5%",
              textAlign: "center",
            }}
          >
            Tirar outra foto?
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: "MontserratAlternates-regular",
              fontSize: 12,
              marginBottom: "6%",
              textAlign: "center",
            }}
          >
            Você pode tentar novamente quantas vezes quiser.
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
              onPress={event => retorno(photo)}
              text="Sim"
              colors={[]}
              style={{
                width: "45%",
                height: 55,
                borderColor: "#000",
                borderRadius: 10,
                borderWidth: 1,
              }}
              color= "#000"
            />
            <Button
              onPress={async () => {
                setTakingPicture(false);
              }}
              text="Não"
              style={{ width: "45%", height: 55 }}
            />
          </View>
        </View>
          
          </View>}

      </View>
    )
}