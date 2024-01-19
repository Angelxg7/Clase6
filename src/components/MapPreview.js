import { StyleSheet, Image } from 'react-native'
import { googleApi } from '../firebase/googleApi'

const MapPreview = ({latitude,longitude}) => {

    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
    &zoom=12&
    &size=300x300
    &maptype=roadmap
    &markers=color:red%7Clabel:C%7C${latitude},${longitude}
    &key=${googleApi.mapStatic}`

  return (
      <Image style={styles.image} source={latitude ? {uri:mapPreviewUrl} : require("../../assets/map.png")} />
  )
}

export default MapPreview

const styles = StyleSheet.create({
    image:{
        width: 300,
        height: 300
    }
})