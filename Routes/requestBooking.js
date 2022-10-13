// add a booking request, delete a booking request, update booking request

const router = require('express').Router();
const BookingReq = require('../Model/BookingRequest.model');

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

router.route('/delete/:id').get((req,res)=>{
    BookingReq.findByIdAndDelete(req.params.id)
        .then((response)=>{
            res.json({ status: "deleted", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;