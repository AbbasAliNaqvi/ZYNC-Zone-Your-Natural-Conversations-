import { useLayoutEffect, useState } from 'react';
import {
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
TouchableWithoutFeedback,
Keyboard,
KeyboardAvoidingView,
} from 'react-native';
import Title from '../common/Title';

function Input({title , value , setValue , error , setError, secureTextEntry=false }){
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
function SignUpScreen({navigation}){
    const [Username, SetUsername]= useState('')
    const [Password, SetPassword]= useState('')
    const [Firstname, SetFirstname]= useState('')
    const [Lastname, SetLastname]= useState('')
    const [RePassword, SetRePassword]= useState('')

    const [UsernameError, SetUsernameError]= useState('')
    const [PasswordError, SetPasswordError]= useState('')
    const [FirstnameError, SetFirstnameError]= useState('')
    const [LastnameError, SetLastnameError]= useState('')
    const [RePasswordError, SetRePasswordError]= useState('')
    useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false  
            })
          },[])
function OnSignUp(){
    console.log('OnSignUp', Username,Firstname,Lastname,Password,RePassword)
    const failUsername =!Username
    if(failUsername){
        SetUsernameError('Username can not be empty')
    }
    else if(Username.length<5 ){
        SetUsernameError('Username Must be Greater then 5 Character')
    }
    const failPassword =!Password
    if(failPassword){
        SetPasswordError('Password can not be empty')
    }
    const failRePassword =!RePassword
    if(failRePassword){
        SetRePasswordError('ReEntered Password can not be empty')
    }
    else if(Password!=RePassword){
        SetRePasswordError('ReEntered Password Must be Same')
    }
    const failFirstname =!Firstname
    if(failFirstname){
        SetFirstnameError('First Name can not be empty')
    }
    else if (Firstname !== 'char') {
        SetFirstnameError('First Name must be Alphabet')}
    const failLastname =!Lastname
    if(failLastname){
        SetLastnameError('Last Name can not be empty')
    }
    else if (Lastname !== 'char') {
        SetLastnameError('Last Name must be Alphabet')}
    if(failUsername || failPassword || failFirstname || failLastname || failRePassword){
        return
    }

    }
    return(
        <SafeAreaView style={{flex:1}}>
       
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex:1 ,
                 justifyContent: 'center' ,
                }}>
         {/* <Title text='ZYNC' color='black' /> */}
         <Text style={{color:'black',fontSize:35,justifyContent:'center',textAlign:'center',}}>Sign Up </Text>
         <Input 
         title='Username'
         value={Username}
         error={UsernameError}
        setValue={SetUsername}
        setError={SetUsernameError}
         />
         <Input title='First name'
           value={Firstname}
           error={FirstnameError}
          setValue={SetFirstname}
          setError={SetFirstnameError}
         />
          <Input title='Last name'
           value={Lastname}
           error={LastnameError}
          setValue={SetLastname}
          setError={SetLastnameError}
         />
         <Input 
         title='Password'
         value={Password}
         error={PasswordError}
         setValue={SetPassword}
         setError={SetPasswordError}
         secureTextEntry={true}
         />
         <Input title='ReEnter Password'
          value={RePassword}
          error={RePasswordError}
          setValue={SetRePassword}
          setError={SetRePasswordError}
          secureTextEntry={true}
         />
         <Button title='Sign Up' onPress={OnSignUp} />
         <Text style={{textAlign:'center', marginTop: 40}}> 
            Do You Have Any Account? <Text style={{color:'blue'}}
            onPress={()=> navigation.navigate('SignIn')}
            >Sign In</Text>
         </Text>
            </View>
            </TouchableWithoutFeedback> 
        </SafeAreaView>


    )
}

export default SignUpScreen