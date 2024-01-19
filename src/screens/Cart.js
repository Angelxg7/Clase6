import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import { usePostOrdersMutation } from '../app/services/shopServices'

const Cart = () => {
  const cart = useSelector(state => state.cart.value)
  const [triggerPostOrder] = usePostOrdersMutation()

  return (
    <View style={styles.container}>
        <FlatList
            data={cart.items}
            keyExtractor={item => item.id}
            renderItem={({item})=> <CartItem item={item}/>}
        />
        <View style={styles.confirmContainer}>
            <Pressable onPress={()=> triggerPostOrder(cart)}>
                <Text style={styles.text}>Confirmar</Text>
            </Pressable>
            <Text style={styles.text}>Total: $ {cart.total}</Text>
        </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginBottom: 130,
  },
  confirmContainer:{
    backgroundColor: "#444",
    padding: 25,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  text:{
    fontSize: 20,
    color:"#fff",
  }
})