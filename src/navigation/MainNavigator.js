import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthStack from './AuthStack'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchSession } from '../database'
import { setUser } from '../features/auth/authSlice'

const MainNavigator = () => {

  const dispatch = useDispatch()
  const idToken = useSelector(state => state.auth.value.idToken)

  useEffect(()=>{
    ( async ()=>{
      try {
        const session = await fetchSession()
        console.log(session)
        if (session?.rows.length) {
          const user = session.rows._array[0]
          dispatch(setUser(user))
        }
      } catch (error) {
          console.log(error)
      }
    })()
  },[])

  return (
      <NavigationContainer>
            {idToken ? <TabNavigator/> : <AuthStack/>}
      </NavigationContainer>
  )
}

export default MainNavigator
