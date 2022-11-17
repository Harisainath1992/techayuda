import React,{useCallback,useState} from 'react';
import { View,ScrollView,StyleSheet,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CustButton from './button';
function Wallet({navigation}) {

  const[isLoading,setIsLoading]=useState(false);
    const [loggedinusername,setLoggedinUsername]=useState();
    const [loggedinmobile,setLoggedinMobile]=useState();
    const [loggedinemail,setLoggedinEmail]=useState();
    const [loggedindesc,setLoggedindesc]=useState();
    const [loginid,setloginid]=useState();
    const [walletAmount,setwalletAmount]=useState("0");

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
        

        axios.post(BASE_URL+"getWalletDetails.php", {
          Loginid:loginid
        }, {
          headers: {
          }
        }).then(response => {
          if(response.data.code==200){
              setIsLoading(false);
              setwalletAmount(response.data.walletamount);
            }
            else
            {
              alert(response.data.message);
              setIsLoading(false);
              navigation.navigate('Dashboard');
              return true;
            }
          }).catch(error => {
            //console.log('useeffect' + error);
        }
       );
      


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
      
      <View style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white"  style={{marginTop:20,marginLeft:10,fontWeight:'normal',}}/></TouchableOpacity>

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
                    
                   
                    <View style={{position:'absolute',left:20,width:"35%",}}>
                    <Text style={[styles.tagLine,styles.commonTextFeatures]}>Wallet Balance</Text>
                        <Text style={[styles.welcomeText]}>
                        <FontAwesome5 name="coins" size={20} color="white" style={[styles.commonTextFeatures,{}]}/> {walletAmount}
                        </Text>
                    </View>
                    
                    <View  style={{position:'absolute',right:35,width:"65%",flexDirection:'row',}}>
                    <CustButton
                        onPressFunction={() => navigation.navigate('BuyCoins')}
                        title="Buy"
                        width="50%"
                        rightMargin={8}
                        height={40}
                        ></CustButton>
                        <CustButton
                        onPressFunction={() => navigation.navigate('TransferCoins')}
                        title="Send"
                        width="50%"
                        rightMargin={8}
                        height={40}
                        ></CustButton>
                        
                    </View>
                </View>


                

                <View style={styles.Container}>
                <ScrollView contentContainerStyle={{ flexWrap: 'nowrap' }} style={{}}>
                    <View style={styles.MainContainer}>
                        <View style={styles.CreditNote}>
                          <Text style={styles.TransIconText}>C</Text>
                        </View>
                        <View style={{width:"65%"}}>
                          <Text style={styles.TransferContent}>Online Purchase</Text>
                          <Text style={styles.Date}>06-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                    </View>

                    <View style={styles.MainContainer}>
                        <View style={styles.CreditNote}>
                          <Text style={styles.TransIconText}>C</Text>
                        </View>
                        <View style={{width:"65%"}}>
                          <Text style={styles.TransferContent}>Transfer By Madan</Text>
                          <Text style={styles.Date}>06-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                        <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                    </View>


                    <View style={styles.MainContainer}>
                        <View style={styles.DebitNote}>
                          <Text style={styles.TransIconText}>D</Text>
                        </View>
                        <View style={{width:"65%"}}>
                          <Text style={styles.TransferContent}>Transferred To Hari</Text>
                          <Text style={styles.Date}>06-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                        <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                    </View>
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

export default Wallet;