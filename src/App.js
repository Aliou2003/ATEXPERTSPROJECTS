import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importez Route
import Home from './Home';
import "./Home.css";
import Accueilprinc from './Accueilprinc';
import "./Accueilprinc.css";
import Inscription from "./Inscription";
import "./Inscription.css";
import Connexion from './Connexion';
import "./Connexion.css";
import Contact from './Contact';
import "./Contact.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
       
        </div>
        <Routes>
          <Route exact path="/Home" element={<Home />} /> {/* Utilisez Route avec element */}
          <Route exact path="/Home/Inscription" element={<Inscription />} /> {/* Utilisez Route avec element */}
          <Route exact path="/Home/Connexion" element= {<Connexion />}/>
          <Route exact path="/Accueilprinc" element= {<Accueilprinc />}/>
          <Route exact path="/Home/Contact" element= {<Contact />}/>

          {/* Rediriger l'utilisateur vers la page d'accueil si une route inconnue est demandée */}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
