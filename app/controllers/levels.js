const db = require('../../config/bd');

exports.getUsersLevels = async (req, res) => {
    const { nombreUsuario } = req.params;
    try {
        let arrayNiveles = [];
        const categorias = await db.pool.query('SELECT * FROM categorias;');
        for (const categoria of categorias) {
            const nombreCategoria = categoria.nombre;

            const [niveles] = await db.pool.query('SELECT obtenerNivelesInfo(?, ?) AS nivelesInfo', [nombreCategoria, nombreUsuario]);
            const nivelesInfo = JSON.parse(niveles.nivelesInfo);

            arrayNiveles.push(nivelesInfo);
        }

        if (arrayNiveles.length === 0) {
            return res.status(404).json({ error: 'Niveles no encontrados' });
        }

        const [user] = await db.pool.query('SELECT id FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario]);

        const [preguntas] = await db.pool.query('SELECT obtenerPreguntasInfo(?) AS preguntasInfo', [user.id]);
        const preguntasInfo = JSON.parse(preguntas.preguntasInfo);

        if (!preguntasInfo) {
            return res.status(404).json({ error: 'Preguntas no encontradas' });
        }
        const resultado = organizarDatos(categorias, arrayNiveles, preguntasInfo);
        console.log("resultado", resultado);
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los niveles del usuario' });
    }
};

function organizarDatos(categorias, arrayNiveles, preguntasInfo) {
    const datosUnidos = [];

    categorias.forEach((categoria, index) => {
        const niveles = arrayNiveles[index];
        const categoriaInfo = {
            id: categoria.id,
            nombre: categoria.nombre,
            niveles: niveles.map(nivel => {
                const nivelId = parseInt(nivel.niveles_id);
                const preguntas = preguntasInfo.filter(
                    pregunta => parseInt(pregunta.niveles_id) === nivelId
                );
                return {
                    estado: nivel.estado,
                    dificultad: nivel.dificultad,
                    numero: nivel.numero,
                    niveles_id: nivel.niveles_id,
                    categorias_id: nivel.categorias_id,
                    preguntas: preguntas.map(pregunta => ({
                        preguntas_id: pregunta.preguntas_id,
                        estado: pregunta.estado,
                        numero_pregunta: pregunta.numero_pregunta,
                        niveles_id: pregunta.niveles_id,
                    })),
                };
            }),
        };

        datosUnidos.push(categoriaInfo);
    });

    return datosUnidos;
}
