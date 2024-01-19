import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../global/color'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

const ItemDetail = ({route}) => {
  const dispatch = useDispatch()
  const product = useSelector((state)=> state.shop.value.productSelected)
  const images = product.images ? product.images : []

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri:images[1]}}
        resizeMode='cover'
      />
      <View style={styles.textContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.priceContainer}>
          <Text style={styles.price}>$ {product.price}</Text>
          <Pressable style={styles.Pressable} onPress={()=> dispatch(addItem(product)) }>
              <Text style={styles.comprar}>Agregar al Carrito</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
    container:{
        width:"100%",
        flex: 1,
        justifyContent:"start",
    },
    image:{
      width:"100%",
      height: 300,
      objectFit: "fill",
    },
    return:{
      flexDirection: 'row',
      width: "100%",
      backgroundColor: colors.blue1,
      justifyContent: "flex-start",
      gap: 20,
      paddingHorizontal: 20,
    },
    textContainer:{
      padding: 10,
      gap: 5,
    },
    title:{
      fontSize: 20,
      fontWeight: "bold",
    },
    description:{
      fontFamily:"Josefin",
      fontSize: 15,
    },
    priceContainer:{
      flexDirection:"row",
      justifyContent:"flex-end",
      alignItems:"center",
      padding: 20,
      gap: 20,
    },
    price:{
      fontSize: 20,
    },
    Pressable:{
      backgroundColor: colors.blue1,
      padding: 10,
      borderRadius: 10,
    },
    comprar:{
      fontWeight: "bold",
    }
})