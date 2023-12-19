import { FlatList, StyleSheet} from 'react-native'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import allProducts from "../data/products.json"
import { useEffect, useState } from 'react'
import { colors } from '../global/color'

const ItemListCategories = ({navigation, route}) => {
  const {category} = route.params
  const [keyword, setKeyword] = useState("")
  const [products, setProducts] = useState(allProducts)

  useEffect(()=>{

      if(category){
        const productsCategory = allProducts.filter(product => product.category === category)
        const productsFiltered = productsCategory.filter(product => product.title.includes(keyword))
      setProducts(productsFiltered)
      }else{
        const productsFiltered = allProducts.filter(product => product.title.includes(keyword))
        setProducts(productsFiltered) 
      }
      
    },[keyword])

  return (
    <>
      <Search setKeyword={setKeyword}/>
      <FlatList
          style={styles.container}
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item})=> <ProductItem item={item} navigation={navigation} route={route}/>}
      />
    </>
  )
}

export default ItemListCategories

const styles = StyleSheet.create({
    container:{
      width:"100%"
    },
    return:{
      flexDirection: 'row',
      width: "100%",
      backgroundColor: colors.blue1,
      justifyContent: "flex-start",
      gap: 20,
      paddingHorizontal: 20,
    },
    text:{
      fontSize: 20,
    }
})