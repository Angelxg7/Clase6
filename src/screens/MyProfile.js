import { StyleSheet, Image, Text, ImageBackground } from 'react-native'
import AddButton from '../components/AddButton'
import { useGetProfileImageQuery, useGetUserLocationQuery } from '../app/services/shopServices'
import { useSelector } from 'react-redux'

const MyProfile = ({navigation}) => {

    const localId = useSelector(state => state.auth.value.localId)
    const {data} = useGetProfileImageQuery(localId)
    const {data:location} = useGetUserLocationQuery(localId)
 
    const imageBack = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

  return (
    <ImageBackground style={styles.container} source={imageBack} >
        <Image
            source={data ? {uri:data.image} : require("../../assets/user.png")}
            style={styles.image}
            resizeMode='cover'
        />

        <Text style={styles.text}>{location?.address}</Text>

        <AddButton title={"Agregar foto de perfil"} 
        onPress={()=> navigation.navigate("ImageSelector") }/>
        <AddButton title={location ? "Cambiar Ubicación" : "Agregar Ubicación"} 
        onPress={()=> navigation.navigate("LocationSelector") }/>
    </ImageBackground>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
    },
    image:{
        marginTop: 40,
        width: 200,
        height: 200,
    },
    text: {
        color: "#fff",
        fontSize: 20,
        paddingTop: 20
    },
    textInput: {
        width: "50%",
        borderWidth: 1,
        borderColor: "#fff",
        textAlign: "center"
    }
})