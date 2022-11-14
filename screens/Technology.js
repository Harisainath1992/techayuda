import React, { useState,useCallback,useEffect } from 'react';
import { View,StyleSheet,Text,SafeAreaView,FlatList, VirtualizedScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from 'react-native-virtualized-view';
import CustButton from './button';
import { BASE_URL } from './constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Technology({navigation}) {
  
    const [technologies,setTechnologies] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const[isLoading,setIsLoading]=useState(true);
    const getData = async () =>{ try{
        axios.post(BASE_URL+"technologies.php", {
          }, {
            headers: {
            }
          }).then(response => {
            if(response.data.code==200){
                    try{
                        setTechnologies(response.data.technologies);
                        setIsLoading(false);
                    }catch(error){
                        console.log(error);
                        setIsLoading(false);
                    }
              }
              else
              {
                alert(response.data.message);
                setIsLoading(false);
                return true;
              }
            }).catch(error => {
                setIsLoading(false);
              //console.log('useeffect' + error);
          }
         );
        
        }catch(error){
        console.log(error);
        setIsLoading(false);
        }
        
        }
    useFocusEffect(
        useCallback(() => {
            getData()
            
        }, [])
        );
        const renderItem = ({ item }) => (
          <View style={{width:"100%",flexDirection:'row'}}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                tintColors="#ffffff"
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{color:"#ffffff"}}>{item}</Text> 
           </View> 
           );
        
    return (
    <View style={{flex:1,backgroundColor:'#191820',}}>
        
       <ScrollView style={{flex:1,}}>
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('Profile')} style={{margin:20,fontWeight:'normal',}}/>
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                padding:5
              }}
        >
                
               {isLoading ? <Text style={{color:"#ffffff",marginBottom:10}}>Loading...</Text> : <FlatList
                        data={technologies}
                        nestedScrollEnabled
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />}
                    
                

                <CustButton
                onPressFunction={() => navigation.navigate('Supporting')}
                title="Save"
                width="95%"
                ></CustButton>
                

        </View>
        </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
  
});

export default Technology;