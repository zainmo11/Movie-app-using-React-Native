import React, { useCallback, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator // Import ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, image500, searchMovie } from "../api/moviedb";

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading

    const handleSearch = async (text) => {
        if (text && text.length > 0) {
            setLoading(true); // Set loading to true before the API call
            try {
                const data = await searchMovie({
                    query: text,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                });
                setSearchResults(data.results);
            } catch (error) {
                console.error('Error searching movie:', error);
            } finally {
                setLoading(false); // Set loading to false after the API call
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleTextDebounce = useCallback(
        debounce((text) => handleSearch(text), 500),
        []
    );

    return (
        <SafeAreaView className="flex-1 bg-neutral-900">
            {/* Search bar */}
            <View className="flex-row items-center justify-center mb-3 mx-4 border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Movie"
                    placeholderTextColor="lightgray"
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => { navigation.goBack(); }}
                    className="p-3 m-1 bg-neutral-500 rounded-full"
                >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10, flexGrow: 1 }}
                className="space-y-3"
            >
                <Text className="text-white text-lg font-semibold ml-2">Results ({searchResults.length})</Text>

                {/* Show loading indicator while searching */}
                {loading && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}

                {/* Image centered when no results */}
                {searchResults.length === 0 && !loading && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/movieTime.png')}
                            style={{ width: width * 0.8, height: height * 0.6, borderRadius: 10 }}
                        />
                    </View>
                )}

                {/* Results list */}
                <View className="flex-row justify-between flex-wrap">
                    {searchResults.map((item, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item )}
                        >
                            <View className="space-y-2 mb-5 overflow-hidden">
                                <Image
                                    source={{ uri: item.poster_path ? image185(item.poster_path) : fallbackMoviePoster }}
                                    className="rounded-3xl"
                                    style={{ width: width * 0.44, height: height * 0.3 }}
                                />
                                <Text className="text-neutral-300">
                                    {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
