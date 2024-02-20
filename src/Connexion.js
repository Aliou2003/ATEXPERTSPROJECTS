import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

const Connexion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Initialize to false
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }
  
    try {
      const csrftoken = getCookie('csrftoken');
      const response = await fetch('http://127.0.0.1:8000/myapp/connexion/', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          email: email,
          motDepasse: password,
        }),
      });
  
      if (response.ok) {
        console.log('Connexion réussie !');
        navigate('/Accueilprinc');
      } else {
        const data = await response.json();
        if (data.error) {
          console.log('Erreur lors de la connexion :', data.error);
        } else {
          console.log('Erreur inconnue lors de la connexion.');
        }
      }
    } catch (err) {
      console.error('Erreur lors de la requête de connexion :', err);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lala">
      <div className="connexion-section signin">
        <h2>Se connecter</h2>
        {errorMessage && <p style={{ color: 'white' }}>{errorMessage}</p>}
        <div className="connexion-input-container">
          <FontAwesomeIcon icon={faEnvelope} className="connexion-icone" />
          <input type="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="connexion-input-container">
          <FontAwesomeIcon icon={faLock} className="connexion-icon" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
          <br></br>
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Cacher' : 'Voir'}
          </button><br /><br />
        </div>
        <button onClick={handleSignIn}>Se connecter</button>
        <p>Vous n'avez pas de compte? <span onClick={() => navigate('/Home/Inscription')}>S'inscrire</span></p>
      </div>
    </div>
  );
};

export default Connexion;
