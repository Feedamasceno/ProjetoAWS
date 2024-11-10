import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCar.css';

function AddCar() {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [categoria, setCategoria] = useState('');
    const [disponibilidade, setDisponibilidade] = useState(true);
    const [arquivo, setArquivo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!modelo || !marca || !ano || !categoria) {
            setError('Todos os campos obrigatórios devem ser preenchidos');
            return;
        }
        
        const formData = new FormData();
        formData.append('modelo', modelo);
        formData.append('marca', marca);
        formData.append('ano', ano);
        formData.append('categoria', categoria);
        formData.append('disponibilidade', disponibilidade);
        if (arquivo) {
            formData.append('arquivo', arquivo);
        }

        fetch('http://localhost:25000/data', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    setSuccess('Carro adicionado com sucesso!');
                    setError('');
                    navigate('/'); // Volta para a lista de carros
                } else {
                    setError('Erro ao adicionar carro. Tente novamente.');
                }
            })
            .catch(error => {
                setError('Erro ao adicionar carro: ' + error.message);
            });
    };

    const handleAdd = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <div className="text">Adicionar Carro</div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-data">
                        <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                        <div className="underline"></div>
                        <label>Modelo</label>
                    </div>
                    <div className="input-data">
                        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        <div className="underline"></div>
                        <label>Marca</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />
                        <div className="underline"></div>
                        <label>Ano de Fabricação</label>
                    </div>
                    <div className="input-data">
                        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                        <div className="underline"></div>
                        <label>Categoria</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data">
                        <input type="file" onChange={(e) => setArquivo(e.target.files[0])} />
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-data textarea">
                        <label>Disponibilidade</label>
                    </div>
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={disponibilidade}
                        onChange={() => setDisponibilidade(!disponibilidade)}
                    />
                </div>
                
                <div className="form-row submit-btn">
                    <div className="input-data">
                        <div className="inner"></div>
                        <input type="submit" value="Adicionar" />
                    </div>
                    <div className="input-data">
                        <div className="inner"></div>
                        <input type="button" value="Voltar" onClick={handleAdd} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
