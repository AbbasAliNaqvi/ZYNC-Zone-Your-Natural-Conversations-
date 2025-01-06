import { useLayoutEffect, useState } from 'react';
import {
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
} from 'react-native';
import Title from '../common/Title';
import { text } from '@fortawesome/fontawesome-svg-core';

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
                backgroundColor:'#e1e2e4',
                borderRadius:5,
                borderWidth:1,
                borderColor: error ? 'red' : 'transparent',
                height:50,
                width:390,
                marginLeft:10,
                alignItems:'center',
                paddingHorizontal: 16,
                fontSize:10,
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
            width:390,
            alignItems:'center',
            marginTop: 20,
            marginLeft:10,
            fontSize:10,
        }}
        onPress={onPress}
        ><Text style={{
            color:'white',
            fontSize:20,
            fontWeight:10,
            marginTop: 10,
        }}>
            {title}
        </Text>

        </TouchableOpacity>
    )
}

function SignInScreen({navigation}){
    const [Username, SetUsername]= useState('')
    const [Password, SetPassword]= useState('')

    const [UsernameError, SetUsernameError]= useState('')
    const [PasswordError, SetPasswordError]= useState('')

    useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false  
            })
          },[])
function OnSignIn(){
            console.log('OnSignIn', Username,Password)
    const failUsername =!Username
    if(failUsername){
        SetUsernameError('Username Not Provided')
    }
    const failPassword =!Password
    if(failPassword){
        SetPasswordError('Password Not Provided')
    }
    if(failUsername || failPassword){
        return
    }

    }
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex:1 ,
                 justifyContent: 'center' ,
                }}>
         <Title text='ZYNC' color='black' />
         <Input 
         title='Username'
         value={Username}
         error={UsernameError}
        setValue={SetUsername}
        setError={SetUsernameError}
         />
         <Input 
         title='Password'
         value={Password}
         error={PasswordError}
         setValue={SetPassword}
         setError={SetPasswordError}
         secureTextEntry={true}
         />
         <Button title='Sign In' onPress={OnSignIn}/>
         <Text style={{textAlign:'center', marginTop: 40}}> 
            Don't Have Any Account? <Text style={{color:'blue'}}
            onPress={()=> navigation.navigate('SignUp')}
            >Sign Up</Text>
         </Text>
            </View>
        </SafeAreaView>


    )
}

export default SignInScreen