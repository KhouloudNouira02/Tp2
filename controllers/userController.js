const User = require('../src/models/userModel');
const Article = require('../src/models/articleModel'); 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};


const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
   
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    res.status(400).json({ message: err.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    
    const hasArticles = await Article.findOne({ author: req.params.id });
    if (hasArticles) {
      return res.status(400).json({ 
        message: 'Impossible de supprimer un utilisateur ayant des articles publies' 
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable pour la suppression' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès', id: req.params.id });
  } catch (err) {
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
};