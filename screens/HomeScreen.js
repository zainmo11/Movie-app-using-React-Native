import {View, Text, Platform, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    const [trendingMovies, setTrendingMovies] = React.useState([1,2,3]);
    const [upcomingMovies, setUpcomingMovies] = React.useState([1,2,3]);
    const [topRatedMovies, setTopRatedMovies] = React.useState([1,2,3]);
    return (
        <View className="flex-1  bg-neutral-900">
            <SafeAreaView className={ios ? "-mb-2": "mb-3" }>
                <StatusBar backgroundColor="transparent" translucent barStyle="black-content" />
                <View className="flex-row items-center justify-between mx-4 ">
                    <Bars3CenterLeftIcon size="30" strokeWidth="2" color="white" />

                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>
                        ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}>

                <TrendingMovies data={trendingMovies} />

                <MovieList title="Upcoming" data={upcomingMovies} />
                <MovieList title="Top Rated" data={topRatedMovies} />
            </ScrollView>



        </View>
    );
}
