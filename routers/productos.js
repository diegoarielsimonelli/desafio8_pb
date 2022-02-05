const express = require('express');

const productosRouter = express.Router();

const Contenedor = require('../class');
const productosContenedor = new Contenedor('/data/productos.json')

productosRouter.get('/',  (req, res) =>{
    const lista =  productosContenedor.getAll()
    res.send({
        data: lista
    })
})

productosRouter.get('/:id',  (req, res) =>{
    idProducto = Number(req.params.id)
    const productoSeleccionado =  productosContenedor.getById(idProducto)
    if (!productoSeleccionado){
        res.send({ error : 'producto no encontrado' })
    }else{
        res.send({
            data: productoSeleccionado
        })
    }
})

productosRouter.post('/',  (req, res) =>{
    const newProducto = req.body; 
    const idProductoNuevo =  productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

productosRouter.put('/:id',  (req, res) =>{
    const datosNuevos = req.body
    const productoUpdate =  productosContenedor.update(req.params.id,datosNuevos)

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


productosRouter.delete('/:id',  (req, res) =>{
    idProducto = Number(req.params.id)
    const productoAEliminiar =  productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        res.send({ error : 'Producto no Encontrado' })
    }else {
         productosContenedor.deleteById(idProducto);
        res.send({ message : 'Producto Eliminado de Forma Correcta' })
    }
})

module.exports = productosRouter;