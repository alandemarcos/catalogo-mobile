// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
<Stack.Navigator initialRouteName="Login">
 <Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{ headerShown: false }}
/>

  <Stack.Screen
    name="Products"
    component={ProductListScreen}
    options={{ title: 'Produtos' }}
  />
  <Stack.Screen
    name="Details"
    component={ProductDetailsScreen}
    options={{ title: 'Detalhes' }}
  />
</Stack.Navigator>

  );
}
