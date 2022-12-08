import React,{useCallback,useState,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text,Dimensions,TouchableOpacity,FlatList,SafeAreaView  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from './constants';

function ChatList({navigation,route}) {
  const {item}=route.params;
  let ScreenHeight = Dimensions.get("window").height;
  const [loggedinusername,setLoggedinUsername]=useState();
  const [loggedinmobile,setLoggedinMobile]=useState();
  const [loggedinemail,setLoggedinEmail]=useState();
  const [loggedindesc,setLoggedindesc]=useState();
  const [loginid,setloginid]=useState();
  const [loading,setLoading]=useState(false);
  const [taskAcceptedUser,setTaskAcceptedUser]=useState("");

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

            axios.post(BASE_URL+"getTaskAcceptedList.php", {
              TaskId: item.id,
            }, {
              headers: {
                
              }
            }).then(response => {
              if(response.data.code==200){
                  try{
                    setTaskAcceptedUser(response.data.user);
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

    const assignTask = (item) => {
        navigation.navigate('AssignTask',{item});
    }
    const ItemRender = ({ item,index }) => (
        <View style={styles.MainContainer}>
                    <View style={[styles.CreditNote,]}>
                    <Text style={[styles.TransIconText,{color:item.color}]}>{item.sno}</Text>
                    </View>
                    <View style={{width:"50%"}}>
                    <Text style={[styles.TransferContent,{color:item.color}]}>{item.name}</Text>
                    </View>
                <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                    <Text style={[styles.CoinsText,{marginRight:25}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen',{item})}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{color:item.color}}/>
                        </TouchableOpacity>
                        </Text>
                    {item.assigned ? 
                    <Text style={[styles.CoinsText,{color:item.color}]}>
                        <FontAwesome5 name="check-circle" size={25} color="#191820" style={{color:item.color}}/>
                    </Text> : 
                    <Text style={styles.CoinsText}>
                        <TouchableOpacity onPress={()=>assignTask(item)}>
                            <FontAwesome5 name="check-circle" size={25} color="#191820" style={{color:item.color}}/>
                        </TouchableOpacity>
                    </Text>}

                    </View>
            </View>
      );
    
    useFocusEffect(
    useCallback(() => {
        getData()
    }, [])
    );
    useEffect(() => {
    console.log(taskAcceptedUser);
    }, [])

    return (
    <View style={{flex:1}}>
       <View style={{height: ScreenHeight,backgroundColor:'#191820',}} >
        <SafeAreaView   
        contentContainerStyle={{ flexWrap: 'nowrap' }} 
        style={{
            backgroundColor:'#191820',
        }}>
            <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Posted')} style={{margin:20,fontWeight:'normal',}}/>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    padding:5
                }}
            >
        
        

                <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10,marginTop:10}}>
                    <View style={{flexDirection:'row',marginBottom:5}}>
                        <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                            Request Accepted Supporters
                        </Text>    
                    </View>
                    <SafeAreaView  contentContainerStyle={{ flexWrap: 'nowrap' }} style={{height: ScreenHeight-250}}>
                    
                    
                    {loading ? <Text style={{color:"#191820"}}>loading....</Text> : <FlatList
                            data={taskAcceptedUser}
                            keyExtractor={({ id }) => id}
                            renderItem={ItemRender}
                        />}

                    </SafeAreaView >
                </View>



            </View>
            </SafeAreaView >

        </View> 

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

export default ChatList;