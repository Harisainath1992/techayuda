import React from 'react';
import { View,ScrollView,StyleSheet,Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustButton from './button';
function Supporting({navigation}) {
  
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
                        <FontAwesome5 name="tasks" size={20} color="white" style={[styles.commonTextFeatures,{}]}/> 2
                        </Text>
                    </View>
                    
                    <View  style={{position:'absolute',right:32,width:"60%",flexDirection:'row',}}>
                    <CustButton
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
                        ></CustButton>
                    </View>
                </View>


                

                <View style={styles.Container}>
                <ScrollView contentContainerStyle={{ flexWrap: 'nowrap' }} style={{}}>
                <Pressable onPress={() => navigation.navigate('TaskDetails')}>
                    <View style={styles.MainContainer}>
                        <View style={styles.CreditNote}>
                          <Text style={styles.TransIconText}>P</Text>
                        </View>
                        <View style={{width:"45%"}}>
                          <Text style={styles.TransferContent}>Task #1234</Text>
                          <Text style={styles.Date}>06-09-2022 to 08-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={[styles.CoinsText,{fontWeight:'normal'}]}>In Review</Text>
                        </View>
                    </View>
                </Pressable>
                    <View style={styles.MainContainer}>
                        <View style={styles.CreditNote}>
                          <Text style={styles.TransIconText}>C</Text>
                        </View>
                        <View style={{width:"45%"}}>
                          <Text style={styles.TransferContent}>Task #1234</Text>
                          <Text style={styles.Date}>06-09-2022 to 08-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={[styles.CoinsText,{fontWeight:'normal'}]}>Closed</Text>
                        </View>
                    </View>


                    <View style={styles.MainContainer}>
                        <View style={styles.DebitNote}>
                          <Text style={styles.TransIconText}>P</Text>
                        </View>
                        <View style={{width:"45%"}}>
                          <Text style={styles.TransferContent}>Task #1234</Text>
                          <Text style={styles.Date}>06-09-2022 to 08-09-2022</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={styles.CoinsText}><FontAwesome5 name="coins" size={10} color="#191820" style={[styles.commonTextFeatures,{color:'#191820'}]}/> 1000</Text>
                        </View>
                        <View style={{width:"20%"}}>
                          <Text style={[styles.CoinsText,{fontWeight:'normal'}]}>Progress</Text>
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

export default Supporting;