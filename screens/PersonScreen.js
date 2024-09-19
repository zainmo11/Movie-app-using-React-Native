import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from "../theme";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRoute} from "@react-navigation/native";
import MovieList from "../components/MovieList";
import {fetchPersonDetails, fetchPersonCredits, image342, fallbackPersonPoster} from "../api/moviedb";
import Loading from "../components/loading";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteActor, removeFavoriteActor} from "../store/slices/favoriteActorsSlice";
import FavoriteButton from "../components/FavoriteButton";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'mt-3';

export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const dispatch = useDispatch();  // Initialize dispatch from Redux
    // Fetch favorite actors from the Redux store
    const favoriteActors = useSelector(state => state.favoriteActors);
    useEffect(() => {
        const loadPersonData = async () => {
            setLoading(true);
            try {
                await getPersonDetails(item.id);
                await getPersonCredits(item.id);
            } catch (error) {
                console.error('Error fetching person data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPersonData();
    }, [item]);

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        setPerson(data);
    };

    const getPersonCredits = async (id) => {
        const data = await fetchPersonCredits(id);
        setPersonMovies(data.cast);
    };

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavoriteActor(person));  // Remove from global state
        } else {
            dispatch(addFavoriteActor(person));  // Add to global state
        }
        setIsFavorite(!isFavorite);  // Toggle local favorite state
    };

    return (
        <ScrollView className="bg-neutral-900" style={{flex: 1}}
                    contentContainerStyle={{paddingBottom: 20}}>
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, {borderRadius: 12}]} className="round-xl p-1">
                    <ChevronLeftIcon size={35} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                {/* Pass the type as 'actor' to FavoriteButton */}
                <FavoriteButton item={person} type="actor" />
            </SafeAreaView>

            {
                loading ? (
                    <Loading />  // Show loading indicator while data is being fetched
                ) : (
                    <View>
                        <View className="flex-row justify-center"
                              style={{
                                  margin: 8,
                                  shadowColor: 'gray',
                                  shadowRadius: 40,
                                  shadowOffset: { width: 0, height: 5 },
                                  shadowOpacity: 1,
                                  elevation: 20,
                              }}>
                            <View className="items-center rounded-full overflow-hidden h-64 w-64 border-2 border-neutral-500">
                                <Image source={{uri: image342(person.profile_path) || fallbackPersonPoster}} style={{width: width * 0.74, height: height * 0.43}} />
                            </View>
                        </View>
                        <View className="flex-row items-center justify-center mt-2">
                            <Text className="text-white text-3xl font-bold">{person.name}</Text>
                        </View>
                        <View className="flex-row items-center justify-center mt-2">
                            <Text className="text-base text-neutral-500">{person.place_of_birth}</Text>
                        </View>
                        <View className="flex-row items-center justify-center mt-6 mx-3 bg-neutral-700 rounded-full p-4">
                            <View className="border-r-2 border-r-neutral-400 pl-5 pr-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person.gender === 1 ? 'Female' : 'Male'}
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">{person.birthday}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">{person.known_for_department}</Text>
                            </View>
                            <View className="px-5 items-center">
                                <Text className="text-white font-semibold">Popular</Text>
                                <Text className="text-neutral-300 text-sm">{person.popularity} %</Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            <Text className="text-white text-lg font-semibold">Biography</Text>
                            <Text className="text-neutral-400 text-sm">{person.biography || "N/A"}</Text>
                        </View>

                        <MovieList title="Movies" data={personMovies} hideSeeAll={true} />
                    </View>
                )
            }
        </ScrollView>
    );
}
