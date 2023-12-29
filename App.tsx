import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Welcome from '@src/pages/welcome';
import Login from '@src/pages/login';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{ width: '100%', height: '100%' }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelCome"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="WelCome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
