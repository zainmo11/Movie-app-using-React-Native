import {View, Text, Platform, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/moviedb";

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    const [trendingMovies, setTrendingMovies] = React.useState([]);
    const [upcomingMovies, setUpcomingMovies] = React.useState([]);
    const [topRatedMovies, setTopRatedMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);
    const getTrendingMovies = async () => {
        setLoading(true);
        const data = await fetchTrendingMovies()
        if(data &&data.results)setTrendingMovies(data.results);
        console.log(date);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        setLoading(true);
        const data = await fetchUpcomingMovies()
        setUpcomingMovies(data.results);
        setLoading(false);
    }
    const getTopRatedMovies = async () => {
        setLoading(true);
        const data = await fetchTopRatedMovies()
        setTopRatedMovies(data.results);
        setLoading(false);
    }


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
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
            {
                loading? (
                    <Loading />
                ):(

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}>

                { trendingMovies.length>0 &&<TrendingMovies data={trendingMovies} />}

                {upcomingMovies.length>0 && <MovieList title="Upcoming" data={upcomingMovies} />}
                {topRatedMovies.length>0 && <MovieList title="Top Rated" data={topRatedMovies} />}
            </ScrollView>
                )
            }


        </View>
    );
}
