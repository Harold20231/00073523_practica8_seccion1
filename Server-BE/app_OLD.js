// Importación de librerías necesarias
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // Clave secreta para firmar los tokens JWT

// Middlewares globales
app.use(bodyParser.json()); // Parsear JSON en requests
app.use(cors());            // Permitir solicitudes desde otros dominios

// Base de datos dummy (solo para pruebas)
const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "$2b$10$ir3OgWAG.L5VoPB5FieQheC0WGZu6U04YePsvyHUpf5lLarjel6YO" // hash de "123456"
  },
];

// Middleware para verificar token JWT en rutas protegidas
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1]; // Extraer token del header
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Guardar datos del usuario en la request
    next();
  });
};

// Ruta de login
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Comparar contraseña con hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  // Generar token JWT válido por 1 hora
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

// Ruta protegida
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
