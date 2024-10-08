import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Certifique-se de importar auth
import { collection, query, where, getDocs } from 'firebase/firestore';

function CoffeeList() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const user = auth.currentUser; // Obtém o usuário atual
        if (user) {
          // Filtra por ID do usuário
          const q = query(collection(db, 'coffees'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const coffeeList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCoffees(coffeeList);
        } else {
          setError('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao buscar cafés:', error);
        setError('Ocorreu um erro ao carregar a lista de cafés.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  if (loading) {
    return <p>Carregando cafés...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Cafés</h2>
      <ul>
        {coffees.length > 0 ? (
          coffees.map(coffee => (
            <li key={coffee.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{coffee.name}</h3>
              {coffee.imageUrl && (
                <img
                  src={coffee.imageUrl}
                  alt={coffee.name}
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
              <p>{coffee.details}</p>
            </li>
          ))
        ) : (
          <p>Nenhum café encontrado.</p>
        )}
      </ul>
    </div>
  );
}

export default CoffeeList;
