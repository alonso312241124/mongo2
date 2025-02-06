const mongoose = require('mongoose');
require('dotenv').config();
const pass = process.env.PASS;

mongoose.connect(`mongodb+srv://alonsolopezm1234:${pass}@cluster0.iwocs.mongodb.net/almacen`)
  .then(() => console.log('Connected!'));


const ordenadorSchema = new mongoose.Schema({
    marca:String,
    precio:Number
})

const Ordenador = mongoose.model('Ordenadore', ordenadorSchema, 'ordenadores');

const buscaPrimero = () => {
    Ordenador.findOne()
    .then(ordenador =>{
        if(ordenador){
            console.log('Primer ordenador encontrado', ordenador)
        }else{
            console.log('No se encontró ningún registro')
        }
    })
    .catch(err=>console.error('Error al obtener el ordenador'));
}

const buscaTodos = () => {
    return Ordenador.find()
    .then(ordenadores =>{
        if(ordenadores.length>0){
            console.log('Ordenadores encontrados ', ordenadores)
            return ordenadores;
        }else{
            console.log('No se encontró ningún registro')
            return null;    
        }
    })
    .catch(err=>{
        console.error('Error al obtener los ordenadores', err);
        throw err;
    });
}

const buscaPorId = (id) => {
    return Ordenador.findById(id)
    .then(ordenador =>{
        if(ordenador){
            console.log('Primer ordenador encontrado', ordenador)
            return ordenador;
        }else{
            console.log('No se encontró ningún registro')
            return null;
        }
    })
    .catch(err=>{
        console.error('Error al obtener el ordenador');
        throw err;
    });
}

const buscaPrecioMayor = (precio) => {
    Ordenador.find({precio:{$gt:precio}})
    .then(ordenadores =>{
        if(ordenadores.length>0){
            console.log('Ordenadores encontrados con precio mayor a ' + precio + ' ' + ordenadores)
        }else{
            console.log('No se encontró ningún registro')
        }
    })
    .catch(err=>console.error('Error al obtener los ordenadores', err));
}

const crearNuevoOrdenador = (m, p) =>{
    const nuevoOrdenador = new Ordenador({
        marca: m,
        precio: p
      });
    nuevoOrdenador.save()
        .then(ordenador => console.log('Ordenador guardado:', ordenador))
        .catch(err => console.error('Error al guardar el ordenador:', err));
}

const actualizaPrecio = (idOrdenador, nuevoPrecio) =>{
    Ordenador.findByIdAndUpdate(idOrdenador, { precio: nuevoPrecio }, { new: true })
    .then(ordenadorActualizado => {
        if (ordenadorActualizado) {
            console.log('Ordenador actualizado:', ordenadorActualizado);
        } else {
            console.log('No se encontró ningún ordenador con ese ID.');
        }
    })
    .catch(err => console.error('Error al actualizar el ordenador:', err));
}

const borraOrdenador = (idOrdenadorParaBorrar) => {
    Ordenador.findByIdAndDelete(idOrdenadorParaBorrar)
    .then(ordenadorEliminado => {
        if (ordenadorEliminado) {
          console.log('Ordenador eliminado:', ordenadorEliminado);
        } else {
          console.log('No se encontró ningún ordenador con ese ID.');
        }
    })
    .catch(err => console.error('Error al eliminar el ordenador:', err));
}

module.exports = {buscaPrimero, buscaTodos, buscaPorId, buscaPrecioMayor, crearNuevoOrdenador, actualizaPrecio, borraOrdenador, Ordenador}