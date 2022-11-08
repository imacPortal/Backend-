const router = require('express').Router();

const Report = require('../Model/report.model')

router.route('/fetchAll').get((req,res)=>{
    Report.find()
        .then((response)=>{
            res.json({ status: "fetched", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router