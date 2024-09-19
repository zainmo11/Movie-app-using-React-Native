import {ScrollView, Text, View,TouchableOpacity,Image} from "react-native";
import React from "react";
import {fallbackPersonPoster, image185, image342} from "../api/moviedb";

export function Cast({cast, navigation}) {
    return (
        <View className='my-6'>
        <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                cast && cast.map((item, index) => {
                    console.log("itrtrt",item.profile_path)

                    return (
                        <TouchableOpacity
                            onPress={() => navigation.push('Person', item)}
                            key={index}
                            className='items-center mr-4'
                        >
                            <Image
                                source={{uri: image185(item.profile_path)||fallbackPersonPoster }}
                                className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'
                            />
                            <Text className='text-white text-2xs mt-1 '>
                                {
                                    item.character.length > 14 ? item.character.slice(0, 14) + '...' : item.character
                                }
                            </Text>
                            <Text className='text-neutral-400 text-xs mt-1 '>
                                {
                                    item.original_name.length > 14 ? item.original_name.slice(0, 14) + '...' : item.original_name
                                }
                            </Text>
                        </TouchableOpacity>
                    )
            })
            }
        </ScrollView>
        </View>
    )
}
