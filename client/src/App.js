import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route } from "react-router-dom";

import  DisplayData  from './DisplayData';
import Results from './Results';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://server-sales-api-jb2022.herokuapp.com/graphql"
  })
  return (
   
        <ApolloProvider client = {client}>
            <div className='App'>
              <Routes>
                    <Route exact path="/" element={<DisplayData/>} />
                    <Route exact path="/results" element={ <Results /> }/>
              </Routes>
              <Footer />
              
            </div>
        </ApolloProvider>
    
  );
}

export default App;


const Footer = () =>{

  return(
    <div>
      <footer>Jonathan Brown - January 2022 </footer>
    </div>

  );

  
}

//Heroku API link : https://server-sales-api-jb2022.herokuapp.com/graphql
//Link to Live App: https://server-sales-appjb2022.herokuapp.com/

