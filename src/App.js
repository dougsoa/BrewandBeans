import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import AppRoutes from './routes'; // Se você estiver usando um arquivo separado para as rotas

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Limpar o ouvinte quando o componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <div id="root">
      <div className="main-content">
        <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

export default App;
