import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const API_KEY="lP371jN_TLA-zpsmZyVXP";
const BASE_URL="https://rest.api.bible/v1";
const bibleId="de4e12af7f28f599-02";

export default function Chapters(){

const {id,name} = useLocalSearchParams();
const router = useRouter();

const [chapters,setChapters] = useState<any[]>([]);

useEffect(()=>{
load();
},[]);

async function load(){

const res = await fetch(
`${BASE_URL}/bibles/${bibleId}/books/${id}/chapters`,
{
headers:{ "api-key":API_KEY }
}
);

const json = await res.json();

setChapters(json.data);

}

return(

<View style={{flex:1,padding:20}}>

<Text style={{fontSize:26,fontWeight:"bold"}}>
{name}
</Text>

<FlatList
data={chapters}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(
<TouchableOpacity
onPress={()=>router.push(`/chapter/${item.id}`)}
style={{padding:15}}
>

<Text style={{fontSize:18}}>
Capítulo {item.number}
</Text>

</TouchableOpacity>
)}
/>

</View>

)

}