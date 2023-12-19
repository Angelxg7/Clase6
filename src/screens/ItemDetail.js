import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import allProducts from '../data/products.json'
import { useEffect, useState } from 'react'
import { colors } from '../global/color'

const ItemDetail = ({route}) => {
  const {id} = route.params

  const [product, setProduct] = useState ({})
  const images = product.images ? product.images : []

  useEffect(()=> {
    const productFinded = allProducts.find(product => product.id === id)
    setProduct(productFinded)
  },[id])

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
          <Pressable style={styles.Pressable}>
              <Text style={styles.comprar}>Comprar</Text>
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