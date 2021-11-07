import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const  [data, setData]= React.useState(null);
  React.useEffect(() => {
    fetch("/libertymutual/posts/2/comments", {
      method: 'GET',
      headers: {
        Authorization: `jwt token`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data)
        setData(data[0].body)
      });
  }, []);

  // alternatively
  const [dataTest, setDataTest] = React.useState(null);
  useEffect(() => {
    async function fetchLMAPI() {
      let response = await fetch('/libertymutual/posts/3/comments', {
        method: 'GET',
        headers: {
          Authorization: `jwt token`,
          'Content-Type': 'application/json'
        }
      })
      const d = response.json();
      //setDataTest(response)
      d.then ((resp) => {
        console.log(JSON.stringify(resp))
        setDataTest(JSON.stringify(resp))
      })
    }

    fetchLMAPI()
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         <p>
         {!data ? "Loading..." : data}
         {dataTest} 
         </p>
        </p>
      </header>
    </div>
  );
}

export default App;
