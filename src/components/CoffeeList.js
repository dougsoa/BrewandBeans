// src/components/CoffeeList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function CoffeeList() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'coffees'));
        const coffeeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCoffees(coffeeList);
      } catch (error) {
        console.error('Erro ao buscar cafés:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  if (loading) {
    return <p>Carregando cafés...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Cafés</h2>
      <ul>
        {coffees.length > 0 ? (
          coffees.map(coffee => (
            <li key={coffee.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{coffee.name}</h3>
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
