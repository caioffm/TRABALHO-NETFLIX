import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON')
        setMovies(response.data)
      } catch (error) {
        console.error('Erro ao pegar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {movies.map(movie => (
        <View key={movie.imdbID} style={styles.movieContainer}>
          <Image
            source={{ uri: String(movie.Poster).replace("http://", "https://") }}
            style={styles.banner}
            resizeMode='cover'
/>
          <View style={styles.movieInfoContainer}>
            <Text style={styles.titleMovie}>{movie.Title}</Text>
            <Text style={styles.movieDetail}>Ano: {movie.Year}</Text>
            <Text style={styles.movieDetail}>Gênero: {movie.Genre}</Text>
            <Text style={styles.movieDetail}>Diretor: {movie.Director}</Text>
            <Text style={styles.movieDetail}>Atores: {movie.Actors}</Text>
            <Text style={styles.movieDetail}>Linguagem: {movie.Language}</Text>
            <Text style={styles.movieDetail}>IMDb Rating: {movie.imdbRating}</Text>
          </View>
        </View>
      ))}
      <StatusBar style='auto' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingVertical: 20,
  },

  movieContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },

  banner: {
    width: 150,
    height: '100%',
    marginRight: 10,
    marginTop: 0
  },

  movieInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  titleMovie: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  movieDetail: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },

});
