import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { HeartIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteActor, removeFavoriteActor } from '../store/slices/favoriteActorsSlice';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/slices/favoriteMoviesSlice';

const FavoriteButton = ({ item, type }) => {
    const dispatch = useDispatch();
    const favoriteActors = useSelector(state => state.favoriteActors);
    const favoriteMovies = useSelector(state => state.favoriteMovies);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the item is already in the favorite list
        const isAlreadyFavorite = type === 'actor'
            ? favoriteActors.some(actor => actor.id === item.id)
            : favoriteMovies.some(movie => movie.id === item.id);
        setIsFavorite(isAlreadyFavorite);
    }, [favoriteActors, favoriteMovies, item, type]);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            if (type === 'actor') {
                dispatch(removeFavoriteActor(item));
            } else if (type === 'movie') {
                dispatch(removeFavoriteMovie(item));
            }
        } else {
            if (type === 'actor') {
                dispatch(addFavoriteActor(item));
            } else if (type === 'movie') {
                dispatch(addFavoriteMovie(item));
            }
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity style={{ padding: 8 }} onPress={handleFavoriteToggle}>
            <HeartIcon size={35} strokeWidth={2.5} color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
    );
};

export default React.memo(FavoriteButton);
