const Article = require('../src/models/articleModel');
const User = require('../src/models/userModel');

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email');
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.status(200).json(article);
  } catch (err) {
    // Gestion CastError (Exercice 2)
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: 'title, content et authorId sont obligatoires' });
    }

    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Auteur non trouvé (identifiant authorId invalide)' });
    }

    const newArticle = await Article.create({ title, content, author: authorId });
    const populatedArticle = await newArticle.populate('author', 'name email');
    res.status(201).json(populatedArticle);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Article introuvable pour la mise à jour' });
    }
    const populated = await article.populate('author', 'name email');
    res.status(200).json(populated);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article introuvable pour la suppression' });
    }
    res.status(200).json({ message: 'Article supprimé avec succès', id: req.params.id });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (format ObjectId attendu)' });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};