import React, { useState,useCallback } from 'react';
import { View,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';

function AssignTask({navigation,route}) {
  const {item}=route.params;
  console.log(JSON.stringify(item));
  const [loginusername,setloginusername] = useState("");
  const [loginmobile,setloginmobile] = useState("");
  const [loginemail,setloginemail] = useState("");
  const [logindesc,setlogindesc] = useState("");
  const[isLoading,setIsLoading]=useState(false);
  const [walletAmount,setwalletAmount]=useState();
  const[coins,setCoins]=useState("");
  const [loginid,setloginid]=useState();
  
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
    await AsyncStorage.getItem('loginid').then(value => {
        if(value!=null)
        {
            setloginid(value);
        }
    })
    await AsyncStorage.getItem('walletAmount').then(value => {
        if(value!=null)
        {
          setwalletAmount(value);
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
    
    const assignTask = () =>{
    
        if(parseInt(walletAmount)<parseInt(coins))
        {
            alert("Insufficient Coins.Please buy...");
            navigation.navigate('Wallet');
            return true;
        }
      setIsLoading(true);
      axios.post(BASE_URL+"assignTask.php", {
        loginid: loginid,
        TaskId:item.taskId,
        AssignedTo:item.user_id,
        CoinsAllocated: coins
      }, {
        headers: {
        }
      }).then(response => {
        if(response.data.code==200){
            setIsLoading(false);
            alert(response.data.message);
            navigation.navigate('Posted')
          }
          else
          {
            alert(response.data.message);
            setIsLoading(false);
            navigation.navigate('Wallet')
            return true;
          }
        }).catch(error => {
          //console.log('useeffect' + error);
      }
     );
       
    }
    
    return (
    <View style={{flex:1}}>
        
       <ScrollView  
      contentContainerStyle={{ flexWrap: 'nowrap' }} 
      style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        <TouchableOpacity>
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('ChatList')} style={{margin:20,fontWeight:'normal',}}/>
        </TouchableOpacity>
        
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                
              }}
        >
          <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                    Assigning Task To
                    </Text>  
              </View>
              
              <Text style={{fontSize:20,fontFamily:'Lato_400Regular',color:'#191820'}}>
              {item.name}
                    </Text> 
                        
            </View> 

            <View style={{width:"85%",backgroundColor:'#ffffff',borderRadius:10,marginBottom:10,paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}}>
              <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:16,marginRight:15,color:"rgba(41, 22, 49, 0.38)"}}>
                      Number of Coins for task
                    </Text>    
              </View>
              
              <TextInput
                    style={[styles.input,{width:"100%",margin:0}]}
                    placeholder="Coins"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={coins}
                    name="profileusername"
                    keyboardType="number-pad"
                    onChangeText={(text) => setCoins(text)}
                />
              
            </View> 

            
                <CustButton
                onPressFunction={assignTask}
                title="Assign"
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

export default AssignTask;