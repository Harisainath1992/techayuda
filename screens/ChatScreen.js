import React,{useCallback,useState,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from './constants';


function ChatScreen({navigation,route}) {
    const {item}=route.params;
    var initialid=item.id;
    const [loggedinusername,setLoggedinUsername]=useState();
    const [loggedinmobile,setLoggedinMobile]=useState();
    const [loggedinemail,setLoggedinEmail]=useState();
    const [loggedindesc,setLoggedindesc]=useState();
    const [loginid,setloginid]=useState();
    const [loading,setLoading]=useState(false);
    const [chatting,setChatting]=useState();
    const [download,setDownload]=useState(false);

  const getData = async () =>{ try{
    setLoading(true);
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

    await AsyncStorage.getItem('loginid').then(value => {
        if(value!=null)
        {
            setloginid(value);

            axios.post(BASE_URL+"getChat.php", {
              acceptedTask: item.id,
            }, {
              headers: {
                
              }
            }).then(response => {
              if(response.data.code==200){
                  try{
                    setChatting(response.data.chatting);
                    setLoading(false);
                  }catch(error){
                      console.log(error);
                      setLoading(false);
                  }
                            }
                else
                {
                  alert(response.data);
                  setLoading(false);
                  return true;
                }
              }).catch(error => {
                //console.log('useeffect' + error);
            }
            );

        }
    })
    setLoading(false);

    }catch(error){
    console.log(error);
    setLoading(false);
    }
    
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], 
        day = datePart[2];
        Hours = datePart[3];
        Min = datePart[4];
        Sec = datePart[5];
      
        return day+'-'+month+'-'+year+" "+Hours+':'+Min+':'+Sec;
      }
    const renderItem = ({ item }) => {
  
        return( 
        <View style={{}}>
         {item.chatType==1 ? 
         <View style={{width:"100%",padding:5}}>
           <Text style={[styles.chatContentHeader]}>{item.user_id==initialid ? "You" : item.Consultant_Name} <Text style={{fontSize:8,alignContent:"center",alignItems:"center",justifyContent:"center",color:"#BBBBBB"}}> {formatDate(item.created_at)}</Text></Text>
           
           <View style={[item.user_id==initialid ? styles.chatContent : styles.chatContentAdmin,{}]}>
           <Text style={[item.user_id==initialid ? styles.chatContentColor : styles.chatContentAdminColor]}> {item.chatContent}</Text>
           </View>
         </View> : ""}
       
         {item.chatType==2 ? 
           <View style={{width:"100%",padding:5}}>
           <Text style={[styles.chatContentHeader]}>{item.user_id==initialid ? "You" : item.Consultant_Name} <Text style={{fontSize:8,alignContent:"center",alignItems:"center",justifyContent:"center",color:"#BBBBBB"}}> {formatDate(item.created_at)}</Text></Text>
           <Text style={item.user_id==initialid ? styles.chatContent : styles.chatContentAdmin}> 
           <TouchableOpacity onPress={pauseAudio}><FontAwesome5 name="file-download" size={40} color="#2596be" style={{margin:10,fontWeight:'normal',}}/></TouchableOpacity> 
           {download ? <ActivityIndicator color={"#2596be"} sytle={{}}></ActivityIndicator> : ""}
           </Text>
         </View> : ""
       }
         </View>
        );
       };

       useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
        );
        useEffect(() => {
        console.log(chatting);
        }, [])

    return (
      
      <View style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        
        
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('ChatList',{item})} style={{marginTop:20,marginLeft:10,fontWeight:'normal',}}/>

       <View  
      style={{
        backgroundColor:'#191820',    
        alignContent:'center',
        justifyContent:'center',
        flex:1
      }}>

                

                <View style={styles.Container}>
                <ScrollView contentContainerStyle={{ flexWrap: 'nowrap' }} style={{}}>
                        
                            <View style={styles.MainContainer}>
                                
                                
                            <FlatList 
                            data={chatting}
                            key={'#'}
                            keyExtractor={({ id }, index) => id}
                            renderItem={renderItem}
                            inverted
                            contentContainerStyle={{ flexDirection: 'column-reverse' }} 
                            />
                            {loading ? <ActivityIndicator color={"#2596be"} sytle={{}}></ActivityIndicator>:""}

                            </View>
                        
                </ScrollView>
                </View>
        </View>

       

        </View>

    );
}

const styles = StyleSheet.create({
  Container:{padding:20,backgroundColor:'#ffffff',borderTopEndRadius:25,borderTopStartRadius:25,marginTop:5,flex:1,alignContent:'center',justifyContent:'center',},
  MainContainer:{width:"100%",flexDirection:'row',alignContent:'center',justifyContent:'center',marginBottom:22},
  CreditNote:{width:"10%",backgroundColor:"#191820",alignContent:'center',justifyContent:'center',borderRadius:8,marginRight:15,height:32,marginTop:8},
  DebitNote:{width:"10%",backgroundColor:"#191820",alignContent:'center',justifyContent:'center',borderRadius:8,marginRight:15,height:32,marginTop:8},
  TransIconText:{fontSize:20,alignContent:'center',justifyContent:'center',position:'absolute',marginLeft:9,color:'#ffffff'},
  TransferContent:{fontSize:18,alignContent:'center',justifyContent:'center',marginTop:5,color:'#191820'},
  CoinsText:{fontSize:15,fontWeight:'bold',alignContent:'center',justifyContent:'center',color:'#191820',marginTop:10},
  Date:{fontSize:10,alignContent:'center',justifyContent:'center',},
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
  chatContent:{
    padding:5,
    borderRadius:8,
    fontSize:16,
    backgroundColor:"#ffffff",
    color:"#000000",
    width:"100%"
  },
  chatContentAdmin:{
    padding:5,
    borderRadius:8,
    fontSize:16,
    backgroundColor:"#2596be",
    color:"#ffffff",
    width:"100%"
  },
  chatContentHeader:{
    padding:5,
    borderRadius:8,
    fontWeight:'bold',
  },
  chatContentColor:{
    color:"#000000"
  },
  chatContentAdminColor:{
    color:"#ffffff"
  },
});

export default ChatScreen;