const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.static('public'));
const modeloOrdenador = require('./models/ordenador');
// Datos de ejemplo (simulando una base de datos)

// Obtener todos los ítems
app.get("/items", (req, res) => {
  modeloOrdenador.buscaTodos()
  .then(
    ordenadores=>res.status(200).json(ordenadores)
  )
  .catch(err=>res.status(500).send("error"))
});


// Obtener un ítem por ID
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  modeloOrdenador.buscaPorId(itemId)
  .then(
    ordenador=>res.status(200).json(ordenador)
  )
  .catch(err=>res.status(500).send("error"))
});


// Crear un nuevo ítem
app.post("/items", (req, res) => {
    marca= req.body.marca;
    precio= req.body.precio;
    modeloOrdenador.crearNuevoOrdenador(marca,precio)
    .then(
      ordenador=>res.status(200).json(ordenador)
    )
    .catch(err=>res.status(500).send("error"))

});


app.put("/items/:id", (req, res) => {
  const idOrdenador = req.params.id;
  const nuevoPrecio = req.body.precio;
  modeloOrdenador.actualizaPrecio(idOrdenador, nuevoPrecio)
    .then(() => {
      res.json({ message: "Precio actualizado correctamente." });
    })
    .catch(err => {
      console.error('Error al actualizar el ordenador:', err);
      res.status(500).json({ message: "Error al actualizar el ordenador" });
    });
})

// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  modeloOrdenador.borraOrdenador(itemId)
  .then(
    ordenador=>res.status(200).json(ordenador)
  )
  .catch(err=>res.status(500).send("error"))

});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});