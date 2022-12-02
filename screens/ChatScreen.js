import React,{useCallback,useState,useEffect} from 'react';
import { View,TextInput,StyleSheet,Text,FlatList,TouchableOpacity,ActivityIndicator,PermissionsAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import FlashMessage,{showMessage} from "react-native-flash-message";
import axios from 'axios';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { BASE_URL } from './constants';


function ChatScreen({navigation,route}) {
    const {item}=route.params;
    const [loggedinusername,setLoggedinUsername]=useState();
    const [loggedinmobile,setLoggedinMobile]=useState();
    const [loggedinemail,setLoggedinEmail]=useState();
    const [loggedindesc,setLoggedindesc]=useState();
    const [loginid,setloginid]=useState();
    const [loading,setLoading]=useState(false);
    const [chatting,setChatting]=useState();
    const [download,setDownload]=useState(false);
    const [text, onChangeText] = useState("");
    const [tableName, setTableName] = useState("");
    var Hours="";
    var Sec = "";
    var Min = "";
    
  const getData = async () =>{ try{
    setLoading(true);
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

            axios.post(BASE_URL+"getChat.php", {
              acceptedTask: item.id,
            }, {
              headers: {
                
              }
            }).then(response => {
              if(response.data.code==200){
                  try{
                    setChatting(response.data.chatting);
                    setTableName(response.data.tableName);
                    setLoading(false);
                  }catch(error){
                      console.log(error);
                      setLoading(false);
                  }
                            }
                else
                {
                  alert(response.data);
                  setLoading(false);
                  return true;
                }
              }).catch(error => {
                //console.log('useeffect' + error);
            }
            );

        }
    })
    setLoading(false);

    }catch(error){
    console.log(error);
    setLoading(false);
    }
    
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], 
        day = datePart[2];
        Hours = datePart[3];
        Min = datePart[4];
        Sec = datePart[5];
      
        return day+'-'+month+'-'+year+" "+Hours+':'+Min+':'+Sec;
      }


    function downloadFile(fileUrl){
      setDownload(true)
      // File URL which we want to download
      let FILE_URL = fileUrl;   
      
      let splittedData=fileUrl.split("/");
      let fileName = splittedData[splittedData.length - 1];
     
      // config: To get response by passing the downloading related options
      // fs: Root directory path to download
      const { config, fs } = RNFetchBlob;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir+
            '/file_' + 
            fileName,
          description: 'downloading file...',
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,   
        },
      };
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          // Alert after successful downloading
          //console.log('res -> ', JSON.stringify(res));
          var finalres=JSON.stringify(res);
          console.log(JSON.parse(finalres).data);
          
          setDownload(false)
        });
    };



    const renderItem = ({ item }) => {
  
        return( 
        <View style={{}}>
         {item.chatType==1 ? 
         <View style={{width:"100%",padding:5}}>
           <Text style={[item.user_id==loginid ? styles.chatContentHeader : styles.chatContentHeaderAdmin]}>{item.user_id==loginid ? "You" : item.Consultant_Name} <Text style={{fontSize:8,alignContent:"center",alignItems:"center",justifyContent:"center",color:"#BBBBBB"}}> {formatDate(item.created_at)}</Text></Text>
           
           <View style={[item.user_id==loginid ? styles.chatContent : styles.chatContentAdmin,{}]}>
           <Text style={[item.user_id==loginid ? styles.chatContentColor : styles.chatContentAdminColor]}> {item.chatContent}</Text>
           </View>
         </View> : ""}
       
         {item.chatType==2 ? 
           <View style={{width:"100%",padding:5}}>
           <Text style={[styles.chatContentHeader]}>{item.user_id==loginid ? "You" : item.Consultant_Name} <Text style={{fontSize:8,alignContent:"center",alignItems:"center",justifyContent:"center",color:"#BBBBBB"}}> {formatDate(item.created_at)}</Text></Text>
           <Text style={item.user_id==loginid ? styles.chatContent : styles.chatContentAdmin}> 
           <TouchableOpacity onPress={()=>downloadFile(item.chatContent)}><FontAwesome5 name="file-download" size={40} color="#191820" style={{margin:10,fontWeight:'normal',}}/></TouchableOpacity> 
           {download ? <ActivityIndicator color={"#191820"} sytle={{}}></ActivityIndicator> : ""}
           </Text>
         </View> : ""
       }

          <FlashMessage position="top" />
         </View>
        );
       };

       useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
        );
        useEffect(() => {
        console.log(chatting);
        }, [])
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
        const requestCameraPermission = async () => {

          try {
            setLoading(true);
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Storage Permission",
                message:
                  "Please give permissions so that your attachments will be saved to your local device",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              pickDoc()
            } else {
              requestCameraPermission()
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
                  type:types.allFiles
                })
                var object = Object.assign({}, pickerResult);
                
                if(object.size>5000000)
                {
                  alert("Please upload the file <= 5MB ");
                  return true;
                }
                else{
                      //converting image to base 64
                      RNFS.readFile(object.fileCopyUri, 'base64')
                      .then(res =>{
                                    
          
                        //uploading image message
                              axios.post(BASE_URL+"sendDocChatFile.php", {
                                chatContent: res,
                                loginid: loginid,
                                fileType:object.type,
                                chatType:2,
                                userid: item.user_id,
                                tableName:tableName,
                              }, {
                                headers: {
                                
                                }
                              })
                                .then(response => {
                                  if(response.data.code==200){
                                    console.log(response.data);
                                    getData();
                                    setLoading(false);
                                  }
                                  else
                                  {
                                    alert(response.data.message);
                                    return true;
                                    setLoading(false);
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

          async function sendChatContent() {
            setLoading(true);
            //console.log('Stopping recording..');
          
          
             //uploading Text message
             axios.post(BASE_URL+"sendText.php", {
              chatContent: text,
              loginid: loginid,
              chatType:1,
              userid: item.user_id,
              tableName:tableName,
            }, {
              headers: {
              
              }
            })
              .then(response => {
        
                if(response.data.code==200){
                  getData();
                  setLoading(false);
                  onChangeText("");
                }
                else
                {
                  alert(response.data.message);
                  return true;
                }
              }).catch(error => {
                console.log(error);
            }
          );
        
          
          
          }


    return (
      
      <View style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        
        
        <MaterialCommunityIcons name="arrow-left-thin" size={40} color="white" onPress={() => navigation.navigate('ChatList',{item})} style={{marginTop:20,marginLeft:10,fontWeight:'normal',}}/>

       <View  
      style={{
        backgroundColor:'#191820',    
        alignContent:'center',
        justifyContent:'center',
        flex:1
      }}>

                

                <View style={styles.Container}>                                
                    <FlatList 
                    data={chatting}
                    key={'#'}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderItem}
                    inverted
                    contentContainerStyle={{ flexDirection: 'column-reverse' }} 
                    />
                    {loading ? <ActivityIndicator color={"#191820"} sytle={{}}></ActivityIndicator>:""}

                  

                    <View style={{width:"100%",flexDirection:'row',height:"10%",alignItems:'center',justifyContent:'center',bottom:0,marginTop:"2%"}}>

                      <TouchableOpacity  onPress={requestCameraPermission} style={{left:0,}}>
                      <MaterialIcons name="attach-file" size={30} color="#191820" style={{fontWeight:'normal',}}/>
                      </TouchableOpacity >

                          <TextInput
                              style={[styles.input,{width:"77%",}]}
                              placeholder="Type here...."
                              multiline={true}
                              onChangeText={onChangeText}
                              value={text}
                              placeholderTextColor={'#191820'}
                          />

                          <TouchableOpacity  style={{right:0,}} onPressOut={sendChatContent}>
                            <MaterialCommunityIcons name="send-circle" size={40} color="#191820" style={{fontWeight:'normal',}}/>
                          </TouchableOpacity>

                      </View>

                
                </View>
        </View>

       

        </View>

    );
}

const styles = StyleSheet.create({
  Container:{padding:20,backgroundColor:'#ffffff',borderTopEndRadius:25,borderTopStartRadius:25,marginTop:5,flex:1,alignContent:'center',justifyContent:'center',},
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
  chatContent:{
    padding:5,
    borderRadius:8,
    fontSize:16,
    backgroundColor:"#ffffff",
    color:"#000000",
    width:"100%"
  },
  chatContentAdmin:{
    padding:5,
    borderRadius:8,
    fontSize:16,
    backgroundColor:"#191820",
    color:"#ffffff",
    width:"100%",
    alignContent:'flex-end',
    alignItems:'flex-end',
  },
  chatContentHeader:{
    padding:0,
    borderRadius:8,
    fontWeight:'bold',
  },
  chatContentHeaderAdmin:{
    padding:0,
    borderRadius:8,
    fontWeight:'bold',
    alignContent:'flex-end',
    alignItems:'flex-end',
    textAlign:'right'
  },
  chatContentColor:{
    color:"#000000"
  },
  chatContentAdminColor:{
    color:"#ffffff"
  },
  input: {
    marginTop:2,
    borderWidth: 1,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor:'#191820',
    color:"#191820",
    fontFamily:'Lato_400Regular',
    fontWeight:'600',
    borderRadius:6,
    backgroundColor:'#d5edf5',
  },
});

export default ChatScreen;