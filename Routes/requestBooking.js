// add a booking request, delete a booking request, update booking request

const router = require('express').Router();
const BookingReq = require('../Model/BookingRequest.model');
const Report = require('../Model/report.model')

router.route('/add').post((req,res)=>{
    const { date, slots, lab, noOfStuds, subject, reason, system, name, regNo} = req.body;

    const newReq = new BookingReq({ 
        name,
        regNo,
        date, 
        slots, 
        lab, 
        noOfStuds, 
        subject, 
        reason, 
        system
    })

    newReq.save()
        .then(()=>{
            res.json({ status: "Request added successfully", success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/fetch').get(async(req,res)=>{

    BookingReq.find()
        .then((response)=>{
            res.json({ status: "fetched", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));


})

router.route('/fetchSystems').post(async(req,res)=>{
    const { date, slots, lab} = req.body;

    let tempSystems = []

    BookingReq.find({date, slots, lab})
        .then((response)=>{
            response.forEach(r=>{
                tempSystems = tempSystems.concat(r.system)
            })
            if(tempSystems.length > 0)
                res.json({ status: "fetched", data:tempSystems, success: true })
            else
            res.json({ status: "fetched", data:null, success: true })

        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').get(async (req,res)=>{
    const requests = await BookingReq.findById(req.params.id)
    const report = new Report({
        name:requests.name,
        regNo:requests.regNo,
        date:requests.date,
        slots:requests.slots,
        lab:requests.lab,
        noOfStuds:requests.noOfStuds,
        subject:requests.subject,
        reason:requests.reason,
        system:requests.system,
    })
    report.save()
        .then(()=>{
            BookingReq.findByIdAndDelete(req.params.id)
            .then((response)=>{
                res.json({ status: "deleted", data:response, success: true })
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;