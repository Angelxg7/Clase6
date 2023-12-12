import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/color'

const ProductItem = ({item}) => {
  return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            resizeMode='cover'
            source={{uri:item.thumbnail}}
        />
        <Text style={styles.text}>{item.title}</Text>
    </View>
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
        justifyContent:"start",
        gap: 20,
    },
    image:{
        width:50,
        height:50
    },
    text:{
      fontFamily:"Josefin",
      fontSize: 20
  }
})