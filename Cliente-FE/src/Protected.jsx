// Cliente-FE/src/Protected.jsx (Lógica para cargar el CRUD)

import React, { useState, useEffect } from "react";
import API from "./utils/api"; 
import { Link } from "react-router-dom"; // O tu método de navegación

const Protected = () => {
    const [users, setUsers] = useState([]); // Estado para guardar la lista de usuarios
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // ⚠️ Llamada GET protegida a /api/users
                const response = await API.get("/api/users"); 
                setUsers(response.data); // Asume que el BE devuelve la lista en response.data
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
                // Aquí podrías redirigir al login si el token expira (Error 401/403)
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Se ejecuta solo una vez al cargar el componente

    // Lógica para cerrar sesión (si la tienes)
    const handleLogout = () => {
        localStorage.removeItem("token");
        // Aquí debes navegar de vuelta a / (o a /login)
    };

    if (loading) {
        return <div>Cargando lista de usuarios...</div>;
    }

    return (
        <div>
            <h2>Protected Page (CRUD Dashboard)</h2>
            <button onClick={handleLogout}>Cerrar Sesión</button> 
            
            {/* ⚠️ CRÍTICO: Mostrar la lista de usuarios */}
            <h3>Lista de Usuarios ({users.length} encontrados)</h3>
            <ul>
                {users.map(user => (
                    // Aquí se mostraría también el botón de Editar y Eliminar para CRUD
                    <li key={user.id}>
                        {user.id}: {user.name} ({user.email})
                    </li>
                ))}
            </ul>
            
            <Link to="/login">Go to Login</Link>
        </div>
    );
};

export default Protected;