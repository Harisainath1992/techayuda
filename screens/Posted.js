import React,{useCallback,useState,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text,FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';
function Posted({navigation}) {
  const [loggedinusername,setLoggedinUsername]=useState();
  const [loggedinmobile,setLoggedinMobile]=useState();
  const [loggedinemail,setLoggedinEmail]=useState();
  const [loggedindesc,setLoggedindesc]=useState();
  const [loginid,setloginid]=useState();
  const [taskValues,setTaskValues]=useState();
  const [taskCount,settaskCount]=useState("0");

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

    await AsyncStorage.getItem('loginid').then(value => {
        if(value!=null)
        {
            setloginid(value);
            axios.post(BASE_URL+"getTaskDetails.php", {
              LoginId: value,
            }, {
              headers: {
                
              }
            }).then(response => {
              if(response.data.code==200){
                  try{
                    setTaskValues(response.data.data);
                    settaskCount(response.data.count);
                  }catch(error){
                      console.log(error);
                  }
                            }
                else
                {
                  alert(response.data);
                  return true;
                }
              }).catch(error => {
                //console.log('useeffect' + error);
            }
            );

        }
    })
    }catch(error){
    console.log(error);
    }
    
    }
  
    const ItemRender = ({ item }) => (
      <View style={{}}>

                    <View style={styles.MainContainer}>
                        <View style={styles.CreditNote}>
                          <Text style={styles.TransIconText}>{item.taskKeyWord}</Text>
                        </View>
                        <View style={{width:"40%"}}>
                        <Pressable onPress={() => navigation.navigate('PostedTaskDetails')}>
                          <Text style={styles.TransferContent}>{item.Title}</Text>
                          <Text style={styles.Date}>{item.start_date} - {item.end_date}</Text>
                        </Pressable>
                        </View>
                        <View style={{width:"20%"}}>
                        
                          <Text style={[styles.CoinsText,{fontWeight:'normal'}]}>{item.taskStage}</Text>
                        
                        </View>

                        <View style={{width:"25%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                        <Pressable onPress={() => navigation.navigate('ChatList')} style={{marginLeft:10}}>
                          <Text style={styles.CoinsText}>
                          <MaterialCommunityIcons name="chat" size={25} color="#191820" style={{}}/>
                            </Text>
                        </Pressable>
                        </View>
                    </View>
      </View>
    );

    useFocusEffect(
      useCallback(() => {
          getData()
      }, [])
    );
    useEffect(() => {
     console.log(taskValues);
      }, [])
    
    return (
      
      <View style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        
        
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Dashboard')} style={{marginTop:20,marginLeft:10,fontWeight:'normal',}}/>

       <View  
      style={{
        backgroundColor:'#191820',    
        alignContent:'center',
        justifyContent:'center',
        flex:1
      }}>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent:'center',
                        padding:30,
                        flexDirection:'row',
                        width:"100%",
                    }}
                >
                    
                   
                    <View style={{position:'absolute',left:20,width:"40%",}}>
                    <Text style={[styles.tagLine,styles.commonTextFeatures]}>Active Task's</Text>
                        <Text style={[styles.welcomeText]}>
                        <FontAwesome5 name="tasks" size={20} color="white" style={[styles.commonTextFeatures,{}]}/> {taskCount}
                        </Text>
                    </View>
                    
                    <View  style={{position:'absolute',right:32,width:"60%",flexDirection:'row',}}>
                    {/* <CustButton
                        onPressFunction={() => navigation.navigate('Pending')}
                        title="Pending"
                        width="50%"
                        rightMargin={10}
                        height={40}
                        ></CustButton>
                        <CustButton
                        onPressFunction={() => navigation.navigate('Completed')}
                        title="Completed"
                        width="50%"
                        height={40}
                        ></CustButton> */}
                    </View>
                </View>


                

                <View style={styles.Container}>
                <ScrollView contentContainerStyle={{ flexWrap: 'nowrap' }} style={{}}>
                
                    




                        <FlatList
                            data={taskValues}
                            keyExtractor={({ id }) => id}
                            renderItem={ItemRender}
                        />
                
                    


                </ScrollView>
                </View>
        </View>

       

        </View>

    );
}

const styles = StyleSheet.create({
  Container:{padding:20,backgroundColor:'#ffffff',borderTopEndRadius:25,borderTopStartRadius:25,marginTop:30,flex:1,alignContent:'center',justifyContent:'center',},
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
});

export default Posted;