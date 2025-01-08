import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    onPress,
} from 'react-native';
import Title from '../common/Title';
import api from '../core/api';
import utlis from '../core/utlis';
import useGlobal from '../core/global';
function Input({ title, value, setValue, error, setError, secureTextEntry = false }) {
    return (
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
                onChangeText={text => {
                    setValue(text)
                    if (error) {
                        setError('')
                    }
                }}
            />
        </View>
    )
}

function Button({ title, onPress }) {
    return (
        <TouchableOpacity style={{
            backgroundColor: 'lavender',
            borderRadius: 5,
            height: 50,
            width: 350,
            marginLeft: 20,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            fontSize: 10,
        }}
            onPress={onPress}
        ><Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 70,
            marginTop: 0,
        }}>
                {title}
            </Text>

        </TouchableOpacity>
    )
}

function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [password1Error, setPassword1Error] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    
    const login = useGlobal(state => state.login)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    function OnSignUp() {

        setUsernameError("");
        setFirstNameError("");
        setLastNameError("");
        setPassword1Error("");
        setPassword2Error("");

        let hasError = false;

        // Username validation
        if (!username || username.length < 5 || username.length > 20) {
            setUsernameError("Username must be between 5 and 20 characters");
            hasError = true;
        }

        // First name validation
        if (!firstName || firstName.length < 2 || firstName.length > 20) {
            setFirstNameError("First name must be between 2 and 20 characters");
            hasError = true;
        }

        // Last name validation
        if (!lastName || lastName.length < 2 || lastName.length > 20) {
            setLastNameError("Last name must be between 2 and 20 characters");
            hasError = true;
        }

        // Password validation
        if (!password1 || password1.length < 8) {
            setPassword1Error("Password must be at least 8 characters");
            hasError = true;
        }

        // Password confirmation validation
        if (password1 !== password2) {
            setPassword2Error("Passwords do not match");
            hasError = true;
        }

        // If any errors exist, prevent form submission
        if (hasError) return;
        api({
            method: 'POST',
            url: "signup/",
            data: {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password1,
            },
        })
            .then((response) => {
                utlis.log('Sign Up: ', response.data)
                const credentials = {
                    username : username,
                    password : password1,
                    }
                login(
                    credentials,
                    response.data.user
                )
            })
            .catch(error => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    {/* <Title text='ZYNC' color='black' /> */}
                    <Text style={{ color: 'black', fontSize: 35, justifyContent: 'center', textAlign: 'center', }}>Sign Up </Text>
                    <Input
                        title='Username'
                        value={username}
                        error={usernameError}
                        setValue={setUsername}
                        setError={setUsernameError}
                    />

                    <Input title='First name'
                        value={firstName}
                        error={firstNameError}
                        setValue={setFirstName}
                        setError={setFirstNameError}
                    />

                    <Input title='Last name'
                        value={lastName}
                        error={lastNameError}
                        setValue={setLastName}
                        setError={setLastNameError}
                    />

                    <Input
                        title='Password'
                        value={password1}
                        error={password1Error}
                        setValue={setPassword1}
                        setError={setPassword1Error}
                        secureTextEntry={true}
                    />

                    <Input title='ReEnter Password'
                        value={password2}
                        error={password2Error}
                        setValue={setPassword2}
                        setError={setPassword2Error}
                        secureTextEntry={true}
                    />

                    <Button title='Sign Up' onPress={OnSignUp} />

                    <Text style={{ textAlign: 'center', marginTop: 40 }}>
                        Do You Have Any Account? <Text style={{ color: 'blue' }}
                            onPress={() => navigation.navigate('SignIn')}
                        >Sign In</Text>
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>


    )
}

export default SignUpScreen;