const express = require('express')

const fs = require('fs')

const router = express.Router()

const PATH_ROUTES = __dirname

const removerExtension = (nombreArchivo) => {
    return nombreArchivo.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((archivo) => {
    const nombre = removerExtension(archivo)
    if (nombre != 'index') {
        router.use(`/${nombre}`, require(`./${archivo}`))
    }
})


module.exports = router