import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    ActivityIndicator,
    View
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustButton = (props) => {
  

    const buttonWidth = props.width;
    const rightMargin = props.rightMargin;
    const height = props.height ?  props.height : 50;
    const loading = props.loading;
    return (
              <SafeAreaView style={[loading ? styles.pressableButtonDisable : styles.pressableButton,{width:buttonWidth,marginRight:rightMargin,height:height,flexDirection:"row",}]} >
              {loading ?  <Pressable android_ripple={{color:'#ffffff'}} style={[styles.pressableButtonDisable,{width:buttonWidth,marginRight:rightMargin,height:height,flexDirection:"row",}]}>
                <Text style={[styles.loginText,{color:"#999999"}]}>{props.title} </Text>
                <ActivityIndicator color={"#fff"} sytle={{}}></ActivityIndicator>
              </Pressable>
              : 
              <Pressable android_ripple={{color:'#ffffff'}}  style={[styles.pressableButton,{width:buttonWidth,marginRight:rightMargin,height:height,flexDirection:"row",}]} onPress={props.onPressFunction}>
                <Text style={styles.loginText}>{props.title} </Text>
              </Pressable>}
            </SafeAreaView>
                 )
                }
              
const styles = StyleSheet.create({
   
      pressableButton:{
        backgroundColor:"#ffffff",
        alignItems: 'center',
        justifyContent:'center',
        height:50,
        borderRadius:8
      },
      pressableButtonDisable:{
        backgroundColor:"#DCDCDC",
        alignItems: 'center',
        justifyContent:'center',
        height:50,
        borderRadius:8
      },
      loginText:{
        fontFamily:'Lato_400Regular',
        fontWeight:'bold',
        color:"#191820",
        elevation: 10,
      },
  });


export default CustButton;