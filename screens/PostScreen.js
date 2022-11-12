import React from 'react';
import { View,Image,StyleSheet,Text,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import CustButton from './button';
export default function PostScreen({navigation}) {

    return (
        <View style={{
            backgroundColor:'#191820',
            flex:1,
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center'
          }}>

            <Image
            style={styles.stretch}
            source={require('../assets/images/done.png')}
            />
            <WebView
            startInLoadingState={true} style = {{marginTop: 20, width: Dimensions.get('window').width-40, backgroundColor:'#191820',color:'#ffffff'}}
                source={{ html: "<p style='text-align: justify;zoom:3;color:white'>Your requirement has been successfully posted. Supporting team will accept your request so that you can proceed further. Please click below to view the accepted request.</p>" }}
            />
            <CustButton
                onPressFunction={() => navigation.navigate('Dashboard')}
                title="Proceed to View"
                width="100%"
                ></CustButton>
        </View>
    )
}

const styles = StyleSheet.create({
    stretch:{
        width: '25%',
        height: undefined,
        aspectRatio: 1,
    },
    
  });