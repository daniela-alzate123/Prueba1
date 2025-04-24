
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CartScreen = () => {
    const { cartItems, total, removeFromCart } = useContext(CartContext)

    if (!cartItems.length) {
        return <Text>El carrito está vacío</Text>
    }
    return (
        <View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.image }} />
                        <Text>{item.name}</Text>
                        <Text>${item.price.toFixed(2)}X{item.quantity}</Text>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <Text>
                                Eliminar
                            </Text>

                        </TouchableOpacity>

                    </View>
                )}
            />
            <Text>Total: ${total.toFixed(2)}</Text>

        </View>
    )
}

export default CartScreen