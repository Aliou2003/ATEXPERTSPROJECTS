import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faSlack, faWhatsapp, faAmazon, } from '@fortawesome/free-brands-svg-icons';

import './Accueilprinc.css';
import './mdp.css';
import './profile.css';
import './notes.css';
import './cartecredits.css';
import './homeapp.css';

function Accueilprinc() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [showAppList, setShowAppList] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [carte, setCarte] = useState({
    modele: '',
    nom: '',
    numero: '',
    codePin: ''
  });

  const appIcons = {
    'Facebook': faFacebook,
    'Twitter': faTwitter,
    'Instagram': faInstagram,
    'Youtube': faYoutube,
    'Slack': faSlack,
    'Whatsapp': faWhatsapp,
    'Amazon': faAmazon,
  };

  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setShowAppList(false);
  };

  const generatePassword = () => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";
    
    for(let i = 0; i < passwordLength; i++){
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  };

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setGeneratedPassword(password);
  };

  const handleLogout = () => {
    navigate("/Home");
  };


  
  const copyMdp = () => {
    var inputPassword = document.getElementById('password');
  
    if (inputPassword && inputPassword.value.length === 10) {
      inputPassword.select();
      document.execCommand("copy");
  
      var copyBtn = document.getElementById('copy');
      if (copyBtn) {
        copyBtn.style.background = "";
        copyBtn.style.color = "";
      }
    } 
  };
  

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClearCreditCardFields = () => {
    setCarte({ modele: '', nom: '', numero: '', codePin: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('newPassword', newPassword);
    formData.append('photo', photo);
    formData.append('date', date);
    formData.append('notes', notes);
  };

  const appList = ['Facebook', 'Twitter', 'Instagram', 'Youtube', 'Slack', 'Whatsapp', 'Amazon']; 

  return (
    <div className="mdp">
      <div className="container">
        <div className="sidebar">
          <ul>
            <li className={activeMenu === 'home' ? 'active' : ''} onClick={() => handleMenuClick('home')}>HOME</li><br></br>
            <li className={activeMenu === 'notes' ? 'active' : ''} onClick={() => handleMenuClick('notes')}>NOTES</li><br></br>
            <li className={activeMenu === 'password' ? 'active' : ''} onClick={() => handleMenuClick('password')}>MOT DE PASSE</li><br></br>
            <li className={activeMenu === 'credit-card' ? 'active' : ''} onClick={() => handleMenuClick('credit-card')}>CARTE DE CREDITS</li><br></br>
            <li className={activeMenu === 'corbeille' ? 'active' : ''} onClick={() => handleMenuClick('corbeille')}>CORBEILLE</li><br></br>
          </ul>
          <ul id="lala">
            <li className={activeMenu === 'my-account' ? 'active' : ''} onClick={() => handleMenuClick('my-account')}>MON COMPTE</li>
            <div className='dis'>
              <li className="disconnect" onClick={handleLogout}>Se déconnecter</li>
            </div>
          </ul>
        </div>

        <div className="main-content">
          {activeMenu === 'home' && (
            <div>
              <h2>Associer des applications</h2>
              <button className="select" onClick={() => setShowAppList(true)}>Sélectionner une application</button>
              {showAppList && (
            <ul>
            {appList.map((app, index) => (
           <li key={index} onClick={() => handleAppClick(app)} className="app-item">
           <FontAwesomeIcon icon={appIcons[app]} /> {app}
           
          </li>
          ))}
       </ul>
      )}
            {selectedApp && (
                <div className="action-buttons">
                  <h3>{selectedApp}</h3>
                <button onClick={handleGeneratePassword}>Générer un mot de passe</button>
                  {generatedPassword && (
                    <div>
                      <p>Mot de passe généré : {generatedPassword}</p>
                      <button id="copy" onClick={copyMdp}>Copier le mot de passe</button>
                </div>                   
                  )}
                </div>
              )}
            </div>
          )}

          {activeMenu === 'notes' && (
            <div className="notesBox">
              <h2>Notes</h2>
              <div>
                <div className='dates'>
                  <input className="dateInput" type="date" value={date} onChange={handleDateChange} />
                </div>
                <textarea rows="15" cols="150" value={notes} onChange={handleNotesChange} placeholder="Saisissez vos notes ici"></textarea>
                <button onClick={() => setNotes('')}>Effacer</button>
                <button onClick={handleSubmit}>Enregistrer</button>
              </div>
            </div>
          )}

          {activeMenu === 'password' && (
            <div className="inputBox">
              <h2>Mot de passe</h2>
              <input id="password" type="text" value={password} readOnly /><br />
              <div className="passwordBox">
                <button onClick={() => setPassword(generatePassword())}>Générer</button>
                <button id="copy" onClick={copyMdp}>Copier</button>
              </div>
            </div>
          )}

          {activeMenu === 'credit-card' && (
            <div className="creditCard">
              <h2>Carte de crédits</h2>
              <form onSubmit={handleSubmit}>
                <div className="input">
                  <center><p>Modèle de la carte</p><input type="text" placeholder="Modèle de la carte" value={carte.modele} onChange={(e) => setCarte({ ...carte, modele: e.target.value })} /></center>
                </div><br></br>
                <div className="input">
                  <center><p>Nom et prénom</p> <input type="text" placeholder="Nom et prénom" value={carte.nom} onChange={(e) => setCarte({ ...carte, nom: e.target.value })} /></center>
                </div><br></br>
                <div className="input">
                  <center><p>Numéro de la carte/CVC</p> <input type="text" placeholder="Numéro de la carte" value={carte.numero} onChange={(e) => setCarte({ ...carte, numero: e.target.value })} /></center> 
                </div><br></br>
                <div className="input">
                  <center><p>Code pin de la carte</p><input type="text" placeholder="Code PIN de la carte" value={carte.codePin} onChange={(e) => setCarte({ ...carte, codePin: e.target.value })} /></center> 
                </div><br></br>
                <div className="buttons">
                  <button type="button" onClick={handleClearCreditCardFields}>Effacer</button>
                  <button type="submit">Enregistrer</button>
                </div>
              </form>
            </div>
          )}

          {activeMenu === 'my-account' && (
            <div className="profilbox">
              <h2>MON PROFIL</h2>
              <form onSubmit={handleSubmit}>
                <div className="inpubox">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                  <input type="text" placeholder="Nom" value={lastName} onChange={handleLastNameChange} />
                  <input type="text" placeholder="Prénom" value={firstName} onChange={handleFirstNameChange} />
                  <input type="password" placeholder="Ancien Mot de passe" value={password} onChange={handlePasswordChange} />
                  <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={handleNewPasswordChange} />
                  <input type="password" placeholder="Confirmer le mot de passe" value={newPassword} onChange={handleNewPasswordChange} />
                  <button type="submit">Enregistrer</button>
                </div>
              </form>
            </div>
          )}

          {activeMenu === 'corbeille' && <h2>Corbeille</h2>}
        </div>
      </div>
    </div>
  );
}

export default Accueilprinc;
