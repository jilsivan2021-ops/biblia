import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

const API_KEY="lP371jN_TLA-zpsmZyVXP";
const BASE_URL="https://rest.api.bible/v1";
const bibleId="de4e12af7f28f599-02";

export default function Chapter(){

const {id} = useLocalSearchParams();

const [text,setText] = useState("");

useEffect(()=>{
load();
},[]);

async function load(){

const res = await fetch(
`${BASE_URL}/bibles/${bibleId}/chapters/${id}`,
{
headers:{ "api-key":API_KEY }
}
);

const json = await res.json();

const clean = json.data.content
.replace(/<[^>]+>/g,"")
.trim();

setText(clean);

}

return(

<ScrollView style={{padding:20}}>

<Text style={{fontSize:18,lineHeight:28}}>
{text}
</Text>

</ScrollView>

)

}