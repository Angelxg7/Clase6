import { StyleSheet, Text, View, Button } from 'react-native'
import { colors } from '../global/color'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

const Header = ({title}) => {

  function MyBackButton() {
    const navigation = useNavigation();
  
    return (
      <FontAwesome
        name="arrow-left"
        size={24}
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
        <MyBackButton/>
        <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:colors.blue1,
        width:"100%",
        height: 80,
        justifyContent:"flex-start",
        alignItems:"center",
        gap: 30,
        paddingHorizontal: 20,
    },
    text:{
        fontSize: 35,
        fontFamily:"Lobster"
    }
})