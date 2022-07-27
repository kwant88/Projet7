const express = require('express');
const router = express.Router();

const auth = require('../../../Projet6/backend/middleware/auth');
const multer = require('../../../Projet6/backend/middleware/multer-config');

const sauceCtrl = require('../../../Projet6/backend/controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;