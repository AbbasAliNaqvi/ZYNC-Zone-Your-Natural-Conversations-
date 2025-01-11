import React, { useLayoutEffect, useState } from 'react';
import {
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
TouchableWithoutFeedback,
Keyboard,
onPress,
} from 'react-native';
import Title from '../common/Title';
import { text } from '@fortawesome/fontawesome-svg-core';
import api from '../core/api'
import utlis from '../core/utlis'
import useGlobal from '../core/global';
function Input({title , value , setValue , error , setError,secureTextEntry}){
    return(
        <View>
            <Text style={{
                color: error ? 'red' : 'black',
                marginVertical: 5,
                paddingLeft: 10
            }}>
                {error ? error : title}
            </Text>
            <TextInput 
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoComplete="off"
            style={{
                backgroundColor: '#e1e2e4',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: error ? 'red' : 'transparent',
                height: 50,
                width: 370,
                marginLeft: 10,
                justifyContent: 'center', 
                alignItems: 'center',  
                paddingHorizontal: 16,
            }
        }
            value={value}
            onChangeText={text=>{
                setValue(text)
                if (error){
                setError('')
                }
            }}
            />
        </View>
    )
}
function Button({title , onPress}){
    return(
        <TouchableOpacity style={{
            backgroundColor:'lavender',
            borderRadius:5,
            height:50,
            width:350,
            marginLeft: 20,
            marginTop: 15,
            justifyContent: 'center', 
            alignItems: 'center',  
            paddingHorizontal: 16,
            fontSize:10,
        }}
        onPress={onPress}
        ><Text style={{
            color:'white',
            fontSize:20,
            fontWeight:70,
            marginTop: 0,
        }}>
            {title}
        </Text>

        </TouchableOpacity>
    )
}

function SignInScreen({navigation}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError]= useState('')
    const [passwordError, setPasswordError]= useState('')
   
    const login = useGlobal(state => state.login)

    useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false  
            })
    },[])

    function OnSignIn(){
        console.log('OnSignIn', username,password)

        setUsernameError("");
        setPasswordError("");

        const failUsername = !username;
        if (failUsername) {
        setUsernameError("Username is not provided");
        }

    // checking the password
        const failPassword = !password;
        if (failPassword) {
            setPasswordError("Password is Wrong Folk");
        }
    // Break out of this function if there were any error
        if (failUsername || failPassword) {
            return;
        }
    api({
        method:'POST',
        url: "signin/", 
        data: {
         username :username,
         password :password,
        },
    })
    .then((response)=>{
        const credentials = {
        username : username,
        password : password,
        }
        utlis.log('Sign In: ',response.data)
        login(
            credentials ,
            response.data.user,
            response.data.tokens,
        )
        
    })
    .catch(error=>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
    }
    )
    }
    return(
        <SafeAreaView style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex:1 ,
                 justifyContent: 'center' ,
                }}>
         <Title text='ZYNC' color='black' />
         <Input 
         title='Username'
         value={username}
         error={usernameError}
        setValue={setUsername}
        setError={setUsernameError}
         />
         <Input 
         title='Password'
         value={password}
         error={passwordError}
         setValue={setPassword}
         setError={setPasswordError}
         secureTextEntry={true}
         />
         <Button title='Sign In' onPress={OnSignIn}/>
         <Text style={{textAlign:'center', marginTop: 40}}> 
            Don't Have Any Account? <Text style={{color:'blue'}}
            onPress={()=> navigation.navigate('SignUp')}
            >Sign Up</Text>
         </Text>
            </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>


    )
}

export default SignInScreen;