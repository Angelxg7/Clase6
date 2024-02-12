import { ImageBackground, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

const LoadingSpinner = () => {
  return (
    <ImageBackground source={image} style={styles.container}>
            <ActivityIndicator size="large" style={styles.spinner} />
    </ImageBackground>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    spinner:{
        color:"#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    container: {
        flex: 1
      }
})