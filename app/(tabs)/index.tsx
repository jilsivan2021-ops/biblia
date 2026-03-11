import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { coverPage, getChapter } from "../../data/biblepages";

export default function HomeScreen() {

  const [search, setSearch] = useState("");
  const [verses, setVerses] = useState<string[]>([]);
  const [reference, setReference] = useState("");
  const [motivational, setMotivational] = useState<string[]>([]);

  useEffect(() => {
    loadChapter();
    loadMotivational();
  }, []);

  async function loadChapter() {

    const chapter = await getChapter(
      "de4e12af7f28f599-01",
      "JHN.3"
    );

    const text = chapter.text ?? "";

    setReference(chapter.title ?? "");

    const splitVerses = text
      .split(/(?=\d+\s)/)
      .map(v => v.trim())
      .filter(v => v.length > 0);

    setVerses(splitVerses);
  }

  function loadMotivational() {

    const frases = [

      "Tudo posso naquele que me fortalece. Filipenses 4:13",

      "O Senhor é o meu pastor; nada me faltará. Salmos 23:1",

      "Confia no Senhor de todo o teu coração. Provérbios 3:5",

      "Porque Deus amou o mundo de tal maneira que deu o seu Filho. João 3:16",

      "Entrega o teu caminho ao Senhor. Salmos 37:5",

      "O choro pode durar uma noite, mas a alegria vem pela manhã. Salmos 30:5",

      "Buscai primeiro o Reino de Deus. Mateus 6:33"

    ];

    const random = frases.sort(() => 0.5 - Math.random()).slice(0, 3);

    setMotivational(random);
  }

  const filteredVerses = verses.filter((v) =>
    v.toLowerCase().includes(search.toLowerCase())
  );

  const versesToShow = search ? filteredVerses : verses;

  return (
    <ScrollView style={styles.container}>

      {/* CAPA */}

      {coverPage.image && (
        <Image source={coverPage.image} style={styles.cover} />
      )}

      {/* PESQUISA */}

      <Text style={styles.title}>Pesquisar na Bíblia</Text>

      <TextInput
        style={styles.search}
        placeholder="Digite uma palavra (ex: Jesus)"
        value={search}
        onChangeText={setSearch}
      />

      {/* FRASES MOTIVACIONAIS */}

      <Text style={styles.title}>Frases da Bíblia</Text>

      {motivational.map((frase, index) => (

        <View key={index} style={styles.motivationalCard}>

          <Text style={styles.motivationalText}>
            {frase}
          </Text>

        </View>

      ))}

      {/* CAPÍTULO */}

      <Text style={styles.title}>
        {reference}
      </Text>

      {/* VERSÍCULOS */}

      {versesToShow.map((verse, index) => (

        <View key={index} style={styles.card}>

          <Text style={styles.text}>
            {verse}
          </Text>

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  cover: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  motivationalCard: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  motivationalText: {
    fontSize: 16,
    fontStyle: "italic",
  },

  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
  },

});