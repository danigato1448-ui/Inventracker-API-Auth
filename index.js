/**
 * EVIDENCIA: GA7-220501096-AA5-EV01
 * DESCRIPCIÓN: Diseño y desarrollo de servicio web para Autenticación (Login/Registro).
 * AUTOR: [Tu Nombre]
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Reemplaza body-parser (ya viene en Express)

// Base de datos simulada (Aquí conectarás tu MySQL de NetBeans después)
const usuariosDB = [
    { usuario: "admin", password: "123" }
];

/**
 * RUTA: POST /api/login
 * FUNCIONALIDAD: Recibe credenciales y valida contra la "base de datos".
 */
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;

    // Buscamos si el usuario y contraseña coinciden
    const usuarioEncontrado = usuariosDB.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        // Mensaje requerido por la guía en caso de éxito
        return res.status(200).json({ 
            success: true,
            message: "Autenticación satisfactoria" 
        });
    } else {
        // Mensaje requerido por la guía en caso de fallo
        return res.status(401).json({ 
            success: false,
            message: "Error en la autenticación" 
        });
    }
});

/**
 * RUTA: POST /api/registro
 * FUNCIONALIDAD: Registra nuevos usuarios en el sistema.
 */
app.post('/api/registro', (req, res) => {
    const { usuario, password } = req.body;
    
    if (!usuario || !password) {
        return res.status(400).json({ message: "Datos incompletos" });
    }

    usuariosDB.push({ usuario, password });
    res.status(201).json({ message: "Usuario registrado con éxito" });
});

// Configuración del puerto
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servicio Web de Autenticación corriendo en http://localhost:${PORT}`);
});