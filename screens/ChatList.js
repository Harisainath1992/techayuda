import React from 'react';
import { View,ScrollView,StyleSheet,Text,Dimensions } from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function ChatList({navigation}) {
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
  let ScreenHeight = Dimensions.get("window").height;
    return (
    <View style={{flex:1}}>
       <View style={{height: ScreenHeight,backgroundColor:'#191820',}} >
        <ScrollView  
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
                    <ScrollView contentContainerStyle={{ flexWrap: 'nowrap' }} style={{height: ScreenHeight-250}}>
                    
                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>1</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>


                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>2</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>


                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>3</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>



                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>4</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>



                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>5</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>



                    <View style={styles.MainContainer}>
                            <View style={styles.CreditNote}>
                            <Text style={styles.TransIconText}>6</Text>
                            </View>
                            <View style={{width:"50%"}}>
                            <Text style={styles.TransferContent}>Hari Sainath</Text>
                            </View>
                        <View style={{width:"40%",alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:-10,flexDirection:'row'}}>
                            <Text style={[styles.CoinsText,{marginRight:25}]}>
                            <MaterialCommunityIcons name="chat" size={30} color="#191820" style={{}}/>
                                </Text>
                            <Text style={styles.CoinsText}>
                                <FontAwesome5 name="check-circle" size={25} color="#191820" style={{}}/>
                            </Text>
                            </View>
                    </View>
                   
                    </ScrollView>
                </View>



            </View>
            </ScrollView>

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