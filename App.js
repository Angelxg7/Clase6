import { StyleSheet, StatusBar} from 'react-native'
import { colors } from './src/global/color'
import {useFonts} from 'expo-font'
import { fonts } from './src/global/fonts'
import TabNavigator from './src/navigation/TabNavigator'
import { store } from './src/app/store'
import { Provider } from 'react-redux'

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
            <TabNavigator/>
        </Provider>
      </>
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
