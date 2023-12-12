import { FlatList, StyleSheet, View , Text}  from 'react-native'
import categories from '../data/categories.json'
import CategoryItem from './CategoryItem'

const Categories = ({setCategorySelect}) => {
  return (
        <FlatList
            style = {styles.container}
            data={categories}
            keyExtractor={item => item}
            renderItem={({item}) => <CategoryItem setCategorySelect={setCategorySelect} category={item}/>}
        />
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    width:"100%",
  }
})