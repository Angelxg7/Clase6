import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const TabIcon = ({icon,label,focused}) => {
  return (
    <View style={styles.container}>
      <Entypo name={icon} size={30} color={focused ? "white" : "#aaa"}/>
      <Text style={{...styles.text,...{color:focused ? "white" : "#ccc"}}}>{label}</Text>
    </View>
  )
}

export default TabIcon

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        gap: 5,
    },
    text:{
        color:"white"
    }
})