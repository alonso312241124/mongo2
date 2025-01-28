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
    Ordenador.find()
    .then(ordenadores =>{
        if(ordenadores.length>0){
            console.log('Ordenadores encontrados ', ordenadores)
        }else{
            console.log('No se encontró ningún registro')
        }
    })
    .catch(err=>console.error('Error al obtener los ordenadores', err));
}

const buscaPorId = (id) => {
    Ordenador.findById(id)
    .then(ordenador =>{
        if(ordenador){
            console.log('Primer ordenador encontrado', ordenador)
        }else{
            console.log('No se encontró ningún registro')
        }
    })
    .catch(err=>console.error('Error al obtener el ordenador'));
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



module.exports = {buscaPrimero, buscaTodos, buscaPorId, buscaPrecioMayor, Ordenador}