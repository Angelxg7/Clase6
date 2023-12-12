import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/color'
import { FontAwesome } from '@expo/vector-icons'

const Header = ({title = "Producto"}) => {

  return (
    <View style={styles.container}>
      <Pressable>
          <FontAwesome name="home" size={24} color="black" />
      </Pressable>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:colors.blue1,
        width:"100%",
        height: 80,
        justifyContent:"center",
        alignItems:"center",
        gap: 20
    },
    text:{
        fontSize: 30,
        fontFamily:"Lobster"
    }
})