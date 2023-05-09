
import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';


const PokemonRow = ({pokemon,onSelect}) => (
  <tr 
  key = {pokemon.id}
>
  <td>{pokemon.name.english}</td>
  <td>{pokemon.type.join(", ")}</td>
  <td>
  <Button variant='contained' color = 'primary'
  onClick={()=>onSelect(pokemon)}
  >
    select
  </Button>
  </td>
  
</tr>
)

PokemonRow.propTypes = {
      pokemon : PropTypes.shape({
        name : PropTypes.shape({
          english : PropTypes.string
        }),
        type : PropTypes.arrayOf(PropTypes.string),
        onSelect : PropTypes.func,
      }), //
    

}


const PokemonInfo = ({name,base})=>(
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key) => (
          <tr
          key={key}
          >
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)

PokemonInfo.propTypes = {
    name : PropTypes.shape({
      english : PropTypes.string
    }),
    base : PropTypes.shape({
      Hp: PropTypes.number.isRequired,
      Attack : PropTypes.number.isRequired,
      Defense : PropTypes.number.isRequired,
      "Sp. Attack":PropTypes.number.isRequired,
      "Sp. Defense" : PropTypes.number.isRequired,
      Speed : PropTypes.number.isRequired
    })
}




const Title = styled.h1`
    text-align: center;
   `;

const TwoColumns = styled.div`
display : grid;
grid-template-columns : 70% 30%;
grid-column-gap : 1rem;
`;


const Input = styled.input`
  width: 100%;
  font-size: larger;
  padding: 0.2rem;
  margin: 2rem;
`;


const Table = styled.table`
  text-align: center;
`;


function App() {
  const [filter,filterSet] = React.useState("");

  const[pokemon,pokemonSet] = React.useState([]);

  const [selectedItem,selectedItemSet] = React.useState(null);

  React.useEffect(()=>{
    fetch("http://localhost:3000/react-base/pokemon.json") 
    .then((res) => res.json())
    .then((data) => pokemonSet(data))
  },[])





  return (

    <TwoColumns>

    <div style={
      {
        display : "flex",
        justifyContent : "space-around"
      }
    }>
    <div>
        <Title>Pokemon Search</Title>
        <Input 
        
        value={filter}

        onChange={(evt)=>filterSet(evt.target.value)}
        />
        <Table border = "1" width={500}>
          <thead>
            <tr>
            <th>Name</th>
            <th>Category</th>
            </tr>
          </thead>
          <tbody>

       {pokemon
       .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
       
       .slice(0,20).map((pokemon)=>(
           <PokemonRow pokemon= {pokemon} key = {pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)}/>
       ))}
          </tbody>
        </Table>
    </div>
      
    {selectedItem && (
      <PokemonInfo {...selectedItem}/>
    )}

    </div>

    </TwoColumns>
  );
}

export default App;
