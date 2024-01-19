import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../global/color'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeItem } from '../features/cart/cartSlice'

const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const [modalVisible,setModalVisible] = useState(false)

    const handlerDelete = (item) => {
        dispatch(removeItem(item))
        setModalVisible(false)
    }    

  return (
    <>
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.title}</Text>
            <Text style={styles.text2}>{item.brand}</Text>
            <Text style={styles.text2}>Cantidad: {item.quantity} Precio: $ {item.price}</Text>
        </View>
        <Entypo name="trash" size={24} color="black" onPress={()=> setModalVisible(true)}/>
    </View>
    <Modal
        visible={modalVisible}
    >
    <View style={styles.modalContainer}>
        <View style={styles.modalContent} >
            <Text style={styles.modalText}>¿Eliminar Producto?</Text>
            <Button title='Eliminar' onPress={()=> handlerDelete(item)}/>
            <Button title="Cancelar" onPress={()=> setModalVisible(false)}/>
        </View>
    </View>
    </Modal>
    </>
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
    },
    modalContainer:{
        flex: 1,
        alignItems:"center",
        paddingTop:"30%",
    },
    modalContent:{
        backgroundColor:colors.blue1,
        width:"80%",
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        gap: 10,
    },
    modalText:{
        textAlign:"center",
    }
})