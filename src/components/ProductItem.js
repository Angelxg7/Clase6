import { StyleSheet, Text, Pressable, Image, useWindowDimensions } from 'react-native'
import { colors } from '../global/color'

const ProductItem = ({item, navigation, route}) => {

  const {width} = useWindowDimensions()

  return (
    <Pressable style={styles.container} onPress={()=> navigation.navigate ("Product",{id:item.id})}>
        <Text style={width > 350 ? styles.text : styles.textMin}>{item.title}</Text>
        <Image
            style={styles.image}
            resizeMode='cover'
            source={{uri:item.thumbnail}}
        />
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container:{
        width:"80%",
        backgroundColor:colors.blue2,
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
      fontFamily:"Josefin",
      fontSize: 20,
  },
  textMin:{
    fontFamily:"Josefin",
    fontSize: 15,
  }
})