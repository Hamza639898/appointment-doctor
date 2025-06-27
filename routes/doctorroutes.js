const express = require('express');
const router  = express.Router();
const ctl     = require('../controllers/doctorcontroller');

router.post('/',        ctl.createDoctor);
router.get('/',         ctl.getAllDoctors);
router.put('/:id',      ctl.updateDoctor);
router.delete('/:id',   ctl.deleteDoctor);
router.get('/search',   ctl.searchDoctors);

module.exports = router;