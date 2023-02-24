const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

// Create
router.post("/api/reservacion", async (req, res) => {
  try {
    await db
      .collection("reservacion")
      .create({Nombre: req.body.Nombre},
      {Cedula: req.body.Cedula},
      {Correo: req.body.Correo},
       {Telefono: req.body.Telefono},
     {TipoHabitacion: req.body.TipoHabitacion});
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/reservacion/:id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("reservacion").doc(req.params.id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/reservacion", async (req, res) => {
  try {
    let query = db.collection("reservacion");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      Nombre: doc.data().Nombre,
      Cedula: doc.data().Cedula,
      Correo: doc.data().Correo,
      FechaRegistro: doc.data().FechaRegistro,
      Telefono: doc.data().Telefono,
      TipoHabitacion: doc.data().TipoHabitacion
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/api/reservacion/:id", async (req, res) => {
  try {
    const document = db.collection("reservacion").doc(req.params.id);
    await document.update({
      Nombre: req.body.Nombre,
      Cedula: req.body.Cedula ,
        Correo: req.body.Correo,
        FechaRegistro: req.body.FechaRegistro,
        Telefono: req.body.Telefono,
        TipoHabitacion: req.body.TipoHabitacion 
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/api/reservacion/:id", async (req, res) => {
  try {
    const doc = db.collection("reservacion").doc(req.params.id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;