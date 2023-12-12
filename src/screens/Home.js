import { StyleSheet} from 'react-native'
import Header from '../components/Header'
import Categories from '../components/Categories'

const Home = ({setCategorySelect}) => {
  return (
    <>
        <Header title="Categories"/>
        <Categories setCategorySelect={setCategorySelect}/>
    </>
  )
}

export default Home

const styles = StyleSheet.create({})