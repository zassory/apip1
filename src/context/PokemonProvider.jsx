import { useEffect, useState } from "react";

import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm";

export const PokemonProvider = ({children}) => {

  const [allPokemons, setAllPokemons] = useState([]);//Aqui van todos los pokemons
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset,setOffSet] = useState(0);
  

  //Estados para la aplicacion simples
  const[loading,setLoading] = useState(true);
  const[active,setActive] = useState(false);

  //Utilizar CustomHook - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: ''
  });

  //Llamar 50 pokemones a la api
  const getAllPokemons = async(limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json();
    
    //Recuerda que las promises me devuelven un nuevo arreglo
    const promises = data.results.map(async(pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    })

    const results = await Promise.all(promises);

    setAllPokemons([
      ...allPokemons,
      ...results
    ]);
    setLoading(false);
    
  }

  // Global Pokemons
    const getGlobalPokemons = async() => {
      
      //https://pokeapi.co/api/v2/pokemon/charmander
      const baseUrl = 'https://pokeapi.co/api/v2/';

      const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
      //const res = await fetch(`${baseUrl}pokemon/${value}`)
      const data = await res.json();

      const promises = data.results.map(async(pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
       return data;
      });
      const results = await Promise.all(promises);
    
      setGlobalPokemons(results);
      setLoading(false);
    }

  /**
   * 
   * @param { id } id 
   * @returns data pokemon by id
   */
  const getPokemonById = async id => {
    
    const baseUrl = 'https://pokeapi.co/api/v2/';

    const res = await fetch(`${baseUrl}pokemon/${id}`);
    const data = await res.json();
    
    return data;
  }

  /**
   * Para cargas mas data
   */
  const onClickLoadMore = () => {
    setOffSet(offset + 50);
  }
  
  useEffect(()=> {
    getAllPokemons()
  },[offset]);

  useEffect(()=> {
    getGlobalPokemons()
  },[]);

  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonById,
      onClickLoadMore,
    }}>
        { children }
    </PokemonContext.Provider>
  )
}
