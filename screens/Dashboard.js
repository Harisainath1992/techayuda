import React, { useState,useMemo,useCallback, useEffect } from 'react';
import { View,StyleSheet,Text,Dimensions,TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const window = Dimensions.get('window');
const windowWidth = window.width;
const windowHeight = window.height;

function Dashboard({navigation}) {
    const [loggedinusername,setLoggedinUsername]=useState();
    const [loggedinmobile,setLoggedinMobile]=useState();
    const [loggedinemail,setLoggedinEmail]=useState();
    const [loggedindesc,setLoggedindesc]=useState();
    
    const getData = async () =>{ try{
    await AsyncStorage.getItem('loginusername').then(value => {
        if(value!=null)
        {
            setLoggedinUsername(value);
        }
        else
        {
            navigation.navigate('Login');
        }
    })
    
    await AsyncStorage.getItem('loginmobile').then(value => {
        if(value!=null)
        {
            setLoggedinMobile(value);
        }
    })
    
    await AsyncStorage.getItem('loginemail').then(value => {
        if(value!=null)
        {
            setLoggedinEmail(value);
        }
    })

    await AsyncStorage.getItem('loginDesc').then(value => {
        if(value!=null)
        {
            setLoggedindesc(value);
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
    return (
    <View style={{flex:1}}>
        
       <View  
      style={{
        backgroundColor:'#191820',    
        alignContent:'center',
        justifyContent:'center',
        flex:1
      }}>
        <View style={{flexDirection:"row",width:"100%",marginBottom:40}}>
        
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={{left:20,top:10,}}>
                    <FontAwesome5 name="user-circle" size={30} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={{position:'absolute',right:20,top:10,}}>
                <View style={{flexDirection:"row",}}>
                    <FontAwesome5 name="wallet" size={30} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>
            </TouchableOpacity>

        </View>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent:'center',
                        padding:30
                    }}
                >
                    
                   
                    <View style={{position:'absolute',left:20,}}>
                        <Text style={[styles.welcomeText]}>
                            Welcome {loggedinusername}.
                        </Text>
                        {/* <Text style={[styles.tagLine,styles.commonTextFeatures]}>Loreum Ipsum Loreum Ipsum Lo</Text> */}
                    </View>
                    
                </View>


                

                <View style={{padding:50,backgroundColor:'#ffffff',borderTopEndRadius:25,borderTopStartRadius:25,marginTop:30,height:"77%"}}>

                <View style={{flexDirection:"row"}}>
                
                
                <Pressable style={[styles.pressableButton]} onPress={() => navigation.navigate('Requirement')}>
                  <Text style={styles.loginText}>Search For Support</Text>
                </Pressable>

                </View>


                        <View style={[styles.innerContainer]}>
                                    <Pressable android_ripple={{color:'#191820',borderColor:'#191820',borderWidth:1,backgroundColor:'#ffffff'}} onPress={() => navigation.navigate('Supporting')} style={[styles.taskContainer,{backgroundColor:"#191820",marginRight:20}]}>
                                    <View style={{}}>
                                        <FontAwesome5 name="tasks" size={35} color="white" style={[styles.commonTextFeatures,{marginBottom:10}]}/>
                                        <Text style={styles.commonTextFeatures}>Supporting</Text>    
                                        <Text style={styles.commonTextFeatures}>Task's</Text>    
                                    </View> 
                                    </Pressable>
                                    <Pressable android_ripple={{color:'#ffffff'}} onPress={() => navigation.navigate('Posted')} style={[styles.taskContainer,{backgroundColor:"#191820"}]}>
                                    <View style={{}}>
                                    <FontAwesome5 name="network-wired" size={35} color="white" style={[styles.commonTextFeatures,{marginBottom:10}]}/>
                                        <Text style={styles.commonTextFeatures}>Posted</Text>    
                                        <Text style={styles.commonTextFeatures}>Task's</Text>    
                                    </View> 
                                    </Pressable>
                        </View>
                        <View style={[styles.innerContainer]}>
                                    <Pressable android_ripple={{color:'#ffffff'}} onPress={() => navigation.navigate('Wallet')} style={[styles.taskContainer,{backgroundColor:"#191820",marginRight:20}]}>
                                        <View style={{}}>
                                        <FontAwesome5 name="coins" size={35} color="white" style={[styles.commonTextFeatures,{marginBottom:10}]}/>
                                        <Text style={styles.commonTextFeatures}>Total</Text>    
                                        <Text style={styles.commonTextFeatures}>Transactions</Text>    
                                        </View>  
                                    </Pressable>
                                    

                                    <Pressable android_ripple={{color:'#ffffff'}} onPress={() => navigation.navigate('Withdrawl')} style={[styles.taskContainer,{backgroundColor:"#191820"}]}>
                                    <View>
                                    <FontAwesome5 name="check-double" size={35} color="white" style={[styles.commonTextFeatures,{marginBottom:10}]}/>
                                        <Text style={styles.commonTextFeatures}>Withdrawl</Text>    
                                        <Text style={styles.commonTextFeatures}>Request</Text>    
                                    </View> 
                                    </Pressable>
                        </View>
                 </View>
                <View>
                    
                </View>


        </View>

       
        </View>
    );
}



const styles = StyleSheet.create({
    taskContainer:{
        alignContent:'center',
        justifyContent:'center',
        width:130,
        height:130,
        borderRadius:30,
        alignContent:'center',
        justifyContent:'center',
        borderColor:'#191820',
        borderWidth:1,
    },
    innerContainer:{
        backgroundColor:'#ffffff',
        width:"100%",
        flexDirection:"row",
        padding:15,
        alignContent:'center',
        justifyContent:'center',
    },
    commonTextFeatures:{
        color:'#ffffff',
        alignContent:'center',
        justifyContent:'center',
        fontFamily:"Lato_400Regular",
        textAlign:'center'
    },
    welcomeText:{
        fontSize:27,
        color:'#ffffff',
        fontFamily:"Lato_400Regular",
        textAlign:'center'
    },
    tagLine:{
        fontSize:12,
        justifyContent:'center'
    },
    pressableButton:{
        alignItems: 'center',
        justifyContent:'center',
        height:40,
        width:"99%",
        borderRadius:30,
        marginRight:5,
        marginBottom:40,
        borderColor:'#191820',
        borderWidth:1,
      },
      loginText:{
        fontFamily:'Lato_400Regular',
        fontWeight:'bold',
        color:"#191820",
        elevation: 10,
      },
});

export default Dashboard;