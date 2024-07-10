import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './src/screens/Inicio.js'
import Login from './src/screens/Login.js'
import Registro from './src/screens/Registro.js'
import TabNavigator from './src/tabNavigator/TabNavigator.js';
import Productos from './src/screens/Productos.js';

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
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Inicio" component={Inicio} />
        {/* <Stack.Screen name="Productos" component={Productos} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}