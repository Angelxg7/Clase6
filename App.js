import { StyleSheet, StatusBar} from 'react-native'
import { colors } from './src/global/color'
import {useFonts} from 'expo-font'
import { fonts } from './src/global/fonts'
import { store } from './src/app/store'
import { Provider } from 'react-redux'
import MainNavigator from './src/navigation/MainNavigator'
import { init } from './src/database'

init()
  .then(()=> console.log("DB initialized"))
  .catch(error => console.log(error))

const App = () => {
  
  const [fontLoaded] = useFonts(fonts)

  if (!fontLoaded) return null

  return (
      <>
        <StatusBar
          backgroundColor={colors.lgrey1}
          barStyle={"dark-content"}
        />
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
      </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lgrey1,
    alignItems: 'center',
    justifyContent: 'start',
    flex: 1
  },
  image: {
    resizeMode:"stretch",
    flex: 1,
  }
})
