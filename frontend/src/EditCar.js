import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCar.css'; // Importando o arquivo de estilos CSS

function EditCar() {
    const { carId } = useParams();
    const [car, setCar] = useState({
        modelo: '',
        marca: '',
        ano: '',
        categoria: '',
        disponibilidade: false,
        arquivo: '',
    });
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:25000/data/${carId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => setCar(data))
            .catch(error => {
                console.error("Erro ao buscar carro:", error);
                setError('Erro ao buscar carro: ' + error.message); 
            });
    }, [carId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifique se todos os campos estão preenchidos
        if (!car.modelo || !car.marca || !car.ano || !car.categoria || car.disponibilidade === undefined || !car.arquivo) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        fetch(`http://localhost:25000/data/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error); 
                setSuccess(null); 
            } else {
                setSuccess('Carro atualizado com sucesso!');
                setError(null); 
                navigate('/'); 
            }
        })
        .catch(error => {
            setError('Erro ao editar carro: ' + error.message);
            setSuccess(null);
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    if (!car) return <div>Carregando...</div>;

    return (
        <div className="container">
            <h2 className="text">Editar Carro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input 
                            type="text" 
                            name="modelo" 
                            value={car.modelo} 
                            onChange={handleChange} 
                            required 
                        />
                        <label>Modelo</label>
                    </div>
                    <div className="input-data">
                        <input 
                            type="text" 
                            name="marca" 
                            value={car.marca} 
                            onChange={handleChange} 
                            required 
                        />
                        <label>Marca</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-data">
                        <input 
                            type="number" 
                            name="ano" 
                            value={car.ano} 
                            onChange={handleChange} 
                            required 
                        />
                        <label>Ano</label>
                    </div>
                    <div className="input-data">
                        <input 
                            type="text" 
                            name="categoria" 
                            value={car.categoria} 
                            onChange={handleChange} 
                            required 
                        />
                        <label>Categoria</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-data">
                        <label>
                            Disponibilidade:
                            <input 
                                type="checkbox" 
                                name="disponibilidade" 
                                checked={car.disponibilidade} 
                                onChange={handleChange} 
                            />
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-data">
                        <input 
                            type="file" 
                            name="arquivo" 
                            onChange={(e) => setCar({ ...car, arquivo: e.target.files[0] })}
                            required 
                        />
                        <label>Arquivo</label>
                    </div>
                </div>

                <div className="submit-btn">
                    <div className="input-data">
                        <input type="submit" value="Salvar" />
                    </div>
                </div>
            </form>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
}

export default EditCar;
