import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import CartScreen from './src/screens/CartScreen'
import CartProvider from './src/context/CartContext'
import ProductsScreen from './src/screens/ProductScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              let iconName = route.name === 'Productos' ? 'list' : 'cart'
              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}
        >
          <Tab.Screen name="Productos" component={ProductsScreen} />
          <Tab.Screen name="Carrito" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  )
}