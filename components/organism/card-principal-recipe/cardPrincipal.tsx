import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { Card, Icon  } from 'react-native-elements';


const cardRecipe = (props: any) => {
  const { data } = props
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    <View key={data._id}>
      <Card containerStyle={styles.container}>
        <Card.Title>
          <Text>{data.recipeName}</Text>
        </Card.Title>
        <Card.Divider/>
        <Card.Image source={data.Image} />
        <Card.Divider/>
        {
          modalVisible && 
          <View>
              <Text style={styles.subtitle}>Ingedientes:</Text>
                  <Text style={styles.info}>{data.ingredients}</Text>
              <Text style={styles.subtitle}>Preparación:</Text>
                  <Text style={styles.info}>{data.preparationDesc}</Text>      
              <Text style={styles.subtitle}>Tiempo de preparacion:</Text>
                  <Text style={styles.info}>{data.preparationTime} Minutos</Text>
          </View>
        }
        <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{modalVisible ? 'Cerrar' : 'Ver Receta'}</Text>
        </Pressable>
      </Card>
    </View>
  </>     
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    width: 'auto',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
    },
  info: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 15
    },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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

export default cardRecipe
