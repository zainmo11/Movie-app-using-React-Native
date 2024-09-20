import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/mini";
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom header component
function CustomHeader({ navigation, title }) {
    return (
        <SafeAreaView className={Platform.OS === 'ios' ? "-pb-3" : "pb-4  " +" bg-neutral-900"}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <View className="flex-row items-center justify-between mx-4">
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Bars3CenterLeftIcon size="30" strokeWidth="2" color="white" />
                </TouchableOpacity>

                <Text className="text-white text-3xl font-bold">
                    <Text style={{ fontWeight: '700', color: 'red' }}>M</Text>ovies
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Stack for Home and other screens
function HomeStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    header: () => <CustomHeader navigation={navigation} title="Home" />,
                    headerShown: true
                }}

            />
            <Stack.Screen name="Movie" component={MovieScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// Drawer navigation setup
const AppNavigation = () => {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                initialRouteName="HomeStack"
                screenOptions={{
                    headerShown: false,
                    drawerType: 'front',
                    overlayColor: 'rgba(0, 0, 0, 0.7)', // Optional: Drawer overlay style
                }}
            >
                <Drawer.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        title: 'Home',
                        headerShown: false,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
