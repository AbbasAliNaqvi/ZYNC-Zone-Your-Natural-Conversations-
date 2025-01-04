import { useLayoutEffect } from 'react';
import {
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
} from 'react-native';
import Title from '../common/Title';

function Input({title}){
    return(
        <View>
            <Text style={{
                color:'#453a',
                marginVertical: 5,
                paddingLeft: 10
            }}>
                {title}
            </Text>
            <TextInput style={{
                backgroundColor:'#e1e2e4',
                borderRadius:25,
                height:52,
                paddingHorizontal: 16,
                fontSize:10,
            }}/>
        </View>
    )
}
function Button({title}){
    return(
        <TouchableOpacity style={{
            backgroundColor:'lavender',
            borderRadius:25,
            height:50,
            width:390,
            alignItems:'center',
            marginTop: 20,
            marginLeft:10,
            fontSize:10,
        }}><Text style={{
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
    useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false  
            })
          },[])
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex:1 ,
                 justifyContent: 'center' ,
                }}>
         <Title text='ZYNC' color='black' />
         <Input title='Username'/>
         <Input title='Password'/>
         <Button title='SIGN IN'/>
         <Text style={{textAlign:'center', marginTop: 40}}> 
            Don't Have Any Account? <Text style={{color:'blue'}}
            onPress={()=> navigation.navigate('SignUp')}
            >SIGN UP</Text>
         </Text>
            </View>
        </SafeAreaView>


    )
}

export default SignInScreen