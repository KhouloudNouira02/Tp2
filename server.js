const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const articleRoutes = require('./src/routes/articleRoutes');
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Serveur MERN en écoute sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erreur critique de démarrage du serveur :', err.message);
    process.exit(1);
  }
})();