// confirm a booking request, reject a booking request
// for now once confirmed cannot be overwritten


const router = require('express').Router();
const BookingConf = require('../Model/BookingConfirm.model');
const BookingReq = require('../Model/BookingRequest.model')

router.route('/add/:id').post(async(req,res)=>{
    const { date, slots, lab, system} = req.body;

    let findSlot = await BookingConf.findOne({date,slots,lab});

    if(findSlot){
        system.forEach(s=>{
            findSlot._doc.system.push(s)
        })
        findSlot.save()
            .then(()=>{
                BookingReq.findByIdAndDelete(req.params.id)
                .then((response)=>{
                    res.json({ status: "Request granted", success: true })
                })
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }else{
        const newReq = new BookingConf({ 
            date, 
            slots, 
            lab, 
            system
        })
    
        newReq.save()
            .then(()=>{
                BookingReq.findByIdAndDelete(req.params.id)
                .then((response)=>{
                    res.json({ status: "Request granted", success: true })
                })
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }

})

router.route('/fetch').post(async(req,res)=>{
    const { date, slots, lab} = req.body;

    BookingConf.findOne({date,slots,lab})
        .then((response)=>{
            res.json({ status: "fetched", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router;