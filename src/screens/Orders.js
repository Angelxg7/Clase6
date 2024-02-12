import { StyleSheet, FlatList, ImageBackground } from 'react-native'
import Orderitem from '../components/Orderitem'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../app/services/shopServices'
import { useEffect, useState } from 'react'
import BlankOrder from '../components/BlankOrder'
import LoadingSpinner from '../components/LoadingSpinner'

const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

const Orders = () => {

  const localId = useSelector(state => state.auth.value.localId)
  const {data, isSuccess} = useGetOrdersQuery(localId)
  const [info, setInfo] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(isSuccess && data.length === 0) setInfo(false)
    if(isSuccess && data) setLoading(false)
  },[data,isSuccess])

    if (!info) return <BlankOrder label="ordenes"/>
    if (loading) return <LoadingSpinner/>

  return (
    <ImageBackground source={image} style={styles.container}>
    <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Orderitem order={item}/> }
    />
   </ImageBackground>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})