import React from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
const {width, height} = Dimensions.get('window');
export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const movieName = " some movie name name";
    return (
        <SafeAreaView className="flex-1 bg-neutral-900">
            {/* Search bar */}
            <View className="flex-row items-center justify-center mb-3 mx-4 border border-neutral-500 rounded-full">
                <TextInput
                    placeholder="Search Movie"
                    placeholderTextColor="lightgray"
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
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

                {/* Image centered when no results */}
                {searchResults.length === 0 && (
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
                            onPress={() => navigation.push('Movie', { item })}
                        >
                            <View className="space-y-2 mb-5 overflow-hidden">
                                <Image
                                    source={require('../assets/images/killer_heat.jpg')}
                                    className="rounded-3xl"
                                    style={{ width: width * 0.44, height: height * 0.3 }}
                                />
                                <Text className="text-neutral-300">
                                    {movieName.length > 22 ? item.movieName.slice(0, 22) + '...' : movieName}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
