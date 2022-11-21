import React,{useState,useCallback} from 'react';
import { View,ScrollView,StyleSheet,Image,Text,TextInput,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const JSON5 = require('json5')
import { BASE_URL } from './constants';
import CustButton from './button';

function Login({navigation}) {

  const[isLoading,setIsLoading]=useState(false);
  const [emailError,setemailError]=useState();
  const [passwordError,setpasswordError]=useState();

  const [email,setemail]=useState();
  const [password,setpassword]=useState();


  const getData = () =>{ try{
    AsyncStorage.getItem('loginusername').then(value => {
      if(value!=null)
      {
        navigation.navigate('Dashboard',{});
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

  const removeItemValue= async (key)=> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}
const LoginDetails = async () =>{
  setIsLoading(true);
  
  if(email=='' || email=='undefined' || email==null)
  {  setemailError("Please Enter Email");setIsLoading(false);return true;}
  else
    {setemailError("");}
  
  if(password=="" || password=='undefined' || password==null)
  {setpasswordError("Please Enter password");setIsLoading(false);return true;}
  else
  {setpasswordError("");}


  axios.post(BASE_URL+"login.php", {
    LoginEmail: email,
    LoginPassword: password,
  }, {
    headers: {
      'LoginEmail': email,
      'LoginPassword': password,
    }
  }).then(response => {
    if(response.data.code==200){
        setIsLoading(false);
        try{
            AsyncStorage.setItem("loginusername",response.data.loginusername);
            AsyncStorage.setItem("loginmobile",response.data.loginmobile);
            AsyncStorage.setItem("loginid",response.data.loginid);
            AsyncStorage.setItem("loginemail",response.data.loginemail);
            AsyncStorage.setItem("loginDesc",response.data.loginDesc);
            AsyncStorage.setItem("walletAmount",response.data.walletAmount);
        }catch(error){
            console.log(error);
        }
        removeItemValue("loginpassword");
        navigation.navigate('Dashboard');
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

    return (
    <View style={{flex:1}}>
        
       <ScrollView  
      contentContainerStyle={{ flexWrap: 'nowrap' }} 
      style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                padding:20
              }}
        >
          <Text style={{fontSize:20,textAlign:'center',justifyContent:'center',alignItems:'center',color:'#ffffff'}}><Text style={{fontSize:35,color:'#ffffff'}}>T</Text>ech <Text style={{fontSize:35,color:'#ffffff'}}>A</Text>yuda</Text>

              
              <TextInput
                    style={[styles.input,{width:"95%",}]}
                    placeholder="Email"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    name="loginemail"
                    placeholderTextColor={'#bdbbbb'}
                    onChangeText={(text) => setemail(text)}
                />

                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{emailError}</Text>
                </View>

                <TextInput
                    style={[styles.input,{width:"95%",}]}
                    placeholder="Password"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={true}
                    name="loginpassword"
                    onChangeText={(text) => setpassword(text)}
                />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{passwordError}</Text>
                </View>
                   
                <CustButton
                onPressFunction={LoginDetails}
                title="Login"
                width="95%"
                loading={isLoading}
                ></CustButton>

                <View style={{flexDirection:"row",alignContent:"center",alignItems:"center",justifyContent:"center",width:"100%"}}>
                <TouchableOpacity style={{marginTop:30}} onPress={()=>navigation.navigate('Register')}>
                <Text style={{fontWeight:'bold',color:'#ffffff',fontSize:18,}}> Register ? </Text>
                </TouchableOpacity> 
                <TouchableOpacity style={{marginTop:30}}><Text> | </Text></TouchableOpacity> 
                <TouchableOpacity style={{marginTop:30}} onPress={()=>navigation.navigate('ForgotPassword')}>
                <Text style={{fontWeight:'bold',color:'#ffffff',fontSize:18,}}> Forgot Password ?</Text>
                </TouchableOpacity>
                </View>
        </View>
        </ScrollView>

       
        </View>
    );
}



const styles = StyleSheet.create({
  Logo:{
    width:120,
    height:120,
    borderRadius:60,
  },
  input: {
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderColor:'#2e2d35',
    color:"#ffffff",
    fontWeight:'600',
    borderRadius:10,
    backgroundColor:'#413e4f'
  },
});

export default Login;