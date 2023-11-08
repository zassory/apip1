import React from 'react'
import { Link } from 'react-router-dom'

export const CardPokemon = ({pokemon}) => {

  const { name , id } = pokemon;
    

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
        <div className="card-img">
            <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${name}`}
            />
        </div>
        <div className="card-info">
            <span className="pokemon-id">{id}</span>
            <h3>{name}</h3>
            <div className="card-types">
            {pokemon.types.map(type => (
                    <span key={type.type.name} className={type.type.name}>
                        {type.type.name}
                    </span>
                ))}
            </div>
        </div>
    </Link>
  )
}
