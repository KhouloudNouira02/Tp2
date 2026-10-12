
const { estNonVide, estEmailValide } = require('../utils/validators');

const users = [
  { id: 1, name: "khouloud", email: "khouloud@example.com", role: "admin" },
  { id: 2, name: "ali", email: "ali@example.com", role: "user" }
];

const getAllUsers = (req, res) => {
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter((u) => u.name === name);
  }
 
  res.status(200).json({ total: resultat.length, users: resultat });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  } 
  res.status(200).json(user);
};


const createUser = (req, res) => {
  const { name, email, role } = req.body;


  if (!name || !email || !role) {
    return res.status(400).json({ error: "Le nom, l’email et le rôle sont obligatoires" });
  }


  if (!estNonVide(name)) {
    return res.status(400).json({ error: "Le nom de l'utilisateur ne peut pas être vide" });
  }

  
  if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'adresse email fournie est invalide" });
  }

  const nouvelUtilisateur = { id: users.length + 1, name, email, role };
  users.push(nouvelUtilisateur);
  res.status(201).json({ message: "Utilisateur créé", user: nouvelUtilisateur });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);    
  if (index === -1) {
    return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} introuvable` });
  }

  users.splice(index, 1);
  res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser };