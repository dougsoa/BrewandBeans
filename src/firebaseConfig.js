// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCaJWdietIBdIui3qHyzToWAVsV7ZYPJk",
    authDomain: "projectbrewandbean.firebaseapp.com",
    projectId: "projectbrewandbean",
    storageBucket: "projectbrewandbean.appspot.com",
    messagingSenderId: "924028220540",
    appId: "1:924028220540:web:afa332bf9f3b15c60845f9"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define a persistência para LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // A persistência foi definida com sucesso
    console.log('Persistência LOCAL configurada com sucesso');
  })
  .catch((error) => {
    // Lida com erros ao definir a persistência
    console.error("Erro ao definir a persistência:", error);
  });

export { auth };
