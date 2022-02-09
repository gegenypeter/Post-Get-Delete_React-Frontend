import { useEffect, useState } from "react";
import http from 'axios';


function App() {
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState("")
  const [serieses, setSerieses] = useState([]);

  const create = async () => {
    await http.post("http://localhost:3000/api/serieses", {
      name: title,
      charList: characters.split(',')
    })
    load();
    setTitle("");
    setCharacters("");
  };

  const del = async (sid) => {
    await http.delete(`http://localhost:3000/api/serieses/${sid}`)
    load()
  };

  const load = async () => {
    const response = await http.get("http://localhost:3000/api/serieses")
    setSerieses(response.data);
  };

  useEffect(() => {
    load();
  }, [])

  return (
    <div className="App">
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} ></input>
      <textarea placeholder="characters" value={characters} onChange={(e) => setCharacters(e.target.value)} ></textarea>
      <button onClick={() => create()}>Create</button>
      {serieses.map(series => (
        <div key={series.id}>
          <p>{series.name}</p>
          <ul>
            {series.characters.map(character => (
              <li key={character}>{character}</li>
            )
            )}
          </ul>
          <button onClick={() => del(series.id)} >Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
