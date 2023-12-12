import { Pressable, StyleSheet, Text } from 'react-native'
import {colors} from '../global/color'
import CardShadow from '../Wrappers/CardShadow'

const CategoryItem = ({category, setCategorySelect}) => {
  return (
    <Pressable onPress={() => setCategorySelect (category)}>
    <CardShadow style ={styles.container}>
      <Text style ={styles.text}>{category}</Text>
    </CardShadow>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container:{
        width:"80%",
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:"10%",
        backgroundColor: colors.blue2,
        margin: 10,
        padding: 10,
    },
    text:{
        fontFamily:"Josefin",
        fontSize: 20
    }
})