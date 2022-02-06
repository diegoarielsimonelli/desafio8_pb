const express = require('express');

const productosRouter = express.Router();


const Contenedor = require('../class');
const productosContenedor = new Contenedor('/data/productos.json')
productosRouter.use(express.json());

productosRouter.get('/', async (req, res) =>{
    const lista = await productosContenedor.getAll()
    res.send({
        data: lista
    })
})

productosRouter.get('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoSeleccionado = await productosContenedor.getById(idProducto)
    if (!productoSeleccionado){
        res.send({ error : 'producto no encontrado' })
    }else{
        res.send({
            data: productoSeleccionado
        })
    }
})

productosRouter.post('/', async (req, res) =>{
    const newProducto = req.body; 
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

productosRouter.put('/:id', async (req, res) =>{
    const datosNuevos = req.body
    const productoUpdate = await productosContenedor.update(req.params.id,datosNuevos)

    if (!productoUpdate){
        res.send({
            error : 'Producto no encontrado',
            data : productoUpdate
        })

    } else{
        res.send({
            message :'Operación Exitosa',
            data : productoUpdate
        })
    }
})


productosRouter.delete('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoAEliminiar = await productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        res.send({ error : 'Producto no Encontrado' })
    }else {
        await productosContenedor.deleteById(idProducto);
        res.send({ message : 'Producto Eliminado de Forma Correcta' })
    }
})

module.exports = productosRouter;