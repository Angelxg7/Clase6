import { StyleSheet } from 'react-native'
import Header from '../components/Header'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../screens/Cart'

const Stack = createNativeStackNavigator()

const CartStack = () => {
  return (
    <Stack.Navigator
                    initialRouteName='Cart'
                    screenOptions={
                        ({route})=>{
                            return {
                                header : () => 
                                <Header title="Carrito"/>
                            }
                        }
                    }
              >
                    <Stack.Screen name="Cart" component={Cart} />                   
            </Stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})