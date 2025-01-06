import React, { useState } from 'react'
import { 
  SafeAreaView,
  Text,
  StatusBar,
  colors,
 } from 'react-native'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import  SplashScreen from './src/screens/Splash'
import SignInScreen from './src/screens/SignIn'
import SignUpScreen from './src/screens/SignUp'
import HomeScreen from './src/screens/Home'
import SearchScreen from './src/screens/Search'
import MessageScreen from './src/screens/Message'
import './src/core/iconforapp'
const Stack = createNativeStackNavigator();
const LightTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: 'white',
  }
}
function App() {

  const[initilized] = useState(false)
  const[authenticated] = useState(false)


  return (

    <NavigationContainer theme={LightTheme}>

  <StatusBar barStyle='dark-content' />

  <Stack.Navigator>
    {!initilized ? (
      <>
      <Stack.Screen name="Splash" component={SplashScreen} />
      </>
    ): !authenticated?(
      <>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      </>
    ):(
      <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      </>
    )}

  </Stack.Navigator>

    </NavigationContainer>

  )
}
export default App