import React, { useEffect, useState} from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TextInput } from 'react-native';
import { Card, SearchBar, Button, Rating, colors } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { gql, useQuery } from "@apollo/client";
import CardPrincipal from "../organism/card-principal-recipe/cardPrincipal";

const GET_RECIPES = gql`
    {
      allRecipes {
        _id
        recipeName
        preparationTime
        preparationDesc
        ingredients
        Image
      }
    }
  `
const HomeScreen = () => {
  const {loading, error, data} = useQuery(GET_RECIPES)
  const recipeInfo = data?.allRecipes
  const [search, setSearch] = useState('')
  const [filteredRecipes, setFiltereRecipes] = useState<any>([]);

  const filterHotels = (query:any) => {
    const result = recipeInfo.filter( (recipe:any) => recipe.recipeName.toUpperCase().includes(query.toUpperCase()))
    setSearch(query);
    setFiltereRecipes(result);
  }

  useEffect(() => {
    setFiltereRecipes(recipeInfo)
  }, [recipeInfo])

  console.log(recipeInfo)

  return (
    <>
      {loading ? (
          <View style={styles.row}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView style={{flexGrow: 0, width: "100%", height: "100%" }}>
              <SearchBar
                  placeholder=""
                  platform="ios"
                  onChangeText={filterHotels}
                  value={ search }
                  inputStyle={{color: "black"}}
                  style={{backgroundColor: '#F6E8EA'}}
              />
              {!!error && <Text>{ error }</Text>}
               {!loading && recipeInfo &&
                filteredRecipes?.map((recipe:any) => (
                    <CardPrincipal data={recipe} key={recipe._id}/>
                ))
              }
              
          </ScrollView>
        ) 
      }
    </>  
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  },
  searchBar: {
    color: 'rgb(0, 0, 0)'
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    width: 'auto'
  },

});

export default HomeScreen
