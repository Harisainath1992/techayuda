import React,{useState} from 'react';
import { View,ScrollView,StyleSheet,Image,Text } from 'react-native';
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
import DropDownMultiSelect from './dropDown';

function Register({navigation}) {
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
          <Image
          style={styles.Logo}
          source={require('../assets/images/logotd.png')}
          resizeMode='contain'
        />
              <CustInput
              width="95%"
              placeholder="Username"
              secure={false}
              height={50}
              ></CustInput>

              <CustInput
              width="95%"
              placeholder="Mobile"
              secure={false}
              height={50}
              ></CustInput>

             <CustInput
              width="95%"
              placeholder="Email"
              secure={false}
              height={50}
              ></CustInput>

                <CustInput
              width="95%"
              placeholder="Password"
              secure={true}
              height={50}
              ></CustInput>
              <DropDownMultiSelect></DropDownMultiSelect>
              <CustInput
              width="95%"
              placeholder="Breif About You"
              secure={false}
              multiline ={true}
              numberOfLines={4}
              height={80}
              ></CustInput>
              
                <CustButton
                onPressFunction={() => navigation.navigate('Login')}
                title="Register"
                width="95%"
                ></CustButton>
        </View>
        </ScrollView>

       
        </View>
    );
}

const styles = StyleSheet.create({
  Logo:{
    width:140,
    height:140,
    borderRadius:70,
  },
  selectField:{
    fontFamily:'Lato_400Regular',
    fontWeight:'600',
    width:"100%"
  },
});

export default Register;