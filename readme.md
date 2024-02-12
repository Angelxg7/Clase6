# BikeShop App - React Native

E-Commerce ficticio de venta de motocicletas que utiliza herramientas React Native y está orientado a la mejor experiencia de usuario.

## Funcionalidades Principales

### Pantalla de Acceso

* **Acceso Seguro:** Sólo los usuarios autenticados pueden acceder a la pantalla de perfil y realizar compras.

* **Información del Usuario:** Muestra detalles del usuario, como nombre y dirección.

<img src="https://i.postimg.cc/RVdDvcsm/Screenshot-1707442219.png" width="250">

<img src="https://i.postimg.cc/HkLPnVRy/Screenshot-1707442226.png" width="250">

### Autenticación con Firebase

- Utiliza el sistema de autenticación de Firebase para gestionar el acceso de usuarios.
- Permite a los usuarios iniciar sesión y registrarse de manera segura.

```javascript
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { auth_base_url, api_key } from '../../firebase/database'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: auth_base_url }),
  endpoints: (builder) => ({
    Signup: builder.mutation({
      query: (user) => ({
        url:`accounts:signUp?key=${api_key}`,
        method:"POST",
        body:user
      }),
    }),
    Login: builder.mutation({
        query: (user) => ({
          url:`accounts:signInWithPassword?key=${api_key}`,
          method:"POST",
          body:user
        }),
      })
  }),
})

export const { useSignupMutation, useLoginMutation } = authApi
```

### Pantalla de Categorías

- Muestra una selección de categorías/marcas en tarjetas.
- Al hacer click en una marca, se navega a la pantalla de productos correspondiente.

<img src="https://i.postimg.cc/6QkbpKkJ/Screenshot-1707445970.png" width="250">

### Pantalla de Productos

- Lista todos los productos en tarjetas con nombre y foto.
- Incluye un buscador para filtrar productos por nombre.
- Al hacer click en un producto, se navega a la pantalla de detalles del producto.

<img src="https://i.postimg.cc/2yyYNvg8/Screenshot-1707446152.png" width="250">

### Pantalla de Detalles del Producto

- Proporciona una descripción detallada del producto.
- Muestra el precio y el stock disponible.
- Permite agregar el producto al carrito.

<img src="https://i.postimg.cc/mgX6KJBM/Screenshot-1707446292.png" width="250">

<img src="https://i.postimg.cc/YC9dNRYS/Screenshot-1707446384.png" width="250">

### Navegación Inferior

- **Pestaña 1 - Productos:** Categorías y productos (Stack Principal).
- **Pestaña 2 - Carrito:** Detalles del carrito de compras donde se incluye el total; con opciones de agregar cantidad del mismo producto, eliminar un producto, vaciar el carrito y confirmar compra.

<img src="https://i.postimg.cc/qqJ5PThs/Screenshot-1707446680.png" width="250">

```javascript
    const Cart = () => {
  const localId = useSelector(state => state.auth.value.localId)
  const cart = useSelector(state => state.cart.value)
  const [triggerPostOrder] = usePostOrdersMutation()

  const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}
  const dispatch = useDispatch()
  const [modalVisible,setModalVisible] = useState(false)

  const handlerCart = (cart) => {
        dispatch(clearCart(cart))
        setModalVisible(false)
  }

  useEffect(()=>{
    dispatch(calculateTotal())
  },[cart])

  if (cart.total === 0) return <BlankOrder label="productos"/>

  return (
    <ImageBackground style={styles.container} source={image} >
        <FlatList
            data={cart.items}
            keyExtractor={item => item.id}
            renderItem={({item})=> <CartItem item={item}/>}
        />
        <View style={styles.confirmContainer}>
            <Pressable onPress={()=> triggerPostOrder({localId, order:cart})}>
                <Text style={styles.text}>Confirmar Compra</Text>
            </Pressable>
            <Text style={styles.text}>Total: $ {cart.total}</Text>
        </View>
        <View style={styles.emptyContainer}>
            <Pressable onPress={()=> setModalVisible(true)}>
                <Text style={styles.text}>Vaciar Carrito</Text>
            </Pressable>
        </View>
        <Modal
            visible={modalVisible}
            transparent={true}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent} >
                <Text style={styles.modalText}>¿Vaciar Carrito?</Text>
                <Pressable style={styles.modalButton} onPress={()=> handlerCart(cart)}>
                    <Text style={styles.modalText} >Vaciar</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={()=> setModalVisible(false)}>
                    <Text style={styles.modalText} >Cancelar</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
    </ImageBackground>
  )
}

export default Cart
```

- **Pestaña 3 - Órdenes:** Historial de órdenes realizadas.

<img src="https://i.postimg.cc/qvPZkn6M/Screenshot-1707446749.png" width="250">

```javascript
    const Orders = () => {

  const localId = useSelector(state => state.auth.value.localId)
  const {data, isSuccess} = useGetOrdersQuery(localId)
  const [info, setInfo] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(isSuccess && data.length === 0) setInfo(false)
    if(isSuccess && data) setLoading(false)
  },[data,isSuccess])

    if (!info) return <BlankOrder label="ordenes"/>
    if (loading) return <LoadingSpinner/>

  return (
    <ImageBackground source={image} style={styles.container}>
    <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Orderitem order={item}/> }
    />
   </ImageBackground>
  )
}

export default Orders
```

- **Pestaña 4 - Perfil:** Información del usuario, ubicación y carga de imagen de perfil.

<img src="https://i.postimg.cc/HWtxX9TR/Screenshot-1707446804.png" width="250">

```javascript
    const ImageSelector = ({navigation}) => {

    const [image,setImage] = useState("")
    const [triggerProfileImage,{isError,error}] = usePostProfileImageMutation()
    const localId = useSelector(state => state.auth.value.localId)
    const {data,isSuccess} = useGetProfileImageQuery(localId)
    const imageBack = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

    useEffect(()=>{
        if(isSuccess && data) setImage(data.image)
    },[isSuccess])

    const pickImage = async ()=> {
        const {granted} =  await ImagePicker.requestCameraPermissionsAsync()
        if(granted){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
                base64: true
              })
         
              if (!result.canceled) {
                setImage('data:image/jpeg;base64,'+ result.assets[0].base64)
              }
        }
    }

    const confirmImage = ()=> {
        triggerProfileImage({localId,image})
        navigation.goBack()
    }

  return (
    <ImageBackground style={styles.container} source={imageBack} >
        <Image
            source={image ? {uri: image} :
        require("../../assets/user.png")}
            style={styles.image}
            resizeMode='cover'
        />
        <AddButton title={"Tome una foto"} onPress={pickImage}/>
        <AddButton title={"Confirmar foto"} onPress={confirmImage}/>
    </ImageBackground>
  )
}

export default ImageSelector
```

<img src="https://i.postimg.cc/TYW4BChH/Screenshot-1707446876.png" width="250">

```javascript
    const LocationSelector = ({navigation}) => {

    const localId = useSelector(state => state.auth.value.localId)
    const [location, setLocation] = useState({latitude:"",longitude:""})
    const [address, setAddress] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [triggerPostUserLocation,{data,isSuccess,isError,error}] = usePostUserLocationMutation()
    const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

    useEffect(() => {
      (async () => {     
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
          return;
        }
            let location = await Location.getCurrentPositionAsync({})
            setLocation({
              latitude:location.coords.latitude,
              longitude:location.coords.longitude
          })
          })()
        }, [])

        useEffect(()=>{
          (async ()=>{
            try {
              if(location.latitude){
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleApi.mapStatic}`)

              const data = await response.json()
              setAddress(data.results[0].formatted_address)
              }
              
            } catch (error) {
              setErrorMsg(error.message)
            }
              
          })()
        },[location])

        const onConfirmAddress = async ()=> {
          try {
            const locationFormatted = {
              address,
              ...location
            }
            const data = await triggerPostUserLocation({localId,locationFormatted})
            console.log(data)
            navigation.goBack()
          } catch (error) {
            setErrorMsg(error.message)
          }
          
        }

  return (
    <ImageBackground style={styles.container} source={image} >
      <Text style={styles.text}>{address} </Text>
      <MapPreview latitude={location.latitude} longitude={location.longitude} />
      <AddButton title={"Confirmar ubicación"} onPress={onConfirmAddress} />
    </ImageBackground>
  )
}

export default LocationSelector
```

## Tecnologías Utilizadas

- **Firebase Authentication:** Implementa el sistema de autenticación de Firebase para gestionar la seguridad de la aplicación.
- **React Native Navigation Stack:** Gestiona la navegación entre pantallas.
- **React Native Navigation Button Tab:** Gestiona la navegación entre pestañas.
- **Expo-Location:** Permite accede y gestionar la ubicación del usuario.
- **Expo-Image-Picker:** Facilita la carga de imágenes de perfil.
- **Redux:** Centraliza y gestiona el estado de la aplicación.
- **RTK Query y Firebase:** Realiza operaciones de lectura/escritura en la base de datos.

## Instalación

1. Clona el repositorio: `git clone`
2. Instala las dependencias: `npm install`
3. Configura las claves de API para servicios externos (Expo-Location, Firebase, etc.).
4. Configura las credenciales de Firebase en tu proyecto.
5. Ejecuta la aplicación: `npm start`

## Contacto

Para preguntas o soporte, contacta a [gabrielmartincornejo@gmail.com].

---