const db = require('../../config/bd');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM usuarios';
        const users = await db.pool.query(query);
        users.forEach(user => delete user.contraseña);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

exports.getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const query = 'SELECT * FROM usuarios WHERE nombreUsuario = ?';
        const [user] = await db.pool.query(query, [username]);
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
        delete user.contraseña;
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

exports.createUser = async (req, res) => {
    const { nombreUsuario, contraseña, correo } = req.body;

    if (!nombreUsuario || !contraseña || !correo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const hash = await bcrypt.hash(contraseña, saltRounds);
        const query = 'INSERT INTO usuarios (nombreUsuario, contraseña, correo, tipo) VALUES (?, ?, ?, ?)';
        const result = await db.pool.query(query, [nombreUsuario, hash, correo, 'F']);
        const usuarioId = result.insertId;

        res.json({ id: parseInt(usuarioId) });
    } catch (error) {
        if (error.errno === 1062) {
            console.log(error);
            return res.status(409).json({ error: 'El nombre de usuario ya existe' });
        }
        console.log(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

exports.updateUserEmail = async (req, res) => {
    const { username } = req.params;
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE usuarios SET correo = ? WHERE nombreUsuario = ?';
        await db.pool.query(query, [correo, username]);
        res.json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating email' });
    }
};

exports.updateUserPassword = async (req, res) => {
    const { username } = req.params;
    const { contraseña } = req.body;

    if (!contraseña) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE usuarios SET contraseña = ? WHERE nombreUsuario = ?';
        await db.pool.query(query, [contraseña, username]);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password' });
    }
}

exports.updateUserAvatar = async (req, res) => {
    const { username } = req.params;
    const { avatares_id } = req.body;

    if (!avatares_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE usuarios SET avatares_id = ? WHERE nombreUsuario = ?';
        await db.pool.query(query, [avatares_id, username]);
        res.json({ message: 'Avatar updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating avatar' });
    }
}

exports.updateUserCar = async (req, res) => {
    const { username } = req.params;
    const { autos_id } = req.body;

    if (!autos_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE usuarios SET autos_id = ? WHERE nombreUsuario = ?';
        await db.pool.query(query, [autos_id, username]);
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating car' });
    }
}

exports.updateUserType = async (req, res) => {
    const { username } = req.params;
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = 'UPDATE usuarios SET tipo = ? WHERE nombreUsuario = ?';
        await db.pool.query(query, [tipo, username]);
        res.json({ message: 'User type updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user type' });
    }
}
