//Necessitamos o pacote Express para que o router funcione
const express = require('express');
//Forma direta
// const tourController = require('./../controllers/tourController');

//Usando o destructuring
const {
  checkTourBody,
  confirTourId,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController');
//tourRouter se converte em router

// ==== ROTAS ====
const router = express.Router();

router.param('id', confirTourId);
router.route('/').get(getAllTours).post(checkTourBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//Vamos exportar o router e importa-lo em nossa aplicação:
module.exports = router;
