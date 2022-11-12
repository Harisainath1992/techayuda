import React,{useState} from 'react';
import { View,ScrollView,StyleSheet } from 'react-native';
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

import CustButton from './button';
import CustInput from './textFields';

const widthdrawRequest = () =>{
    alert("Withdrawl Request Submitted");
}
function Withdrawl({navigation}) {
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
      
    return (
    <View style={{flex:1}}>
        
       <ScrollView  
      contentContainerStyle={{ flexWrap: 'nowrap' }} 
      style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                padding:20
              }}
        >
             <CustInput
              width="95%"
              placeholder="Total Coins to Withdraw"
              secure={false}
              height={60}
              ></CustInput>


              <CustInput
              width="95%"
              placeholder="Add Your Paypal address"
              secure={false}
              height={60}
              ></CustInput>

                <CustButton
                onPressFunction={widthdrawRequest}
                title="Withdraw"
                width="95%"
                ></CustButton>
        </View>
        </ScrollView>

       
        </View>
    );
}

const styles = StyleSheet.create({
  Logo:{
    width:80,
    height:80,
    borderRadius:40,
  },
  selectField:{
    fontFamily:'Lato_400Regular',
    fontWeight:'600',
    width:"100%"
  },
  dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default Withdrawl;