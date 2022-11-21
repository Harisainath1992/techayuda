import React,{useState,useCallback} from 'react';
import { View,ScrollView,StyleSheet,TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from './constants';
import CustButton from './button';



function Withdrawl({navigation}) {
  const [coins,setCoins]=useState();
    const [transferEmail,settransferEmail]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    const [loggedinusername,setLoggedinUsername]=useState();
    const [loggedinmobile,setLoggedinMobile]=useState();
    const [loggedinemail,setLoggedinEmail]=useState();
    const [loggedindesc,setLoggedindesc]=useState();
    const [loginid,setloginid]=useState();

    const widthdrawRequest = () =>{
      setIsLoading(true);
      if(coins!='' && coins>=0)
      {
        if(transferEmail!='')
        {
          axios.post(BASE_URL+"withdrawlCoins.php", {
              Coins: coins,
              Loginid:loginid,
              Email:transferEmail
            }, {
              headers: {
              }
            }).then(response => {
              alert(response.data);
              if(response.data.code==200){
                  setIsLoading(false);
                  AsyncStorage.setItem("walletAmount",response.data.walletAmount);
                  //AsyncStorage.setItem("walletTransaction",JSON.stringify(response.data.walletTransaction));
                  alert(response.data.message);
                  navigation.navigate('Wallet');
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
        else
        {
          alert("Please enter your paypal email.");
          setIsLoading(false);
        }
      }
      else
      {
        alert("Please enter coins greater than 0.");
        setIsLoading(false);
      }
    }

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
             

              
              <TextInput
                    style={[styles.input,{width:"95%",}]}
                    placeholder="Total Coins to Withdraw"
                    secureTextEntry={false}
                    placeholderTextColor={'#bdbbbb'}
                    onChangeText={(text) => setCoins(text)}
                    keyboardType="number-pad"
                    name="coins"
                />

                <TextInput
                    style={[styles.input,{width:"95%",}]}
                    placeholder="Add Your Paypal address"
                    secureTextEntry={false}
                    placeholderTextColor={'#bdbbbb'}
                    onChangeText={(text) => settransferEmail(text)}
                    keyboardType="email-address"
                    name="paypal"
                />

                <CustButton
                onPressFunction={widthdrawRequest}
                title="Withdraw"
                loading={isLoading}
                width="95%"
                ></CustButton>
        </View>
        </ScrollView>

       
        </View>
    );
}

const styles = StyleSheet.create({
  Logo:{
    width:80,
    height:80,
    borderRadius:40,
  },
  selectField:{
    fontFamily:'Lato_400Regular',
    fontWeight:'600',
    width:"100%"
  },
  dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
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

export default Withdrawl;