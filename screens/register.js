import React,{useState,useCallback} from 'react';
import { View,ScrollView,StyleSheet,TextInput,Text,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CustButton from './button';
import CustInput from './textFields';
import DropDownMultiSelect from './dropDown';
import { BASE_URL } from './constants';

function Register({navigation}) {
  const [userNameError,setuserNameError]=useState();
  const [mobileError,setmobileError]=useState();
  const [emailError,setemailError]=useState();
  const [passwordError,setpasswordError]=useState();
  const [descError,setdescError]=useState();
  const[isLoading,setIsLoading]=useState(false);
  

  const [reguserName,setreguserName]=useState();
  const [regmobile,setregmobile]=useState();
  const [regemail,setregemail]=useState();
  const [regpassword,setregpassword]=useState();
  const [regdesc,setregdesc]=useState();


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

const registerDetails = async () =>{
  setIsLoading(true);

  if(reguserName=='' || reguserName=='undefined' || reguserName==null)
  {  setuserNameError("Please Enter Username");setIsLoading(false);return true;}
  else
    {setuserNameError("");}
  
  if(regmobile=="" || regmobile=='undefined' || regmobile==null)
  {setmobileError("Please Enter Mobile Number");setIsLoading(false);return true;}
  else
  {setmobileError("");}

  if(regemail=="" || regemail=='undefined' || regemail==null)
  {setemailError("Please Enter Email Id");setIsLoading(false);return true;}
  else
  {setemailError("");}
  if(regpassword=="" || regpassword=='undefined' || regpassword==null)
  {setpasswordError("Please Enter Password");setIsLoading(false);return true;}
  else
  {setpasswordError("");}
  if(regdesc=="" || regdesc=='undefined' || regdesc==null)
  {setdescError("Please Enter Breif Description About You.");setIsLoading(false);return true;}
  else
  {setdescError("");}

  axios.post(BASE_URL+"register.php", {
    Username: reguserName,
    Mobile: regmobile,
    Email: regemail,
    Password:regpassword,
    Description:regdesc,
  }, {
    headers: {
      'Username': reguserName,
      'Mobile': regmobile,
      'Email': regemail,
      'Password':regpassword,
      'Description':regdesc,
    }
  }).then(response => {
    alert(response.data.message);
    setIsLoading(false);
    if(response.data.code==200){
        navigation.navigate('Login');
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
                style={[styles.input,{width:"95%",height:50}]}
                placeholder="Username"
                secureTextEntry={false}
                placeholderTextColor={'#bdbbbb'}
                onChangeText={(text) => setreguserName(text)}
                name="username"
              />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{userNameError}</Text>
                </View>
              <TextInput
                    style={[styles.input,{width:"95%",height:50}]}
                    placeholder="Mobile"
                    secureTextEntry={false}
                    placeholderTextColor={'#bdbbbb'}
                    keyboardType="number-pad"
                    onChangeText={(text) => setregmobile(text)}
                    name="mobile"
                />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{mobileError}</Text>
                </View>
              <TextInput
                    style={[styles.input,{width:"95%",height:50}]}
                    placeholder="Email"
                    secureTextEntry={false}
                    placeholderTextColor={'#bdbbbb'}
                    keyboardType="email-address"
                    onChangeText={(text) => setregemail(text)}
                    name="email"
                />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{emailError}</Text>
                </View>

              <TextInput
                    style={[styles.input,{width:"95%",height:50}]}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor={'#bdbbbb'}
                    onChangeText={(text) => setregpassword(text)}
                    name="password"
                />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{passwordError}</Text>
                </View>

             
              <TextInput
                    style={[styles.input,{width:"95%",height:80}]}
                    placeholder="Breif About You"
                    secureTextEntry={false}
                    multiline ={true}
                    numberOfLines={4}
                    placeholderTextColor={'#bdbbbb'}
                    onChangeText={(text) => setregdesc(text)}
                    name="description"
                />
                <View style={{alignItems:'flex-start',width:"92%"}}>
                <Text style={{color:"red"}}>{descError}</Text>
                </View>
              
                <CustButton
                onPressFunction={registerDetails}
                title="Register"
                width="95%"
                loading={isLoading}
                ></CustButton>


                <TouchableOpacity style={{marginTop:30}} onPress={()=>navigation.navigate('Login')}>
                
                <Text style={{fontWeight:'bold',color:'#ffffff',fontSize:18,}}> Login ?</Text>

                </TouchableOpacity>
        </View>
        </ScrollView>

       
        </View>
    );
}

const styles = StyleSheet.create({
  Logo:{
    width:140,
    height:140,
    borderRadius:70,
  },
  selectField:{
    fontFamily:'Lato_400Regular',
    fontWeight:'600',
    width:"100%"
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

export default Register;