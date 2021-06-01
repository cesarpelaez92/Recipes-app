import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider,} from "@apollo/client";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen"

const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache()
});



const App = () => {
  const [login, setLogin] = useState(null)
  console.log(login)
  return (
      <View style={styles.container}>
        {!login ? (
          <LoginScreen setLogin={setLogin}/>
        ) : (
          <HomeScreen></HomeScreen>
        )
        }

      </View>
  );
}

export default function AppWired() {
  return (
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6E8EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
