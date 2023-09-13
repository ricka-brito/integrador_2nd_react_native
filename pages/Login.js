import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'


const Login = ({handleClose}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={{
        flex: 0.3, 
        zIndex: 9,
      }}
      onPress={handleClose}
      >
      </TouchableOpacity>  


      <View
      style={styles.content}>
          <TextInput 
          style={styles.input}
          inputMode="numeric"
          autoFocus={true}
          />
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content:{
    marginVertical: 20,
    backgroundColor: COLORS.black,
    flex: 0.7,
    borderRadius: 20
  
  },
  input:{
    backgroundColor: COLORS.white
  }
  
})