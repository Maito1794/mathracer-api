const db = require('../../config/bd');

exports.getUsersLevelsByCategory = async (req, res) => {
    const { nombreCategoria } = req.body;
    const { nombreUsuario } = req.params;
    try {
        const [result] = await db.pool.query('SELECT obtenerNivelesInfo(?, ?) AS nivelesInfo', [nombreCategoria, nombreUsuario]);
        const nivelesInfo = JSON.parse(result.nivelesInfo);
        if (!nivelesInfo) {
            return res.status(404).json({ error: 'Niveles no encontrados' });
        }
        res.json(nivelesInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los niveles del usuario' });
    }
};