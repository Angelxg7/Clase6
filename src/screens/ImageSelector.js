import { useEffect, useState } from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import AddButton from '../components/AddButton'
import * as ImagePicker from 'expo-image-picker'
import { usePostProfileImageMutation } from '../app/services/shopServices'
import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../app/services/shopServices'

const ImageSelector = ({navigation}) => {

    const [image,setImage] = useState("")
    const [triggerProfileImage,{isError,error}] = usePostProfileImageMutation()
    const localId = useSelector(state => state.auth.value.localId)
    const {data,isSuccess} = useGetProfileImageQuery(localId)
    const imageBack = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

    useEffect(()=>{
        if(isSuccess && data) setImage(data.image)
    },[isSuccess])

    const pickImage = async ()=> {
        const {granted} =  await ImagePicker.requestCameraPermissionsAsync()
        if(granted){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
                base64: true
              })
         
              if (!result.canceled) {
                setImage('data:image/jpeg;base64,'+ result.assets[0].base64)
              }
        }
    }

    const confirmImage = ()=> {
        triggerProfileImage({localId,image})
        navigation.goBack()
    }

  return (
    <ImageBackground style={styles.container} source={imageBack} >
        <Image
            source={image ? {uri: image} :
        require("../../assets/user.png")}
            style={styles.image}
            resizeMode='cover'
        />
        <AddButton title={"Tome una foto"} onPress={pickImage}/>
        <AddButton title={"Confirmar foto"} onPress={confirmImage}/>
    </ImageBackground>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
    },
    image:{
        marginTop: 40,
        width: 200,
        height: 200
    }
})