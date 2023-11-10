import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  StackNavigator  from './src/navigation/Stack'
import { UserContext } from './src/Context/UserContext'
import { useState } from 'react';



export default function App() {
  const [pasaporte, setPasaporte] = useState()
  return (
    <UserContext.Provider value={{pasaporte, setPasaporte }}>
      <NavigationContainer>
         <StackNavigator />
       </NavigationContainer>
    </UserContext.Provider>
    );
  }


