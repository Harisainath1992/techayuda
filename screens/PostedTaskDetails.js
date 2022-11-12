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
import { DataTable } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustButton from './button';
import CustInput from './textFields';


function PostedTaskDetails({navigation}) {
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
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Posted')} style={{margin:20,fontWeight:'normal',}}/>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                padding:5
              }}
        >
       
       <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Title
                    </Text>   
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0,top:-5}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text> 
                      
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    Task Title
                  </Text>  
              </View>
        </View>
        <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Description
                    </Text>   
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0,top:-5}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>
    
              </View>
              <View style={{flexDirection:'row',}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum 
                    </Text> 
              </View>
        </View>

         <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10,marginBottom:50}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Attachment
                    </Text>   
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0,top:-5}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>  
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesome5 name="file-download" size={40} color="#191820" style={[styles.commonTextFeatures,{marginBottom:10,}]}/>
                    </Text> 
              </View>
        </View>
        
                <CustButton
                onPressFunction={() => navigation.navigate('UpdateTask')}
                title="Update"
                width="85%"
                ></CustButton>
                



        </View>
        </ScrollView>

       
        </View>
    );
}



const styles = StyleSheet.create({
    MainContainer:{width:"100%",flexDirection:'row',alignContent:'center',justifyContent:'center',marginBottom:20},
    CreditNote:{width:"10%",alignContent:'center',justifyContent:'center',borderRadius:8,marginRight:15,height:32,},
    TransIconText:{fontSize:20,alignContent:'center',justifyContent:'center',position:'absolute',marginLeft:9,color:'#191820'},
    TransferContent:{fontSize:18,alignContent:'center',justifyContent:'center',marginTop:5,color:'#191820'},
    CoinsText:{fontSize:15,fontWeight:'bold',alignContent:'center',justifyContent:'center',color:'#191820',marginTop:10},
    Date:{fontSize:10,alignContent:'center',justifyContent:'center',},
   
  container:{
    marginTop:5
  },
  rowStyle:{
    borderColor:'#191820',
    borderWidth:1,
    backgroundColor: '#ffffff',
  },
  rowStyleCredit:{
    borderColor:'#191820',
    borderWidth:1,
    backgroundColor: '#d3ffce',
  },
  rowStyleDebit:{
    borderColor:'#191820',
    borderWidth:1,
    backgroundColor: '#fdb7b7',
  }
  
});

export default PostedTaskDetails;