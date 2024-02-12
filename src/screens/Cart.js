import { StyleSheet, FlatList, View, Text, Pressable, ImageBackground, Modal } from 'react-native'
import CartItem from '../components/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { usePostOrdersMutation } from '../app/services/shopServices'
import { clearCart, calculateTotal } from '../features/cart/cartSlice'
import { colors } from '../global/color' 
import { useState, useEffect } from 'react'
import BlankOrder from '../components/BlankOrder'

const Cart = () => {
  const localId = useSelector(state => state.auth.value.localId)
  const cart = useSelector(state => state.cart.value)
  const [triggerPostOrder] = usePostOrdersMutation()

  const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}
  const dispatch = useDispatch()
  const [modalVisible,setModalVisible] = useState(false)

  const handlerCart = (cart) => {
        dispatch(clearCart(cart))
        setModalVisible(false)
  }

  useEffect(()=>{
    dispatch(calculateTotal())
  },[cart])

  if (cart.total === 0) return <BlankOrder label="productos"/>

  return (
    <ImageBackground style={styles.container} source={image} >
        <FlatList
            data={cart.items}
            keyExtractor={item => item.id}
            renderItem={({item})=> <CartItem item={item}/>}
        />
        <View style={styles.confirmContainer}>
            <Pressable onPress={()=> triggerPostOrder({localId, order:cart})}>
                <Text style={styles.text}>Confirmar Compra</Text>
            </Pressable>
            <Text style={styles.text}>Total: $ {cart.total}</Text>
        </View>
        <View style={styles.emptyContainer}>
            <Pressable onPress={()=> setModalVisible(true)}>
                <Text style={styles.text}>Vaciar Carrito</Text>
            </Pressable>
        </View>
        <Modal
            visible={modalVisible}
            transparent={true}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent} >
                <Text style={styles.modalText}>¿Vaciar Carrito?</Text>
                <Pressable style={styles.modalButton} onPress={()=> handlerCart(cart)}>
                    <Text style={styles.modalText} >Vaciar</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={()=> setModalVisible(false)}>
                    <Text style={styles.modalText} >Cancelar</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
    </ImageBackground>
  )
}

export default Cart

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  confirmContainer:{
    backgroundColor: "#444",
    padding: 25,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  emptyContainer: {
    backgroundColor: "#000",
    padding: 5,
    alignItems: "center"
  },
  text:{
    fontSize: 20,
    color:"#fff",
    maxWidth: "70%"
  },
  modalContainer:{
    flex: 1,
    alignItems:"center",
    paddingTop:"30%",
},
  modalContent:{
      backgroundColor:colors.red3,
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
      backgroundColor: "#000",
      borderRadius: 15,
      padding: 10,
      width: "60%"
  }
})