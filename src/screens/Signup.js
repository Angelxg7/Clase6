import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native"
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { colors } from "../global/color"
import { useSignupMutation } from "../app/services/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../features/auth/authSlice"
import { signupSchema } from "../validations/signupSchema"
import { insertSession } from "../database"

const Signup = ({navigation}) => {

    const dispatch = useDispatch()
    const [triggerSignup,{data,isError,isSuccess,error,isLoading}] = useSignupMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
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

    const onSubmit = () => {
        try {
            setEmailError("")
            setPasswordError("")
            setConfirmPasswordError("")
            signupSchema.validateSync({email,password,confirmPassword})
            triggerSignup({email,password})
        } catch (error) {
            switch(error.path){
                case "email":
                    setEmailError(error.message)
                    break
                case "password":
                    setPasswordError(error.message)
                    break
                case "confirmPassword":
                    setConfirmPasswordError(error.message)
                    break
                default:
                    break;
            }
        }       
    }

return (
    <ImageBackground style={styles.main} source={image} >
        <View style={styles.container}>
            <Text style={styles.title}>Registrese</Text>
            <InputForm
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure = {false}
                error={emailError}
            />
            <InputForm
                label="Password"
                value={password}
                onChangeText={(t) => setPassword(t)}
                isSecure = {true}
                error={passwordError}
            />
            <InputForm
                label="Confirmar Password"
                value={confirmPassword}
                onChangeText={(t) => setConfirmPassword(t)}
                isSecure = {true}
                error={confirmPasswordError}
            />
            <SubmitButton title="Ingresar" onPress={onSubmit}
            />
            <Text style={styles.sub}>¿Ya tiene una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Login")}>
                <Text style={styles.subLink}>Acceder</Text>
            </Pressable>
        </View>
    </ImageBackground>
)
}

export default Signup

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        width:"90%",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.red1,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10
    },
    title:{
        fontSize: 28,
        fontFamily:"BlackOpsOne"
    },
    sub:{
        fontSize: 24,
        fontFamily:"Josefin",
        color:"black"
    },
    subLink:{
        fontSize: 24,
        fontFamily:"Josefin",
        color:"white"
    }
})