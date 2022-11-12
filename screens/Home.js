import * as React from 'react';
import {useState} from 'react';
import { View,Dimensions,ScrollView,FlatList,StyleSheet,Text,Image,Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { SBItem } from './SBItem';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export const ElementsText = {
    AUTOPLAY: 'AutoPlay',
};
export const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;
const colors = [
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
];
const state = {
  data: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'],
  index: 1,
}


function Index({navigation}) {
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
    const [isVertical, setIsVertical] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [pagingEnabled, setPagingEnabled] = useState(true);
    const [snapEnabled, setSnapEnabled] = useState(true);
    const progressValue = useSharedValue(0);
    const baseOptions = ({
              vertical: false,
              width: PAGE_WIDTH * 0.85,
              height: PAGE_WIDTH * 1.05,
          });
         

    return (
    <View style={{flex:1}}>
        
        {/*Header Menu Navigation*/}
        <View style={styles.Container}>
            <ScrollView
            horizontal
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                width: '100%',
                textAlign: "center",
                padding:15
              }}    
            >
                <Pressable style={{width:"25%"}} onPress={() => navigation.navigate('LiveTv')} ><View  style={styles.textTabActive}><Text  style={styles.textStyle}>LIVE TV</Text></View></Pressable>
                <Pressable style={{width:"25%"}} onPress={() => navigation.navigate('Exclusive')} ><View  style={styles.textTab}><Text style={styles.textStyle}>EXCLUSIVE</Text></View></Pressable>
                <Pressable style={{width:"25%"}} onPress={() => navigation.navigate('Movies')} ><View  style={styles.textTab}><Text style={styles.textStyle}>MOVIES</Text></View></Pressable>
                <Pressable style={{width:"25%"}} onPress={() => navigation.navigate('TvShows')} ><View  style={styles.textTab}><Text style={styles.textStyle}>TV SHOWS</Text></View></Pressable>

            </ScrollView>
        </View>




      <ScrollView  
      contentContainerStyle={{ flexWrap: 'nowrap' }} 
      style={{
        backgroundColor:'#191820',
        flex:1,
      }}>
        <View
            style={{
                alignItems: 'center',
              }}
        >
            <Carousel
                {...baseOptions}
                loop
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={2000}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.82,
                    parallaxScrollingOffset: 50,
                    parallaxAdjacentItemScale:0.82,
                }}
                data={colors}
                style={{top:-15,}}
                renderItem={({ index }) => <SBItem index={index} />}
            />
            {!!progressValue && (
                <View
                    style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: 100,
                                  alignSelf: 'center',
                                  top:-50,
                          }}
                >
                    {colors.map((backgroundColor, index) => {
                        return (
                            <PaginationItem
                                backgroundColor={backgroundColor}
                                animValue={progressValue}
                                index={index}
                                key={index}
                                isRotate={isVertical}
                                length={colors.length}
                            />
                        );
                    })}
                </View>
            )}
            



            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Continue Watching</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/pose.png')} />
                                        <Image
                                        style={{width:22,height:22,position:'absolute',top:7,left:10}}
                                        source={require('../assets/images/crown.png')} />
                                        <Image
                                        style={{width:26,height:26,position:'absolute',bottom:20,right:15}}
                                        source={require('../assets/images/play.png')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>ETV Exclusives</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsVerticalScrollIndicator={true}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionBigSingle}
                                        source={require('../assets/images/beauty.png')} />
                                    <Image
                                        style={{position:'absolute',width:'20%',height:'47%',left:40}}
                                        source={require('../assets/images/premium-tag.png')} />

                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Before TV</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Live TV</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/stepup.png')} />
                                </View>
                        }
                    />




            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>TV Shows</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionBigWithBorder}
                                        source={require('../assets/images/greatescape.png')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Trending Shows</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/wakeupsid.jpg')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Recommended For You</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/joy.jpg')} />
                                </View>
                        }
                    />



            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Top Movies</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Family</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />  
              <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Comedy</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />
            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Romance</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />
            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Classic</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />
              <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Mythology / Folklore</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />
              <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Action / Thriller</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionVertical}
                                        source={require('../assets/images/reality.png')} />
                                </View>
                        }
                    />


            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Latest News</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/joy.jpg')} />
                                </View>
                        }
                    />

            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Explore By Channels</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionCircle}
                                        source={require('../assets/images/etvwin.png')} />
                                </View>
                        }
                    />

            <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Health Fitness</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/joy.jpg')} />
                                </View>
                        }
                    />
             

             <View style={styles.sectionHeaderView}>
                <Text style={styles.sectionHeader}>Food</Text>
                <Text style={styles.sectionHeaderMore}>+MORE</Text>
            </View>
            <FlatList
                        extraData={state.index}
                        data={state.data}
                        keyExtractor={(x, i) => i.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.containerMargin}
                        renderItem={
                            ({ item, index }) =>
                                <View>
                                    <Image
                                        style={styles.imageSectionHorizontal}
                                        source={require('../assets/images/joy.jpg')} />
                                </View>
                        }
                    />


                        

        </View>
        </ScrollView>

        <View style={styles.chromeCast}>
        <FontAwesome5 name="chromecast" size={25} color="white" />
        </View>
        </View>
    );
}

const PaginationItem = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: '#3a3d68',
                width,
                height: width,
                borderRadius: 50,
                overflow: 'hidden',
                transform: [
                    {
                        rotateZ: isRotate ? '90deg' : '0deg',
                    },
                ],
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#191820',
        textAlign: "center",
        justifyContent: "center",
        height: 60,
        width:"100%",
    },
    textTabActive:{
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#7249BF",
        height: 43,
        borderRadius: 25,
        width: '100%'
    },
    textTab:{
        textAlign: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 25,
        width: '100%'
    },
    textStyle:{
        color:'#ffffff',
        textAlign: "center",
        justifyContent: "center", 
        fontFamily:'Lato_400Regular',
        fontWeight:'600'
    },
  sectionHeaderView: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
    fontFamily:'Lato_400Regular',
},
sectionHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    left:3,
    fontFamily:'Lato_400Regular',
},
sectionHeaderMore: {
    color: '#ffffff',
    right: 15,
    fontFamily:'Lato_400Regular',
    fontSize:13
},
imageSectionHorizontal: {
  width: PAGE_WIDTH/2.06,
  height: 117,
  marginHorizontal: 3,
  borderRadius: 10,
  marginBottom:10,
  borderColor:'#6b9fd7',
  borderWidth:1
},
imageSectionVertical: {
  width: PAGE_WIDTH/3.15,
  height: 170,
  marginHorizontal: 3,
  borderRadius: 10,
  marginBottom:10,
  
},
imageSectionCircle:{
  marginHorizontal: 3,
  marginBottom:10,
  width: 97, 
  height: 97,
  borderRadius: 97/ 2,
  borderColor:'#6b9fd7',
  borderWidth:1
},
imageSectionBig: {
  width: PAGE_WIDTH/1.1,
  height: 230,
  marginHorizontal: 8,
  borderRadius: 1,
  padding:20,
  borderColor:'#6b9fd7',
  borderWidth:1
},
imageSectionBigSingle:{
  width: PAGE_WIDTH/1.04,
  height: 230,
  marginHorizontal: 8,
  borderRadius: 7,
  padding:20,
  
},
imageSectionBigWithBorder:{
  width: PAGE_WIDTH/1.1,
  height: 230,
  marginHorizontal: 8,
  borderRadius: 1,
  padding:20,
  borderRadius:10,
  borderColor:'#6b9fd7',
  borderWidth:1
},
chromeCast:{
    width: 56,  
    height: 56,   
    borderRadius: 28,            
    backgroundColor:'#191820',
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
    borderColor:'#6b9fd7',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'flex-end'
}
});

export default Index;