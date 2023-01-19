const express = require('express');
const router = express.Router();
const { createForm } = require('../controllers/formController')



//..............................Test API.........................//

router.get("/test-me", function (req, res) {
    res.status(200).send({ status: true, message: "Testing API" })
})



//........................................User API............................................//

// create
router.post('/register', createForm)









router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })




module.exports = router