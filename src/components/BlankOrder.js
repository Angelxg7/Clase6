import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { colors } from '../global/color'

const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

const BlankOrder = ({label}) => {

  return (    
        <ImageBackground source={image} style={styles.container}>
                <View style={styles.orderNull}>
                  <Text style={styles.orderText}>No hay {label} para mostrar</Text>
                </View>
        </ImageBackground>
  )
}

export default BlankOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        paddingTop:"30%",
      },
    orderNull:{
        backgroundColor:colors.red2,
        width:"80%",
        height: 100,
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    orderText:{
        textAlign:"center",
        color: "#fff",
        fontSize: 18
    }
})