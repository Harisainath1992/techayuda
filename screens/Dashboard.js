import React from 'react';
import { View,StyleSheet,Text,Dimensions } from 'react-native';
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
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const window = Dimensions.get('window');
const windowWidth = window.width;
const windowHeight = window.height;

function Dashboard({navigation}) {
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
        
       <View  
      style={{
        backgroundColor:'#191820',    
        alignContent:'center',
        justifyContent:'center',
        flex:1
      }}>
        <View style={{flexDirection:"row",width:"100%",marginBottom:40}}>
        
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <View style={{left:20,top:10,}}>
                    <FontAwesome5 name="user-circle" size={30} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>
            </Pressable>
            
            <Pressable onPress={() => navigation.navigate('Wallet')} style={{position:'absolute',right:20,top:10,}}>
                <View style={{flexDirection:"row",}}>
                    <FontAwesome5 name="wallet" size={30} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>
            </Pressable>

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
                            Welcome Hari.
                        </Text>
                        <Text style={[styles.tagLine,styles.commonTextFeatures]}>Loreum Ipsum Loreum Ipsum Lo</Text>
                    </View>
                    
                </View>


                

                <View style={{padding:50,backgroundColor:'#ffffff',borderTopEndRadius:25,borderTopStartRadius:25,marginTop:30,height:"77%"}}>

                <View style={{flexDirection:"row"}}>
                
                
                <Pressable android_ripple={{color:'#ffffff'}} style={[styles.pressableButton]} onPress={() => navigation.navigate('Requirement')}>
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