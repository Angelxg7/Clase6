import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/color'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { deleteAllSession } from '../database'
import { useSelector, useDispatch } from 'react-redux'
import { cleanUser } from '../features/auth/authSlice'

const Header = ({title}) => {

  const localId = useSelector(state => state.auth.value.localId)

  const dispatch = useDispatch()

  const onLogout = ()=> {
    deleteAllSession().then(result => console.log(result))
    dispatch(cleanUser())
  }

  function MyBackButton() {
    const navigation = useNavigation();
  
  if (title !== "Categorías") return (
      <FontAwesome
        name="arrow-left"
        size={24}
        onPress={() => {navigation.goBack();}}        
      />
    );
  }

  return (
    <View style={styles.container}>
        {localId && <MyBackButton/>}
        <Text style={styles.text}>{title}</Text>
        {localId && <Pressable onPress={onLogout} >
                        <SimpleLineIcons name="logout" size={24} color="black"/>
                    </Pressable>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:colors.red1,
        width:"100%",
        height: 80,
        justifyContent:"space-between",
        alignItems:"center",
        gap: 30,
        paddingHorizontal: 20,
    },
    text:{
        fontSize: 35,
        fontFamily:"BlackOpsOne",
        color: "#fff",
    }
})