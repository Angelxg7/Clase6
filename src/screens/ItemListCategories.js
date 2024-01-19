import { FlatList, StyleSheet} from 'react-native'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { useEffect, useState } from 'react'
import { colors } from '../global/color'
import { useGetProductsQuery } from '../app/services/shopServices'

const ItemListCategories = ({navigation, route}) => {
  const {category} = route.params
  const {data, error, isLoading} = useGetProductsQuery(category)
  const [keyword, setKeyword] = useState("")
  const [products, setProducts] = useState()

  if(error) console.log(error)
  
useEffect(()=>{

  if(!isLoading) {
    const dataArray = Object.values(data)
    const productsFiltered = dataArray.filter(product => product.title.includes(keyword))
    setProducts(productsFiltered)
  }
      
    },[keyword,data])

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