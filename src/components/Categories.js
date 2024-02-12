import { FlatList, StyleSheet, ImageBackground }  from 'react-native'
import CategoryItem from './CategoryItem'
import { useGetCategoriesQuery } from '../app/services/shopServices'

const Categories = ({navigation,route}) => {
  const {data:categories} = useGetCategoriesQuery()
  const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

  return (
    <ImageBackground source={image} >
        <FlatList
            style = {styles.container}
            data={categories}
            keyExtractor={item => item}
            renderItem={({item}) => <CategoryItem category={item} navigation={navigation} route={route}/>}
        />
    </ImageBackground>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    width:"100%",
  }
})