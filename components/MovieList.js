import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image} from "react-native";
import {styles} from "../theme";
import {useNavigation} from "@react-navigation/native";


export default function MovieList({title, data}) {
    let movieName = "Ant-Man";
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl font-extrabold">{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.text} className="text-lg">See all</Text>
                </TouchableOpacity>
                </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >

                {data.map((item, index) => (
                   <TouchableWithoutFeedback
                          onPress={() => navigation.navigate('Movie', {item})}
                          key={index}
                     >
                       <View className="space-y-1 mr-4">
                            <Image
                                 source={require('../assets/images/killer_heat.jpg')}
                                 style={{width: 150, height: 200, borderRadius:10}}
                            />
                            <Text className="text-white text-lg font-semibold">{movieName.length>14? movieName.slice(0,14)+'...':movieName}</Text>
                          </View>
                     </TouchableWithoutFeedback>

                ))}
            </ScrollView>
        </View>
    )
}
