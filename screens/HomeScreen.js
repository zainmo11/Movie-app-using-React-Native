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
import {useDispatch, useSelector} from "react-redux";
import  {getFavoriteMovies}  from '../store/slices/favoriteMoviesSlice';
import {getFavoriteActors} from "../store/slices/favoriteActorsSlice";

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    const [trendingMovies, setTrendingMovies] = React.useState([]);
    const [upcomingMovies, setUpcomingMovies] = React.useState([]);
    const [topRatedMovies, setTopRatedMovies] = React.useState([]);
    const [favoriteMovies, setFavoriteMovies] = React.useState([]);
    const [favoritePerson, setFavoritePerson] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const favoriteMoviesFromStore = useSelector((state) => state.favoriteMovies);
    const favoritePersonFromStore = useSelector((state) => state.favoriteActors);

    useEffect(() => {
        try {
            getTrendingMovies();
            getUpcomingMovies();
            getTopRatedMovies();
            getFavoriteMoviesFun();
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
        //getFavoritePersonFun();
    }, [dispatch, favoriteMoviesFromStore, favoritePersonFromStore]);
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
    const getFavoriteMoviesFun = async () => {
        await dispatch(getFavoriteMovies());
        if (favoriteMoviesFromStore) {
            setFavoriteMovies(favoriteMoviesFromStore);
        }
    }
    const getFavoritePersonFun = async () => {
        await dispatch(getFavoriteActors());

        if (favoritePersonFromStore) {
            setFavoritePerson(favoritePersonFromStore);
        }
        console.log("favoritePersonFromStore",favoritePersonFromStore);
    }

    return (
        <View className="flex-1  bg-neutral-900">
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

                {favoriteMovies.length>0 &&<MovieList title="Favorite Movies" data={favoriteMovies} />}
                {/*{favoritePerson.length>0 &&<MovieList title="Favorite Actors" data={favoritePerson} />}*/}
            </ScrollView>
                )
            }


        </View>
    );
}
