import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Camera, CameraType} from "expo-camera";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import CameraOverlay from "./cameraOverlay";
import * as FaceDetector from 'expo-face-detector';


export default function CameraModal(props) {

    const handleFacesDetected = ({faces}) => {
      confirm.log(faces)
    }

    const {retorno} = props

    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        requestPermission();
    }, [])
    
    if(!permission?.granted){
        return;
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
            onPress={retorno}
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
            style={{flex: 1, position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, bottom: 0}}
            type={CameraType.front}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
        />
        <CameraOverlay/>
          
      </View>
    )
}