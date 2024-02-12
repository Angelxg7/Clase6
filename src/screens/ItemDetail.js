import { StyleSheet, Text, View, Image, Pressable, ImageBackground, Modal } from 'react-native'
import { colors } from '../global/color'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'
import { useState } from 'react'

const ItemDetail = ({route}) => {
  const dispatch = useDispatch()
  const product = useSelector((state)=> state.shop.value.productSelected)
  const images = product.images ? product.images : []
  const imageBack = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}
  const [modalVisible,setModalVisible] = useState(false)

  const handlerModal = (product) => {
    setModalVisible(true)
    dispatch(addItem(product))    
}    

  return (
    <ImageBackground style={styles.container} source={imageBack} >
      <Image
        style={styles.image}
        source={{uri:images[1]}}
        resizeMode='cover'
      />
      <View style={styles.textContainer}>
          <Text style={styles.title}>{product.brand}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.description}>Stock disponible: {product.stock}</Text>
      </View>
      <View style={styles.priceContainer}>
          <Text style={styles.price}>$ {product.price}</Text>
          <Pressable style={styles.Pressable} onPress={()=> handlerModal(product)}>
              <Text style={styles.comprar}>Agregar al Carrito</Text>
          </Pressable>
      </View>
      <Modal
          visible={modalVisible}
          transparent={true}
      >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
          <Text style={styles.modalText} >¡Agregado al carrito!</Text>
              <Pressable onPress={()=> setModalVisible(false)} >
                <Text style={styles.title}>Ok</Text>
              </Pressable>
            </View>
        </View>
      </Modal>
    </ImageBackground>
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
      color: "#fff"
    },
    description:{
      fontFamily:"Josefin",
      fontSize: 15,
      color: "#fff"
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
      color: "#fff"
    },
    Pressable:{
      backgroundColor: colors.red2,
      padding: 10,
      borderRadius: 10,
    },
    comprar:{
      fontWeight: "bold",
      color: "#fff"
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
    modalText: {
      fontSize: 20,
      fontWeight: "bold"
    }
})