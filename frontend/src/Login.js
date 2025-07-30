// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/' // endpoint para registro
      : 'http://localhost:8000/api/login/';   // endpoint para login

    try {
      const response = await axios.post(url, {
        username,
        password,
      });

      if (isRegistering) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        setMessage('Inicio de sesión exitoso.');
        console.log('Token recibido:', response.data);
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registro' : 'Inicio de sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrar' : 'Iniciar sesión'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;