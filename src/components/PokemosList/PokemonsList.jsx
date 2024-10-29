import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext, ThemeProvider } from "../../contexts/ThemeContext";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${amount}`
        );

        const pokemonList = response.data.results;

        const pokemonsAndImages = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              id: detailsResponse.data.id,
              name: pokemon.name,
              image: detailsResponse.data.sprites.front_default,
            };
          })
        );

        setPokemons([...pokemons, ...pokemonsAndImages]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchPokemons();
  }, [amount]);

  const loadMorePokemons = () => {
    setAmount((amount) => amount + 10);
  };

  return (
    <Section>
      <H1>POKEMONS</H1>
      {pokemons.map((pokemon) => (
        <Div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}`}>
            <Img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
          </Link>
        </Div>
      ))}
      <Button onClick={loadMorePokemons}>Carregar mais</Button>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Div = styled.div`
  display: flex;
  flex: 1;
  width: 250px;
  height: 250px;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const H1 = styled.h1`
  margin-top: 50px;
`;

const Button = styled.button`
  border-radius: 10px;
  margin-top: 20px;
`;

export default PokemonList;
