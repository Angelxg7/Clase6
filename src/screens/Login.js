import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native"
import { colors } from "../global/color"
import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"
import { useLoginMutation } from "../app/services/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../features/auth/authSlice"
import { loginSchema } from "../validations/loginSchema"
import { insertSession } from "../database"

const Login = ({navigation})=> {

    const dispatch = useDispatch()
    const [triggerLogin,{data,isError,isSuccess,error}] = useLoginMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const image = {uri: 'https://i.postimg.cc/FKBpfQGd/fondo-expo1.jpg'}

   useEffect(()=>{
        if(isSuccess) {
            dispatch(setUser(data))
            insertSession(data)
                .then(result => console.log(result))
                .catch(error => console.log(error))
        }
        if(isError) console.log(error)
    },[data,isError,isSuccess])

    const onSubmit = ()=> {
        try {
            setEmailError("")
            setPasswordError("")
            loginSchema.validateSync({email,password})
            triggerLogin({email,password})
        } catch (error) {
            switch(error.path){
                case "email":
                    setMailError(error.message)
                    break
                case "password":
                    setPasswordError(error.message)
                    break
                        default:
                    break;
            }
        }
    }

return (
    <ImageBackground style={styles.main} source={image} >
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <InputForm
                label="Email"
                value={email}
                onChangeText={(t)=> setEmail(t)}
                isSecure = {false}
                error={emailError}
            />
            <InputForm
                label="Password"
                value={password}
                onChangeText={(t)=> setPassword(t)}
                isSecure = {true}
                error={passwordError}
            />
            <SubmitButton
                onPress={onSubmit}
                title="Ingresar"
            />
            <Text style={styles.sub}>¿No posee una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Signup")}>
                <Text style={styles.subLink}>Registrarse</Text>
            </Pressable>
        </View>
    </ImageBackground>
)
}

export default Login

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        width:"90%",
        backgroundColor:colors.red1,
        gap: 15,
        borderRadius: 10,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical: 20
    },
    title:{
        fontSize: 26,
        fontFamily:"BlackOpsOne"
    },
    sub:{
        fontSize: 24,
        fontFamily:"Josefin"
    },
    subLink:{
        fontSize: 24,
        fontFamily:"Josefin",
        color:"white"
    }
})