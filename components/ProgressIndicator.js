import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import * as Progress from 'react-native-progress';
import COLORS from "../constants/colors";


export default function ProgressIndicator() {

    const [progresso, setProgresso] = useState(0);
    const [ativo, setAtivo] = useState(true)

    useEffect(() => {
        let progress = 0;
        setProgresso(progress);
        setTimeout(() => {
            setAtivo(false);
          setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
              progress = 1;
            }
            setProgresso(progress);
          }, 500);
        }, 1000);
    }, [])
    return (
        <Progress.Bar indeterminate={ativo} width={null} progress={progresso} height={8} borderRadius={7} color={COLORS.primary}/> 
    )
}