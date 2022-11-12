import React, { useState, useEffect } from "react";

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato';

export default function DropDownMultiSelect() {

  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  const DATA = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'C' },
    { id: 5, name: 'PHP' },
    { id: 6, name: 'Swift' },
    { id: 7, name: 'Ruby' },
    { id: 8, name: 'Dart' },
    { id: 9, name: 'SQL' },
    { id: 10, name: 'Perl' },
    { id: 11, name: 'Amazon Web Services' },
    { id: 12, name: 'Big Data Hadoop' },
    { id: 13, name: 'BigData Developer Skills' },
    { id: 14, name: 'Data Science' },
    { id: 15, name: 'Data Scientist Skills' },
    { id: 16, name: 'Angular Js' },
    { id: 17, name: 'Node Js' },
    { id: 18, name: 'Android ' },
    { id: 19, name: 'Testing' },
    { id: 20, name: '.Net' },
    { id: 21, name: 'Rect Native' },
    { id: 22, name: 'React Js' },
    { id: 23, name: 'Vue Js' },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {

    setSelectedItems(selectedItems);

    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = DATA.find(item => item.id === selectedItems[i]);
      //console.log(tempItem);
    }

  };

  // If you want to render MultiSelect from JSON then below code will help you.
  // const [serverData, setServerData] = useState([]);
  // useEffect(() => {
  //   fetch('YOUR API URL')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Successful response from the API Call
  //       setServerData(responseJson.results);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);


  return (
    

      <View style={styleSheet.MainContainer}>
        <MultiSelect
          hideTags
          items={DATA}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Preferred Technologies"
          searchInputPlaceholderText="Type Here..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#2e2d35"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#00BFA5"
          submitButtonText="Ok"
          altFontFamily="Lato_400Regular"
          fixedHeight={true}
          itemFontFamily="Lato_400Regular"
          fontFamily="Lato_400Regular"
          styleListContainer={{height: 160}}
          styleDropdownMenu={styleSheet.Dropdownstyle}
          styleDropdownMenuSubsection={{borderRadius:8,backgroundColor:'#1e1d25',borderColor:'#2e2d35',borderWidth:1}}
          styleTextDropdown={{padding:5,color:'#ebedef8a',}}
        />
      </View>
    
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    width:"95%",
    marginTop:8
  },
  Dropdownstyle:{
    height:50,
  },
});