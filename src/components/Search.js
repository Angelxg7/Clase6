import { StyleSheet, View, Pressable, TextInput, Text } from 'react-native'
import { colors } from '../global/color'
import { FontAwesome, Feather } from '@expo/vector-icons'
import { useState } from 'react'

const Search = ({setKeyword}) => {

  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const seach = () =>{
      const expression = /.*[0-9].*/
      if(expression.test(input)){
      setError("No debe contener números")
      } else {
        setKeyword(input)
      }
  }

  const removeItem = () => {
      setInput("")
      setError("")
  }

  return (
    <View style={styles.container}>
          <View style={styles.inputContainer}>
                  <TextInput style={styles.input} placeholder='Buscar Producto' value={input} onChangeText={(t)=> setInput(t)}/>
                  <Pressable onPress={seach}>
                  <FontAwesome name="search" size={24} color="black" />
                  </Pressable>
                  <Pressable onPress={removeItem}>
                  <Feather name="x-octagon" size={24} color="black" />
                  </Pressable>
          </View>
          {error ? <Text style={styles.errorInput}>{error}</Text> : null}
    </View>
   
  )
}

export default Search

const styles = StyleSheet.create({
      container:{
        backgroundColor:colors.blue1,
        width:"100%",
      },
      inputContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
      },
      input:{
        width:"70%",
        backgroundColor:"#ccc",
        borderWidth:2,
        borderRadius:5,
        paddingHorizontal:10,
        paddingVertical:5,
        margin:10,
      },
      errorInput:{
        color:"#e00",
        paddingHorizontal: 10,
      }
})