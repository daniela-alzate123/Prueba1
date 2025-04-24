
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { fetchProducts } from '../api/products'

const ProductsScreen = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [err, setError] = useState(null)

    const { addToCart } = useContext(CartContext)
    useEffect(() => {
        fetchProducts().then(products => {
            setData(products)
            setLoad(false)
        })
            .catch(error => {
                setError("Error")
                setLoad(false)
            })

    }, [])

    if (load) return <ActivityIndicator />
    if (err) return <Text>{err}</Text>
    return (

        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View>
                    <Image source={{ uri: item.image }} />
                    <Text>{item.name}</Text>
                    <Text>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => { addToCart(item) }}>
                        <View style={{ height: 10 }} />
                        <Text>
                            Agregar
                        </Text>
                        <View style={{ height: 10 }} />



                    </TouchableOpacity>

                </View>
            )}
        />


    )
}

export default ProductsScreen