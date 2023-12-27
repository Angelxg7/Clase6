import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../global/color'

const CartItem = ({item}) => {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.title}</Text>
            <Text style={styles.text2}>{item.brand}</Text>
            <Text style={styles.text2}>$ {item.price}</Text>
        </View>
        <Entypo name="trash" size={24} color="black" />
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.blue2,
        margin: 10,
        padding: 10,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 2,
    },
    textContainer:{
        width: "70%",
        gap: 2,
    },
    text1:{
        fontFamily: "Josefin",
        fontSize: 19,
    },
    text2:{
        fontSize: 17,
    }
})