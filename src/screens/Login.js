import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
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
    const [triggerLogin,{data,isError,isSuccess,error,isLoading}] = useLoginMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

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
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.title}>Login to start</Text>
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
                title="Send"
            />
            <Text style={styles.sub}>¿No posee una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Signup")}>
                <Text style={styles.subLink}>Sign Up</Text>
            </Pressable>
        </View>
    </View>
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
        backgroundColor:colors.blue1,
        gap: 15,
        borderRadius: 10,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical: 20
    },
    title:{
        fontSize: 22,
        fontFamily:"Lobster"
    },
    sub:{
        fontSize: 24,
        fontFamily:"Josefin"
    },
    subLink:{
        fontSize: 24,
        fontFamily:"Josefin",
        color:"blue"
    }
})