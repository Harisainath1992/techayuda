import React from 'react';
import { View,ScrollView,StyleSheet,Image } from 'react-native';
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

function Login({navigation}) {
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
              placeholder="Email"
              secure={false}
              ></CustInput>

                <CustInput
              width="95%"
              placeholder="Password"
              secure={true}
              ></CustInput>
                   
                <CustButton
                onPressFunction={() => navigation.navigate('Dashboard')}
                title="Login"
                width="95%"
                ></CustButton>
        </View>
        </ScrollView>

       
        </View>
    );
}



const styles = StyleSheet.create({
  Logo:{
    width:120,
    height:120,
    borderRadius:60,
  },
  
});

export default Login;