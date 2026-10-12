const express = require('express');
const router = express.Router();

// Importation du contrôleur d'utilisateurs
const userController = require('../controllers/userController');

// Définition des routes CRUD pour les utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;