import React from 'react';
import { View,ScrollView,StyleSheet,Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
const updateProfile = () =>{
    alert('Updated');
}
function Profile({navigation}) {
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
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Dashboard')} style={{margin:20,fontWeight:'normal',}}/>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                marginTop:20
              }}
        >
          
           <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Name
                    </Text>    
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>
                      
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    Hari sainath
                  </Text>  
              </View>
            </View> 


            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Mobile
                    </Text>    
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>
                     
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    7794020107
                    </Text>    
              </View>
            </View> 

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Email
                    </Text>  
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>  
              </View>
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    harisainath51@gmail.com
                    </Text> 
                        
              </View>
            </View> 

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    About
                    </Text>   
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0,}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                  </Text>     
              </View>
              <View style={{flexDirection:'row',}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum 
                    </Text> 
              </View>
            </View> 


            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:50,paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',marginBottom:5}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Technology Preferences
                    </Text>    
                    <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>    
              </View>
              <View style={{flexDirection:'row',}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    PHP, Java, Python
                    </Text> 
              </View>
            </View> 

            {/* <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10}}>
                    <CustInput
                  width="95%"
                  placeholder="New Password"
                  secure={true}
                  height={60}
                  ></CustInput>

                  <CustInput
                  width="95%"
                  placeholder="Confirm Password"
                  secure={true}
                  height={60}
                  ></CustInput>
            </View> */}

                <CustButton
                onPressFunction={updateProfile}
                title="Update"
                width="85%"
                ></CustButton>
        </View>
        </ScrollView>

       
        </View>
    );
}

const styles = StyleSheet.create({
      container:{
        marginTop:5
      },
      rowStyle:{
        borderColor:'#191820',
        borderWidth:1,
        backgroundColor: '#ffffff',
      }
});

export default Profile;