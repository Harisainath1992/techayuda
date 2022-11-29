import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './register';
import Login from './login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Wallet from './Wallet';
import Requirement from './Requirement';
import PostScreen from './PostScreen';
import Withdrawl from './Withdrawl';
import Supporting from './Supporting';
import TaskDetails from './TaskDetails';
import Posted from './Posted';
import CompleteTask from './CompleteTask';
import PostedTaskDetails from './PostedTaskDetails';
import ChatList from './ChatList';
import BuyCoins from './Buycoins';
import SendCoins from './SendCoins';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default AppStack= ()=>{
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{header:()=>null}}
          >
          </Stack.Screen>
          <Stack.Screen
          name='Register'
          component={Register}
          options={{header:()=>null}}
          >
          </Stack.Screen>
          
          <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{header:()=>null}}
          >
          </Stack.Screen>
          <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='Wallet'
          component={Wallet}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          
          <Stack.Screen
          name='Requirement'
          component={Requirement}
          options={{
            title: 'Search For Support',
            headerStyle: {
              backgroundColor: '#191820',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='PostScreen'
          component={PostScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#191820',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='Withdrawl'
          component={Withdrawl}
          options={{
            title: 'Withdrawl Request',
            headerStyle: {
              backgroundColor: '#191820',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='Supporting'
          component={Supporting}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='TaskDetails'
          component={TaskDetails}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='Posted'
          component={Posted}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='PostedTaskDetails'
          component={PostedTaskDetails}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='CompleteTask'
          component={CompleteTask}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='ChatList'
          component={ChatList}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='BuyCoins'
          component={BuyCoins}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='SendCoins'
          component={SendCoins}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

          <Stack.Screen
          name='ChatScreen'
          component={ChatScreen}
          options={{
            header:()=>null
          }}
          >
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  };

const styles = StyleSheet.create({
  
  
});
