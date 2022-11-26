import React,{useState,useCallback,useEffect} from 'react';
import { View,ScrollView,StyleSheet,Text,TextInput,PermissionsAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import axios from 'axios';
import CustButton from './button';
import { BASE_URL } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';



function Requirement({navigation}) {
  const[isTechLoading,setIsTechLoading]=useState(true);
  const [selectedTech, setSelectedTech] = useState([])
  const [technologies,setTechnologies] = useState([]);
  const [loginusername,setloginusername] = useState("");
  const [loginmobile,setloginmobile] = useState("");
  const [loginemail,setloginemail] = useState("");
  const [logindesc,setlogindesc] = useState("");
  const [loginId,setloginId] = useState("");
  const [desc,setdesc] = useState("");
  const [title,setTitle] = useState("");
  const[isLoading,setLoading]=useState(false);
  const [userTempId,setUserTempId] = useState("");


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

    await AsyncStorage.getItem('loginid').then(value => {
      if(value!=null)
      {
        setloginId(value);
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
    const handleError = (err) => {
      setLoading(false);
      if (DocumentPicker.isCancel(err)) {
        console.warn('cancelled')
        // User cancelled the picker, exit any dialogs or menus and move on
      } else if (isInProgress(err)) {
        console.warn('multiple pickers were opened, only the last will be considered')
      } else {
        throw err
      }
    }

    const requestStoragePermission = async () => {
      try {
        setLoading(true);
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message:
              "Please give permissions so that your audio message will be saved to your local for better experience",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          pickDoc()
        } else {
          requestStoragePermission()
        }
      } catch (err) {
        setLoading(false);
        return true;
        console.warn(err);
      }
    };

    const pickDoc = async ()=>{

                setLoading(true);
                try {
                  //picking image and getting its obj
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                    type:types.zip
                  })
                  var object = Object.assign({}, pickerResult);
                  
                  if(object.size>2000000)
                  {
                    alert("Please upload the file <= 1MB ");
                    return true;
                  }
                  else{
                        //converting image to base 64
                        RNFS.readFile(object.fileCopyUri, 'base64')
                        .then(res =>{
                                      

                          //uploading image message
                                axios.post(BASE_URL+"sendDocChat.php", {
                                  chatContent: res,
                                  studentId: loginId,
                                }, {
                                  headers: {
                                  
                                  }
                                })
                                  .then(response => {
                                    if(response.data.code==200){
                                      console.log(response.data.userTempId);
                                      setUserTempId(response.data.userTempId);
                                      setLoading(false);
                                    }
                                    else
                                    {
                                      alert(response.data.message);
                                      setLoading(false);
                                      return true;
                                    }
                                  }).catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                }
                              );

                        });

                  }
                

                


                } catch (e) {
                  handleError(e)
              
              }

    }
  const postRequirement = async () =>{
    setLoading(true);
    if(selectedTech=="")
    {
      alert("Please Select Technical Skills");
      setLoading(false);
      return true;
    }
    if(title.trim()=="" || desc.trim()=="")
    {
      alert("Please enter Title and Description");
      setLoading(false);
      return true;
    }
    axios.post(BASE_URL+"saveRequirement.php", {
      LoginId:loginId,
      Desc:desc,
      Title:title,
      SelectedTech:JSON.stringify(selectedTech),
      UserTempId:userTempId
    }, {
      headers: {
      }
    }).then(response => {
      
      if(response.data.code==200){
              try{
                  alert(response.data.message);
                  setLoading(false);
                  navigation.navigate('Supporting');
              }catch(error){
                  console.log(error);
                  setLoading(false);
              }
        }
        else
        {
          alert(response.data.message);
          setLoading(false);
          return true;
        }
      }).catch(error => {
        setLoading(false);
        //console.log('useeffect' + error);
    }
   );



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
                     inputPlaceholder="Technical Skills"
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
                    style={[styles.input,{width:"95%",height:50,marginTop:20,padding:5}]}
                    placeholder="Title"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={title}
                    name="title"
                    onChangeText={(text) => setTitle(text)}
                />  

                  <TextInput
                    style={[styles.input,{width:"95%",marginTop:20,padding:5}]}
                    placeholder="Breif Description"
                    placeholderTextColor={'#bdbbbb'}
                    secureTextEntry={false}
                    value={desc}
                    name="desc"
                    multiline ={true}
                    numberOfLines = {4}
                    onChangeText={(text) => setdesc(text)}
                />  

                <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
                <Text style={{fontSize:20,color:"#ffffff"}}>Upload Attachment(*zip)</Text>
                <TouchableOpacity onPress={requestStoragePermission}>
                <FontAwesome5 name="file-upload" size={50} color="white" style={[styles.commonTextFeatures,{marginRight:5}]}/>
                </TouchableOpacity>
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