import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../API";
import SearchBar from "../components/SearchBar";

const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [ord, setQuery] = useState("")
    const [clicked, setClicked] = useState(false)


    const fetchPosts = () => {
        setIsLoading(true)
        axiosInstance
            .get(`/services/search?query=${ord}`) //запрос на поиск услуг
            .then(({data}) => {
                setItems(data["services"])
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchPosts, [ord])  //этот запрос выполняется каждый раз при изменении состояния строки поиска

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.id, name: item.name })}>
            <Post navigation={navigation} id={item.id} name={item.name} item={item} />
        </TouchableOpacity>
    )

    return (
        <View style={{ paddingBottom: 75 }}>

            <SearchBar searchPhrase={ord} setSearchPhrase={setQuery} clicked={clicked} setClicked={setClicked} />

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={renderItem}
            />

        </View>
    );
}

export default HomeScreen;
