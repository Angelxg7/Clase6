import { StyleSheet, StatusBar} from 'react-native'
import { colors } from './src/global/color'
import {useFonts} from 'expo-font'
import Navigator from './src/navigation/Navigator'
import { fonts } from './src/global/fonts'

const App = () => {
  
  const [fontLoaded] = useFonts(fonts)

  if (!fontLoaded) return null

  return (
      <>
        <StatusBar
          backgroundColor={colors.lgrey1}
          barStyle={"dark-content"}
        />
        <Navigator/>
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
