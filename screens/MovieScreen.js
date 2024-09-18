import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";

import {styles} from "../theme";
import {LinearGradient} from "expo-linear-gradient";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const TopMargin = ios ? 20 : 0;  // Adjust top margin based on platform

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup
        };
    }, [item]);

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{backgroundColor: '#1e1e1e', flex: 1}}
        >
            <View className="w-full">
                <SafeAreaView style={[{position:'absolute',zIndex: 20, width: '100%', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent'}]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, {padding: 8, borderRadius: 12}]}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 8}} onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={35} strokeWidth={2.5} color={isFavorite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

            </View>
            <View>
                <Image
                    source={require('../assets/images/killer_heat.jpg')}
                    style={{width, height: height*0.55}}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                    style={{ width, height: height*0.40}}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 0}}
                    classNameR="absolute bottom-0 Z-10"
                />
            </View>
        </ScrollView>
    );
}
