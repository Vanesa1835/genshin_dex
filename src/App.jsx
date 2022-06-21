import { useEffect } from 'react';
import { useState } from 'react';
//para poner lista desplegable
const tipos= {
  artifacts:"artefactos",
  boss:"Jefes",
  characters:"Personajes",
  consumables:"Consumibles",
  domains:"dominios",
  elements:"elementos",
  enemies: "enemigos",
  materials:"Materiales",
  nations:"Naciones",
  weapons: "armas",
};



function App () {

  const [genshinState, setGenshinState] = useState({
    types:[],
  }  );

  

  const fetchGenshinApi = async (item, url= "https://api.genshin.dev/") =>{
  const respuesta = await fetch(url);
  const respJson  = await respuesta.json();
    if(item==="types"){
      setGenshinState({
    ...genshinState,
    types: respJson.types,
  });
    } else { 
      setGenshinState({types:
        [...genshinState.types],
      [item]:respJson
      });
    }
  };
  
  useEffect(()=>{
    fetchGenshinApi("types");
  },[]);

  
 

 const hanledChangeType =({target}) =>{
   const url= `https://api.genshin.dev/${target.value}`;
   fetchGenshinApi(target.value, url);
   console.log(genshinState);
 };
  
  
  return (
    
      <div className="App container">
        <h2>GENSHIN IMPACT DEX</h2>
        <hr/>
        <select name = "types" onChange={hanledChangeType}>
          <option value="">seleccione una opcion</option>
          {genshinState.types.map((type)=> (
          <option key={type} value={type} >
            {tipos[type]}
          
          </option>
          
          ))}

        
        </select>
        {
          genshinState.artifacts && <select name="artifacts">
            <option value="">seleccione un set de artefactos</option>
            {genshinState.artifacts.map((artifacts)=>(
              <option key={artifacts} value={artifacts}>
                {artifacts }
              </option>
            ))}
          </select>
        }
        {
          genshinState.characters && <select name="characters">
            <option value="">seleccione un set de Personajes</option>
            {genshinState.characters.map((characters)=>(
              <option key={characters} value={characters}>
                {characters }
              </option>
            ))}
          </select>
        }
      </div>
  
  );
}

export default App;

