// App.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './AddCar.css';
import AddCar from './AddCar';
import EditCar from './EditCar';

function App() {
    const [data, setData] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState(null); // Estado para armazenar o ID do carro selecionado
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:25000/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Erro ao buscar os dados:", error));
    };

    const handleAdd = () => {
        navigate('/add'); // Navega para a página de adicionar carro
    };

    const handleEdit = (carId) => {
        navigate(`/edit/${carId}`); // Navega para a página de editar carro
    };

    const handleDelete = (carId) => {
        if (window.confirm("Tem certeza que deseja excluir este carro?")) {
            fetch(`http://localhost:25000/data/${carId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        fetchData(); // Recarregar os dados após exclusão
                    } else {
                        console.error("Erro ao excluir o carro:", response.statusText);
                    }
                })
                .catch(error => console.error("Erro ao excluir o carro:", error));
        }
    };

    return (
        <div className="App">
            <div class="container">
                <div class="text">
                    Lista de Carros
                </div>
                <div class="form-row-home">
                    <input class="input-data-home" type="button" value="ADICIONAR CARRO" onClick={handleAdd} />
                    <input class="input-data-home" type="button" value="EXCLUIR CARRO" onClick={() => selectedCarId ? handleDelete(selectedCarId) : alert("Selecione um carro para excluir.")} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Ano</th>
                            <th>Categoria</th>
                            <th>Disponibilidade</th>
                            <th>Ações</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map(car => (
                            <tr key={car.id} onClick={() => setSelectedCarId(car.id)}> {/* Adiciona a seleção do carro */}
                                <td>{car.modelo}</td>
                                <td>{car.marca}</td>
                                <td>{car.ano}</td>
                                <td>{car.categoria}</td>
                                <td>{car.disponibilidade ? 'Disponível' : 'Indisponível'}</td>
                                <td>
                                    
                                    <button class="editCar" onClick={() => handleEdit(car.id)}>Editar</button> {/* Botão de editar dentro da tabela */}
                                    <button class="editCar" onClick={() => handleDelete(car.id)}>Excluir</button> {/* Botão de excluir dentro da tabela */}
                                </td>
                                <td>{car.image}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}

export default App;
