
const db = require('../../config/bd');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { nombreUsuario, password } = req.query;

    try {
        const [user] = await db.pool.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const match = await bcrypt.compare(password, user.contraseña);

        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        delete user.contraseña;

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

