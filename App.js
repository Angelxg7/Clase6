import { StyleSheet, View,} from 'react-native';
import Home from './src/screens/Home';
import { colors } from './src/global/color';
import { useState } from 'react';
import ItemListCategories from './src/screens/ItemListCategories';
import {useFonts} from 'expo-font'

const App = () => {
  const [categorySelect, setCategorySelect] = useState("")
  
  const [fontLoaded] = useFonts({
    Josefin:require("./assets/fonts/JosefinSans-Bold.ttf"),
    Lobster:require("./assets/fonts/Lobster-Regular.ttf")
  })

  if (!fontLoaded) return null

 

  return (
       <View style={styles.container}>
          {categorySelect ?
            <ItemListCategories category = {categorySelect}/>
            :
            <Home setCategorySelect={setCategorySelect}/>
          }
        </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lgrey1,
    alignItems: 'center',
    justifyContent: 'start',
  },
})
