import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './src/screens/Inicio.js'
import Login from './src/screens/Login.js'
import Registro from './src/screens/Registro.js'
import Direcciones from './src/screens/Direcciones.js'
import TabNavigator from './src/tabNavigator/TabNavigator.js';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'

        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Direcciones" component={Direcciones} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}