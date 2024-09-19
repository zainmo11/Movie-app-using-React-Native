import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import { Cast } from "../components/Cast";
import MovieList from "../components/MovieList";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";
import FavoriteButton from "../components/FavoriteButton";
import Loading from "../components/loading";

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const TopMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchData = async () => {
            await getMovieDetails(item.id);
            await getSimilarMovies(item.id);
            await getMovieCredits(item.id);
            setLoading(false); // Set loading to false after data fetching
        };
        fetchData();
    }, []);

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        setMovie(data);
    };

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id);
        setSimilarMovies(data.results);
    };

    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id);
        setCast(data.cast);
    };

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1 }}
            className="border-amber-400 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + TopMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, { borderRadius: 12 }]} className="round-xl p-1">
                        <ChevronLeftIcon size={35} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <FavoriteButton item={movie} type="movie" />
                </SafeAreaView>

                {loading ? ( // Show loading indicator if loading
                    <Loading />
                ) : (
                    <View>
                        <Image
                            source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                            style={{ width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.6)', 'rgba(23,23,23,1)']}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: height * 0.4,
                            }}
                            className="w-full "
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />
                    </View>
                )}

                {!loading && ( // Only show the following when not loading
                    <View style={{ marginTop: -height * 0.09 }} className="space-y-1">
                        <Text className="text-white text-3xl text-center font-bold tracking-wider">{movie.title}</Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center">{movie.tagline}</Text>
                    </View>
                )}

                {!loading && (
                    <View className="flex-row justify-between items-center px-4 mt-5">
                        <View>
                            <Text className="text-white text-lg font-semibold">{movie.vote_average}</Text>
                            <Text className="text-neutral-400 text-sm">IMDb</Text>
                        </View>
                        <View>
                            <Text className="text-white text-lg font-semibold">{movie.release_date}</Text>
                            <Text className="text-neutral-400 text-sm">Release Date</Text>
                        </View>
                        <View>
                            <Text className="text-white text-lg font-semibold">{movie.runtime} min</Text>
                            <Text className="text-neutral-400 text-sm">Duration</Text>
                        </View>
                    </View>
                )}

                {!loading && (
                    <>
                        <Text className="text-white text-lg font-semibold px-4 mt-4">Overview</Text>
                        <Text className="text-neutral-400 text-base px-4">{movie.overview}</Text>
                    </>
                )}
            </View>

            {/* Cast */}
            {!loading && <Cast cast={cast} navigation={navigation} />}
            {/* Similar Movies */}
            {!loading && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
        </ScrollView>
    );
}
