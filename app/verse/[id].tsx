import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

const API_KEY = "lP371jN_TLA-zpsmZyVXP";

export default function Verse() {

  const { id } = useLocalSearchParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    loadVerses();
  }, []);

  async function loadVerses() {

    const res = await fetch(
      `https://rest.api.bible/v1/chapters/${id}`,
      {
        headers: {
          "api-key": API_KEY
        }
      }
    );

    const data = await res.json();

    setContent(data.data.content);

  }

  return (

    <ScrollView style={{ padding: 15 }}>
      <Text>{content}</Text>
    </ScrollView>

  );

}