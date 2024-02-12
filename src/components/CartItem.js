import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../global/color'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, increase, decrease } from '../features/cart/cartSlice'

const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const [modalVisible,setModalVisible] = useState(false)
    const product = useSelector((state)=> state.shop.value.productSelected)

    const handlerDelete = (item) => {
        dispatch(removeItem(item))
        setModalVisible(false)
    }    

  return (
    <>
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.brand}</Text>
            <Text style={styles.text1}>{item.title}</Text>
            <Text style={styles.text2}>Precio: $ {item.price} Cantidad: {item.quantity}</Text>
        </View>
        <View style={styles.arrows}>
            <Entypo name="chevron-up" size={24} color="black" onPress={()=> 
             dispatch(increase(product))}/>
            <Entypo name="chevron-down" size={24} color="black" onPress={()=> 
            {if (item.quantity === 1) {
                setModalVisible(true);
                return;
            }            
            dispatch(decrease(product))}}
             />
        </View>
        <Entypo name="trash" size={24} color="black" onPress={()=> setModalVisible(true)}/>
    </View>
    <Modal
        visible={modalVisible}
        transparent={true}
    >
    <View style={styles.modalContainer}>
        <View style={styles.modalContent} >
            <Text style={styles.modalText}>¿Eliminar Producto?</Text>
            <Pressable style={styles.modalButton} onPress={()=> handlerDelete(item)}>
                <Text style={styles.modalText} >Eliminar</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={()=> setModalVisible(false)}>
                <Text style={styles.modalText} >Cancelar</Text>
            </Pressable>
        </View>
    </View>
    </Modal>
    </>
  )
}

export default CartItem

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
    },
    arrows:{
        gap: 12
    },
    modalContainer:{
        flex: 1,
        alignItems:"center",
        paddingTop:"30%",
    },
    modalContent:{
        backgroundColor:colors.red2,
        width:"80%",
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        gap: 10,
        alignItems: "center"
    },
    modalText:{
        textAlign:"center",
        color: "#fff",
        fontSize: 18
    },
    modalButton: {
        backgroundColor: colors.red3,
        borderRadius: 15,
        padding: 10,
        width: "60%"
    }
})