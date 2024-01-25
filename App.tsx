import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Welcome from '@src/pages/welcome';
import Login from '@src/pages/login';
import MainTab from '@src/pages/mainTab';
import ArticleDetail from '@src/pages/articleDetail'

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{ width: '100%', height: '100%' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelCome"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="WelCome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen
                name='ArticleDetail'
                component={ArticleDetail}
                options={{
                    // ...TransitionPresets.SlideFromRightIOS
                }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
