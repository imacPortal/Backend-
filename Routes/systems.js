// system add(done), remove and update

const router = require('express').Router();
const System = require('../Model/System.model');
const Lab = require('../Model/lab.model');

router.route('/add').post((req,res)=>{
    const {ram, storage, processor, serialNo, labNo, systemNo} = req.body;

    const newSystem = new System({
        ram,
        storage,
        processor,
        serialNo
    })

    newSystem.save()
        .then(()=>{
            const newDevice = new Lab({
                labNo,
                systemNo,
                serialNo
            })
            newDevice.save()
                .then(()=>{
                    res.json({ status: "system added", success: true })
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router