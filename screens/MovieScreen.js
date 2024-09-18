import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";

import {styles} from "../theme";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const TopMargin = ios ? 20 : 0;  // Adjust top margin based on platform

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();

    // Correct way to use useState
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
            <View style={{width: '100%', position: 'relative'}}>
                <SafeAreaView style={[{zIndex: 20, width: '100%', paddingHorizontal: 16, marginTop: TopMargin, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, {padding: 8, borderRadius: 12}]}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 8}} onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={35} strokeWidth={2.5} color={isFavorite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    {/* Movie content goes here */}
                </View>
            </View>
        </ScrollView>
    );
}
