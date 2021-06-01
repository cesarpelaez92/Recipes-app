import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Overlay, Button } from 'react-native-elements';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { gql, useMutation } from "@apollo/client";

const GET_USERDATA = gql `
    mutation Login($email: String!, $password: String! ) {
      login (email: $email, password: $password) {
        _id
        email
      }
    }
    `
const POST_USERDATA = gql `
    mutation createUser($email: String!, $password: String!, $name: String!) {
      createUser (input: {email: $email, password: $password, name: $name}) {
        _id
        email
      }
    }
    `

interface LoginInterface {
  setLogin: any;
}    
const LoginScreen = (props: LoginInterface) => {
  const { setLogin } = props;
  const [userData, {data}] = useMutation(GET_USERDATA)
  const [postUser] = useMutation(POST_USERDATA)
  const [isVisible, setIsVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<String>("")
  const [userPwd, setUserPwd] = useState("")
  const [userName, setUserName] = useState("")
  const [register, setRegister] = useState(false)

  const handleInputEmail = (event:any) => {
    setUserEmail(event)
  }

  const handleInputPassword = (event:any) => {
    setUserPwd(event)
  }

  const handleInputName = (event:any) => {
    setUserName(event)
  }

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setLogin(data)
  }, [data])

  return (
    <>
    <View style={styles.container}>
      {
        register ? (
          <View>
            <Input
              placeholder='email'
              onChangeText={handleInputEmail}
              leftIcon={
                <Icon
                  name='at'
                  size={15}
                  color='black'
                />
              }
              
            />
            <Input
              placeholder='password'
              onChangeText={handleInputPassword}
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='key'
                  size={15}
                  color='black'
                />
            }
            />
            <Input
              placeholder='Name'
              onChangeText={handleInputName}
              leftIcon={
                <Icon
                  name='user'
                  size={15}
                  color='black'
                />
            }
            />
            <Pressable
                style={styles.button}
                onPress={() => {
                  toggleOverlay()
                  setRegister(false);
                  postUser({variables: { email: userEmail , password: userPwd, name: userName}})
                }
              }
              >
                <Text style={styles.textStyle}>Registrarse</Text>
            </Pressable>
      </View>
        ) : (
          <View>
          <Input
            placeholder='email'
            onChangeText={handleInputEmail}
            style={{fontSize: 13}}
            leftIcon={
                <Icon
                  name='at'
                  size={15}
                  color='black'
                />
              }
        
          />
          <Input
            placeholder='password'
            onChangeText={handleInputPassword}
            style={{fontSize: 13}}
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='key'
                size={15}
                color='black'
              />
            }
          />
          <Pressable
                style={styles.button}
                onPress={() => userData({variables: { email: userEmail , password: userPwd}}) }
              >
                <Text style={styles.textStyle}>Iniciar sesión</Text>
          </Pressable>
          <Pressable
                style={styles.button}
                onPress={() => setRegister(true)}
              >
                <Text style={styles.textStyle}>Registrarse</Text>
          </Pressable>
      </View>
        )
      }
    </View>
      {
        isVisible ? (
          <View> 
            <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay} >
              <Text onPress={() => setIsVisible(false)}>Usuario creado!</Text>
            </Overlay>
          </View>
        ) : null
      }
    
    
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    color: "white"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F13030",
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default LoginScreen
