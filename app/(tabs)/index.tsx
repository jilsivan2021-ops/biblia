import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { coverPage } from "../../data/biblepages";

const books = [
  { name: "Gênesis", id: "GEN" },
  { name: "Êxodo", id: "EXO" },
  { name: "Levítico", id: "LEV" },
  { name: "Números", id: "NUM" },
  { name: "Deuteronômio", id: "DEU" },
  { name: "Josué", id: "JOS" },
  { name: "Juízes", id: "JDG" },
  { name: "Rute", id: "RUT" },
  { name: "1 Samuel", id: "1SA" },
  { name: "2 Samuel", id: "2SA" },
  { name: "Salmos", id: "PSA" },
  { name: "Provérbios", id: "PRO" },
  { name: "Isaías", id: "ISA" },
  { name: "Jeremias", id: "JER" },

  { name: "Mateus", id: "MAT" },
  { name: "Marcos", id: "MRK" },
  { name: "Lucas", id: "LUK" },
  { name: "João", id: "JHN" },
  { name: "Atos", id: "ACT" },
  { name: "Romanos", id: "ROM" },
  { name: "1 Coríntios", id: "1CO" },
  { name: "2 Coríntios", id: "2CO" },
  { name: "Gálatas", id: "GAL" },
  { name: "Efésios", id: "EPH" },
  { name: "Filipenses", id: "PHP" },
  { name: "Colossenses", id: "COL" },
  { name: "Apocalipse", id: "REV" },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [motivational, setMotivational] = useState<string[]>([]);

  useEffect(() => {
    randomVerses();
  }, []);

  function randomVerses() {
    const verses = [
      "O Senhor é o meu pastor; nada me faltará. Salmos 23:1",
      "Tudo posso naquele que me fortalece. Filipenses 4:13",
      "Entrega o teu caminho ao Senhor; confia nele. Salmos 37:5",
      "Porque Deus amou o mundo de tal maneira. João 3:16",
      "Confia no Senhor de todo o teu coração. Provérbios 3:5",
      "Buscai primeiro o Reino de Deus. Mateus 6:33",
      "O choro pode durar uma noite, mas a alegria vem pela manhã. Salmos 30:5",
    ];

    const shuffled = verses.sort(() => 0.5 - Math.random());
    setMotivational(shuffled.slice(0, 3));
  }

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

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
        placeholder="Pesquisar livro (ex: João)"
        value={search}
        onChangeText={setSearch}
      />

      {/* FRASES ALEATÓRIAS */}

      <Text style={styles.title}>Versículos para você</Text>

      {motivational.map((verse, index) => (
        <View key={index} style={styles.verseCard}>
          <Text style={styles.verseText}>{verse}</Text>
        </View>
      ))}

      {/* LIVROS */}

      <Text style={styles.title}>Livros da Bíblia</Text>

      {filteredBooks.map((book, index) => (
        <TouchableOpacity key={index} style={styles.bookCard}>
          <Text style={styles.bookText}>{book.name}</Text>
        </TouchableOpacity>
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

  verseCard: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  verseText: {
    fontSize: 16,
    fontStyle: "italic",
  },

  bookCard: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },

  bookText: {
    fontSize: 18,
  },
});