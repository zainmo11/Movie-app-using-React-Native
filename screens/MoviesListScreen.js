import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Loading from "../components/loading";
import MovieList from "../components/MovieList"; // Reusable list component for movies
import FavoriteList from "../components/FavoriteButton"; // For Favorite Actors/Movies (if different structure)

// MoviesListScreen component (used for all screens)
export default function MoviesListScreen({ route }) {
    const { title, fetchFunction, isFavorite } = route.params; // Passed parameters
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the relevant data based on the passed function
        const fetchData = async () => {
            const result = await fetchFunction();
            if (result && result.results) {
                setData(result.results);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <View className="flex-1 bg-neutral-900">
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text className="text-white text-3xl font-bold px-4">{title}</Text>
                        {/* Render MovieList or FavoriteList depending on 'isFavorite' */}
                        {
                            isFavorite
                                ? <FavoriteList data={data} /> // Use a component if structure for favorites is different
                                : <MovieList title={title} data={data} />
                        }
                    </ScrollView>
                )
            }
        </View>
    );
}
