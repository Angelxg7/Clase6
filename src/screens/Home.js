import { StyleSheet} from 'react-native'
import Categories from '../components/Categories'

const Home = ({navigation, route}) => {
  return (
    <>
        <Categories navigation={navigation} route={route}/>
    </>
  )
}

export default Home

const styles = StyleSheet.create({})