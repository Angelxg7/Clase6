import { StyleSheet, FlatList } from 'react-native'
import allOrders from '../data/orders.json'
import Orderitem from '../components/Orderitem'

const Orders = () => {
  return (
    <FlatList
        data={allOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Orderitem order={item}/> }
    />
  )
}

export default Orders

const styles = StyleSheet.create({})