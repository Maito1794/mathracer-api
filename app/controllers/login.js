
const db = require('../../config/bd');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { nombreUsuario, contraseña } = req.query;

    try {
        const [user] = await db.pool.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const match = await bcrypt.compare(contraseña, user.contraseña);

        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

