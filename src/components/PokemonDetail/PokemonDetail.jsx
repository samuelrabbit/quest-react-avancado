import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);

        const abilitiesDetails = await Promise.all(
          response.data.abilities.map(async (abilitySlot) => {
            const abilityResponse = await axios.get(abilitySlot.ability.url);
            const ability = abilityResponse.data;

            const description = ability.effect_entries.find(
              (entry) => entry.language.name === "en"
            );

            return {
              name: ability.name,
              description: description
                ? description.effect
                : "Descrição não disponível",
            };
          })
        );

        setAbilities(abilitiesDetails);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <p>Carregando...</p>;
  }

  return (
    <Section>
      <H1>{pokemon.name}</H1>
      <Img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h2>Tipo</h2>
      <ul>
        {pokemon.types.map((typeSlot) => (
          <li key={typeSlot.type.name}>{typeSlot.type.name}</li>
        ))}
      </ul>

      <h2>Habilidades</h2>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.name}>
            <strong>{ability.name}</strong>: {ability.description}
          </li>
        ))}
      </ul>

      <h2>Movimentos</h2>
      <Ul>
        {pokemon.moves.map((moveSlot) => (
          <li key={moveSlot.move.name}>{moveSlot.move.name}</li>
        ))}
      </Ul>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const Img = styled.img`
  width: 200px;
  margin-top: 10px;
`;
const H1 = styled.h1`
  margin-top: 50px;
`;

export default PokemonDetail;
