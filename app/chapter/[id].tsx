import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const API_KEY = "lP371jN_TLA-zpsmZyVXP";
const BASE_URL = "https://rest.api.bible/v1";
const bibleId = "de4e12af7f28f599-02";

interface Chapter {
  id: string;
  number: string;
}

export default function Chapters() {

  const params = useLocalSearchParams();
  const id = params.id as string;
  const name = params.name as string | undefined;

  const router = useRouter();

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (id) {
      loadChapters();
    }
  }, [id]);

  async function loadChapters() {

    try {

      const res = await fetch(
        `${BASE_URL}/bibles/${bibleId}/books/${id}/chapters`,
        {
          headers: { "api-key": API_KEY }
        }
      );

      const json = await res.json();

      if (Array.isArray(json?.data)) {
        setChapters(json.data);
      } else {
        setChapters([]);
      }

    } catch (error) {
      console.log("Erro ao carregar capítulos:", error);
      setChapters([]);
    }

  }

  return (

    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        {name ?? "Livro"}
      </Text>

      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}

        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum capítulo encontrado
          </Text>
        }

        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chapter/[id]",
                params: { id: item.id }
              })
            }
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#eee"
            }}
          >

            <Text style={{ fontSize: 18 }}>
              Capítulo {item.number}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  );
}