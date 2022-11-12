import React from 'react';
import { View,ScrollView,StyleSheet,Text } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import CustButton from './button';
import CustInput from './textFields';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function CompleteTask({navigation}) {
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
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Supporting')} style={{margin:20,fontWeight:'normal',}}/>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                padding:5
              }}
        >
       
             <CustInput
              width="95%"
              placeholder="Description"
              secure={false}
              multiline ={true}
              numberOfLines={6}
              height={120}
              ></CustInput>
                <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
                <Text style={{fontSize:20,color:"#ffffff"}}>Upload Attachment(*zip)</Text>
                <FontAwesome5 name="file-upload" size={50} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>

                <CustButton
                onPressFunction={() => navigation.navigate('Supporting')}
                title="Update"
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

export default CompleteTask;