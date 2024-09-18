import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
                <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;

