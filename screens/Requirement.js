import React,{useState,useCallback,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text,TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';


function Requirement({navigation}) {
  const[isTechLoading,setIsTechLoading]=useState(true);
  const [selectedTech, setSelectedTech] = useState([])
  const [technologies,setTechnologies] = useState([]);
  const [loginusername,setloginusername] = useState("");
  const [loginmobile,setloginmobile] = useState("");
  const [loginemail,setloginemail] = useState("");
  const [desc,setdesc] = useState("");
  const [title,setTitle] = useState("");
  const[isLoading,setIsLoading]=useState(false);


  useFocusEffect(
    useCallback(() => {
        getData()
        
    }, [])
  );
  useEffect(() => {
    console.log(technologies);
  }, [technologies]);

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
    axios.post(BASE_URL+"technologies.php", {
    }, {
      headers: {
      }
    }).then(response => {
      
      if(response.data.code==200){
              try{
                  setTechnologies(response.data.technologies);
                  setIsTechLoading(false);
              }catch(error){
                  console.log(error);
                  setIsTechLoading(false);
              }
        }
        else
        {
          alert(response.data.message);
          setIsTechLoading(false);
          return true;
        }
      }).catch(error => {
        setIsTechLoading(false);
        //console.log('useeffect' + error);
    }
   );


    }catch(error){
    console.log(error);
    }
    
    }

  const postRequirement = async () =>{

  }
    function onMultiChange() {
      return (item) => setSelectedTech(xorBy(selectedTech, [item], 'id'))
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
                padding:5
              }}
        >
       
              
       {isTechLoading ? <Text style={{color:"#ffffff",marginBottom:10}}>Loading...</Text> : 
               
               <ScrollView nestedScrollEnabled={true} style={{width:"95%"}}>
               <SelectBox
                     options={technologies}
                     selectedValues={selectedTech}
                     onMultiSelect={onMultiChange()}
                     onTapClose={onMultiChange()}
                     inputPlaceholder="Search Your Technical Skills"
                     label=""
                     multiOptionContainerStyle={{backgroundColor:"#191820",}}
                     optionContainerStyle={{backgroundColor:"#ffffff",}}
                     inputFilterContainerStyle={{backgroundColor:"#ffffff",}}
                     containerStyle={{backgroundColor:'#ffffff',padding:10,}}
                     multiOptionsLabelStyle={{color:"#ffffff",fontWeight:'bold',}}
                     listOptionProps={{ nestedScrollEnabled: true }}
                     isMulti
                   />
                   </ScrollView>
               
               }
              
              <TextInput
                    style={[styles.input,{width:"95%",margin:0,padding:5}]}
                    placeholder="Title"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={logindesc}
                    name="logindesc"
                    multiline ={true}
                    numberOfLines = {4}
                    onChangeText={(text) => setTitle(text)}
                />  

                  <TextInput
                    style={[styles.input,{width:"95%",margin:0,padding:5}]}
                    placeholder="Breif Description"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={logindesc}
                    name="logindesc"
                    multiline ={true}
                    numberOfLines = {4}
                    onChangeText={(text) => setdesc(text)}
                />  

                <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
                <Text style={{fontSize:20,color:"#ffffff"}}>Upload Attachment(*zip)</Text>
                <FontAwesome5 name="file-upload" size={50} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </View>

                <CustButton
                onPressFunction={postRequirement}
                title="Post"
                width="95%"
                loading={isLoading}
                ></CustButton>
                

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
        padding: 5,
        borderColor:'#2e2d35',
        color:"#ffffff",
        fontWeight:'600',
        borderRadius:10,
        backgroundColor:'#413e4f'
      },
});

export default Requirement;