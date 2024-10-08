// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'; // Alterado para browserSessionPersistence
import { getFirestore } from 'firebase/firestore';  // Importa Firestore
import { getStorage } from 'firebase/storage'; // Importa Firebase Storage

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCaJWdietIBdIui3qHyzToWAVsV7ZYPJk",
    authDomain: "projectbrewandbean.firebaseapp.com",
    projectId: "projectbrewandbean",
    storageBucket: "projectbrewandbean.appspot.com", // Certifique-se de que o storageBucket está especificado
    messagingSenderId: "924028220540",
    appId: "1:924028220540:web:afa332bf9f3b15c60845f9"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth
const auth = getAuth(app);

// Define a persistência para SESSION (a sessão de login expira ao fechar o navegador)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Persistência configurada para session-only (expira ao fechar o navegador)');
  })
  .catch((error) => {
    console.error("Erro ao definir a persistência:", error);
  });

// Inicializa o Firestore
const db = getFirestore(app);  // Inicializa Firestore

// Inicializa o Firebase Storage
const storage = getStorage(app);  // Inicializa Storage

export { auth, db, storage, app };  // Exporta auth, db e storage para usar na aplicação
