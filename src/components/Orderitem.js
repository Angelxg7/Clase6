import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../global/color'

const Orderitem = ({order}) => {

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text1}>{order.updateAt}</Text>
            <Text style={styles.text2}>Total: $ {order.total}</Text>
       </View>
       <AntDesign name="caretdown" size={24} color="black" onPress={()=> console.log(order)} />
    </View>
  )
}

export default Orderitem

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.red2,
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