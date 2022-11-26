import React,{useCallback,useState,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DataTable } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';


function PostedTaskDetails({navigation,route}) {
  const {item}=route.params;
  const [loggedinusername,setLoggedinUsername]=useState();
  const [loggedinmobile,setLoggedinMobile]=useState();
  const [loggedinemail,setLoggedinEmail]=useState();
  const [loggedindesc,setLoggedindesc]=useState();
  const [loginid,setloginid]=useState();
  const [taskTitle,setTaskTitle]=useState("");
  const [taskDesc,settaskDesc]=useState("");
  const [taskAttachment,settaskAttachment]=useState();
  const [Techonlogies,setTechonlogies]=useState();
  const [TaskStage,setTaskStage]=useState();
  const [TaskStartDate,setTaskStartDate]=useState();
  const [TaskEndDate,setTaskEndDate]=useState();
  const [TaskCoins,setTaskCoins]=useState();
  const [TaskAssignedTo,setTaskAssignedTo]=useState();

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
            axios.post(BASE_URL+"getTaskRecordDetails.php", {
              TaskId: item.id,
            }, {
              headers: {
                
              }
            }).then(response => {
              if(response.data.code==200){
                  try{
                    setTaskTitle(response.data.title);
                    settaskDesc(response.data.desc);
                    settaskAttachment(response.data.attachment);
                    setTechonlogies(response.data.SelectedTech);
                    setTaskStage(response.data.taskStage);
                    setTaskStartDate(response.data.start_date);
                    setTaskEndDate(response.data.end_date);
                    setTaskCoins(response.data.coinsAllocated);
                    setTaskAssignedTo(response.data.assigned_to);
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

    useFocusEffect(
      useCallback(() => {
          getData()
      }, [])
    );
    useEffect(() => {
     console.log(taskTitle);
      }, [])


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
       
       <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Title
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {taskTitle}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Selected Technologies
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {JSON.stringify(Techonlogies)}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Task Status
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {TaskStage}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Task Timeline
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {TaskStartDate} - {TaskEndDate}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Coins Allocated
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {TaskCoins}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                      Assigned To
                    </Text>                         
              </View>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:18,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {TaskAssignedTo}
                  </Text>  
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Description
                    </Text>       
              </View>
              <View style={{flexDirection:'row',}}>
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
                    {taskDesc}
                    </Text> 
              </View>
        </View>

        <View style={styles.blockdesign}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,fontFamily:'Lato_400Regular',color:"rgba(41, 22, 49, 0.38)"}}>
                    Attachment (Click to Dwonload)
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
                title="Close"
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
  },
  blockdesign:{width:"85%",backgroundColor:'#ffffff',borderRadius:6,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}
  
});

export default PostedTaskDetails;