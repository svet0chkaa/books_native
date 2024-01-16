import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../API";
import SearchBar from "../components/SearchBar";

const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [work, setQuery] = useState("")
    const [clicked, setClicked] = useState(false)


    const fetchPosts = () => {  //вызывается в useEffect !!!!!!!!!!!!!!!!!!!!!!!!!
        setIsLoading(true)  //загрузка началась
        axiosInstance   //куда отправляется запрос (к API)
            .get(`/services/search?query=${work}`) //запрос на поиск услуг
            .then(({data}) => { //вернулось с бэка все услуги
                setItems(data["services"])  //кладем услуги в массив Items
            })
            .catch((err) => {   
                alert(err)  //вывод ошибки
            })
            .finally(() => {
                setIsLoading(false) //загрузка закончилась
            })
    }

    (fetchPosts, [work])  //этот запрос выполняется каждый раз при изменении состояния строки поиска

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.id, name: item.name })}>
            <Post navigation={navigation} id={item.id} name={item.name} item={item} />
        </TouchableOpacity>
    )

    return (
        <View style={{ paddingBottom: 75 }}>

            <SearchBar searchPhrase={work} setSearchPhrase={setQuery} clicked={clicked} setClicked={setClicked} />  

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={renderItem}
            />

        </View>
    );
}

export default HomeScreen;
