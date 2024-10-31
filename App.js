import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Settings from './components/Settings';
import Login from './components/Login';
import Signup from './components/Signup';
import AddCustomer from './components/AddCustomer';
import {getUser} from './components/storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({setIsLoggedIn}) => (
  <Stack.Navigator>
    <Stack.Screen name="Login" options={{headerShown: false, title: 'Login'}}>
      {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{headerShown: false, title: 'Signup'}}
    />
  </Stack.Navigator>
);

const AppStack = ({setIsLoggedIn}) => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" options={{headerShown: false}}>
      {props => <BottomTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen
      name="AddCustomer"
      component={AddCustomer}
      options={{headerShown: false, title: 'Add Customer'}}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = ({setIsLoggedIn}) => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Icon name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {backgroundColor: '#fff', height: 70, paddingTop: 10},
      tabBarLabelStyle: {fontSize: 14, paddingBottom: 10},
    })}>
    <Tab.Screen
      name="HomeTab"
      component={Home}
      options={{
        title: 'Home',
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        title: 'Settings',
      }}
    />
  </Tab.Navigator>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await getUser();
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };
    checkAuthToken();
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}

export default App;
