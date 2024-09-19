import React, { useEffect, useState } from 'react';
import { View, Image, Animated } from 'react-native';
import AppNavigation from '../navigation/appNavigation';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import {store} from '../store/store';
export default function App() {
    const [isSplashVisible, setIsSplashVisible] = useState(true); // Control splash visibility
    const fadeAnim = new Animated.Value(1); // Initial opacity for the splash screen

    // Prevent the splash screen from hiding automatically
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        const hideSplashScreen = async () => {
            // Delay for 2 seconds (optional, adjust as needed)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Animate the fade-out effect
            Animated.timing(fadeAnim, {
                toValue: 0, // Fade out to opacity 0
                duration: 1000, // Duration of the animation (1 second)
                useNativeDriver: true,
            }).start(() => {
                setIsSplashVisible(false); // Set splash visibility to false after animation
                SplashScreen.hideAsync(); // Hide the native splash screen
            });
        };

        hideSplashScreen();
    }, []);

    if (isSplashVisible) {
        // Display splash screen with fade-out animation
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Image
                        source={require('../assets/images/splash.png')} // Use your splash image
                        style={{ width: 200, height: 200 }} // Adjust size to your design
                    />
                </Animated.View>
            </View>
        );
    }

    // Once splash is hidden, render the main app content
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
