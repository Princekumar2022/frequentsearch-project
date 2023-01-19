const formModel = require("../models/formModel")
const mongoose = require("mongoose")


//validation
const { isValidMail, isValid, isValidName, isValidRequestBody, isValidMobile, isValidPassword } = require("../validator/validation")



// create Form 

const createForm = async function (req, res) {
    try {
        let data = req.body

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, msg: " body cant't be empty Please enter some data." })

        const { FirstName, LastName, phone, email, password } = data

        if (!isValid(FirstName)) return res.status(400).send({ status: false, message: "FirstName is required" })
        if (!isValid(LastName)) return res.status(400).send({ status: false, message: "LastName is  required" })
        if (!isValid(email)) return res.status(400).send({ status: false, message: "mail id is required" })
        if (!isValid(phone)) return res.status(400).send({ status: false, message: "phone no. is required" })
        if (!isValid(password)) return res.status(400).send({ status: false, message: "password is required" })


        if (!isValidName.test(FirstName)) return res.status(406).send({
            status: false, msg: "Enter a valid name",
            validname: "length of name has to be in between (3-20)  , use only String "
        })

        if (!isValidName.test(LastName)) return res.status(406).send({
            status: false, msg: "Enter a valid name",
            validname: "length of name has to be in between (3-20)  , use only String "
        })

        if (!isValidMail.test(email)) return res.status(406).send({
            status: false, msg: "email id is not valid",
            ValidMail: "email must be in for e.g. xyz@abc.com format."
        })

        if (!isValidMobile.test(phone)) return res.status(406).send({
            status: false, message: "mobile no. is not valid",
            ValidMobile: "it must be 10 digit Number & it should be a indian mobile no."
        })

        // let uniquePhone = await formModel.findOne({ phone: phone })
        // if (uniquePhone) return res.status(400).send({ status: false, message: "phone no. Already Exists." })

        let uniqueEmail = await formModel.findOne({ email: email })
        if (uniqueEmail) return res.status(400).send({ status: false, message: "email Id Already Exists." })

        if (!isValidPassword(password)) return res.status(406).send({
            status: false, message: "enter valid password  ",
            ValidPassWord: "passWord in between(8-15)& must be contain ==> upperCase,lowerCase,specialCharecter & Number"
        })

        const userData = {
            FirstName, LastName, email, phone, password
        }

        let savedData = await formModel.create(userData)
        res.status(201).send({ status: true, message: "form created successfully", data: savedData })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};





module.exports = { createForm }