import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const Orderitem = ({order}) => {
    const total = order.items.reduce((acc,product)=> acc + (product.price * product.quantity),0)

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text1}>{new Date(order.createdAt).toLocaleString()}</Text>
            <Text style={styles.text2}>Total: $ {total}</Text>
       </View>
       <FontAwesome name="search" size={24} color="black" />
    </View>
  )
}

export default Orderitem

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#aee",
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