import React from 'react';
import {TouchableOpacity, View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import { Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width,height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie',item);
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5 font-extrabold">Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideScale={0.8}
                sliderWidth={width}
                itemWidth={width*0.58}
                containerCustomStyle={{display: 'flex'}}
            />
        </View>
    );
}

const MovieCard = ({ item ,handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>{handleClick(item)}}>
            <Image
                source={require('../assets/images/killer_heat.jpg')}
                style={{width: width*0.6, height: height*0.4, borderRadius:10}}
            />
        </TouchableWithoutFeedback>
    );
};
