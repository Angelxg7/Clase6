import { StyleSheet, Text, Pressable, Image, useWindowDimensions, ImageBackground } from 'react-native'
import { colors } from '../global/color'
import { useDispatch } from 'react-redux'
import { setProductSelected } from '../features/shop/shopSlice'

const ProductItem = ({item, navigation, route}) => {

  const {width} = useWindowDimensions()
  const dispatch = useDispatch()
  const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

  return (
    <ImageBackground source={image}>
    <Pressable style={styles.container} onPress={()=> {
      dispatch(setProductSelected(item.id))
      navigation.navigate ("Product",{id:item.id})
      }}>
        <Text style={width > 350 ? styles.text : styles.textMin}>{item.title}</Text>
        <Image
            style={styles.image}
            resizeMode='cover'
            source={{uri:item.thumbnail}}
        />
    </Pressable>
    </ImageBackground>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container:{
        width:"80%",
        backgroundColor:colors.red1,
        borderWidth: 2,
        borderRadius: 5,
        margin: 10,
        marginHorizontal:"10%",
        padding: 15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        gap: 20,
    },
    image:{
        minWidth: 90,
        minHeight: 90,
        width:"30%",
    },
    text:{
      maxWidth: "60%",
      fontFamily:"Josefin",
      fontSize: 20,
  },
  textMin:{
    fontFamily:"Josefin",
    fontSize: 15,
  }
})