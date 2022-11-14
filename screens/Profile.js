import React, { useState,useCallback,useRef } from 'react';
import { View,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';

function Profile({navigation}) {
  const [loginusername,setloginusername] = useState("");
  const [loginmobile,setloginmobile] = useState("");
  const [loginemail,setloginemail] = useState("");
  const [logindesc,setlogindesc] = useState("");
  const[isLoading,setIsLoading]=useState(false);
  const [oldpassword,setoldpassword] = useState();
  const [newpassword,setnewpassword] = useState();
  const getData = async () =>{ try{
    await AsyncStorage.getItem('loginusername').then(value => {
        if(value!=null)
        {
          setloginusername(value);
        }
        else
        {
            navigation.navigate('Login');
        }
    })
    
    await AsyncStorage.getItem('loginmobile').then(value => {
        if(value!=null)
        {
          setloginmobile(value);
        }
    })
    
    await AsyncStorage.getItem('loginemail').then(value => {
        if(value!=null)
        {
          setloginemail(value);
        }
    })

    await AsyncStorage.getItem('loginDesc').then(value => {
        if(value!=null)
        {
          setlogindesc(value);
        }
    })
    
    }catch(error){
    console.log(error);
    }
    
    }
    useFocusEffect(
      useCallback(() => {
          getData()
          
      }, [])
    );

    const updateProfile = () =>{
    
      setIsLoading(true);
      axios.post(BASE_URL+"updateProfile.php", {
        loginusername: loginusername,
        loginmobile: loginmobile,
        loginemail: loginemail,
        newpassword: newpassword,
        oldpassword: oldpassword,
        loginDesc:logindesc,
      }, {
        headers: {
          'loginusername': loginusername,
          'loginmobile': loginmobile,
          'loginemail': loginemail,
          'oldpassword': oldpassword,
          'newpassword': newpassword,
          'loginDesc':logindesc,
        }
      }).then(response => {
        if(response.data.code==200){
            setIsLoading(false);
            try{
              AsyncStorage.setItem("loginusername",response.data.loginusername);
              AsyncStorage.setItem("loginmobile",response.data.loginmobile);
              AsyncStorage.setItem("loginDesc",response.data.logindesc);
            }catch(error){
                console.log(error);
            }
            alert(response.data.message);
            navigation.navigate('Dashboard')
          }
          else
          {
            alert(response.data.message);
            setIsLoading(false);
            return true;
          }
        }).catch(error => {
          //console.log('useeffect' + error);
      }
     );
       
    }
    const logout = async () =>{
      await AsyncStorage.clear()
      navigation.navigate('Login')
    }
    return (
    <View style={{flex:1}}>
        
       <ScrollView  
      contentContainerStyle={{ flexWrap: 'nowrap' }} 
      style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Dashboard')} style={{margin:20,fontWeight:'normal',}}/>
        <MaterialCommunityIcons name="logout" size={30} color="#ffffff" onPress={logout} style={{marginRight:20,top:20,fontWeight:'normal',right:0,position:'absolute'}}/>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                
              }}
        >
          <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                    Email
                    </Text>  
                    {/* <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text>   */}
              </View>
              
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
              {loginemail}
                    </Text> 
                        
            </View> 

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                      Name
                    </Text>    
                    {/* <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text> */}
                      
              </View>
              
              <TextInput
                    style={[styles.input,{width:"100%",margin:0}]}
                    placeholder="Name"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={loginusername}
                    name="profileusername"
                    onChangeText={(text) => setloginusername(text)}
                />
              
            </View> 


            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                    Mobile
                    </Text>    
                    {/* <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                    </Text> */}
                     
              </View>
              
              <TextInput
                    style={[styles.input,{width:"100%",margin:0}]}
                    placeholder="Mobile"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={loginmobile}
                    name="profilemobile"
                    keyboardType="number-pad"
                    onChangeText={(text) => setloginmobile(text)}
                />   
             
            </View> 

            

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                    About
                    </Text>   
                    {/* <Text style={{fontSize:20,fontFamily:'Lato_400Regular',position:'absolute',right:0,}}>
                      <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                  </Text>      */}
              </View>
              
              <TextInput
                    style={[styles.input,{width:"100%",margin:0,padding:5}]}
                    placeholder="Description"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={logindesc}
                    name="logindesc"
                    multiline ={true}
                    numberOfLines = {4}
                    onChangeText={(text) => setlogindesc(text)}
                />   
              
            </View> 


            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                    Technology Preferences
                    </Text>   
                    
                        <Text style={{fontSize:20,position:'absolute',right:0}}>
                        <TouchableOpacity style={{}} onPress={()=>navigation.navigate('Technology')}>
                          <FontAwesome5 name="edit" size={20} color="#191820" style={[styles.commonTextFeatures,{marginRight:5,color:'rgba(41, 22, 49, 0.38)'}]}/>
                          </TouchableOpacity>  
                        </Text> 
                   
              </View>
              
              <Text style={{fontSize:20,color:'#191820'}}>
                    PHP, Java, Python
                    </Text> 
            </View> 

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
            <View style={{}}>
              <TextInput
                    style={[styles.input,{width:"100%",margin:1}]}
                    placeholder="Old Password"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={true}
                    name="profileoldpassword"
                    onChangeText={(text) => setoldpassword(text)}
                />
              <TextInput
                    style={[styles.input,{width:"100%",margin:1}]}
                    placeholder="New Password"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={true}
                    name="profilenewpassword"
                    onChangeText={(text) => setnewpassword(text)}
                />

              </View>
                    
            </View>

                <CustButton
                onPressFunction={updateProfile}
                title="Update"
                width="85%"
                loading={isLoading}
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
      },
      input: {
        margin: 8,
        borderWidth: 1,
        padding: 5,
        borderColor:'#2e2d35',
        color:"#ffffff",
        fontWeight:'600',
        borderRadius:10,
        backgroundColor:'#413e4f'
      },
});

export default Profile;