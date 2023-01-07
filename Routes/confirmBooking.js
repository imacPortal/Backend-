// confirm a booking request, reject a booking request
// for now once confirmed cannot be overwritten


const router = require('express').Router();
const BookingConf = require('../Model/BookingConfirm.model');
const BookingReq = require('../Model/BookingRequest.model')
const Report = require('../Model/report.model')

router.route('/test/:id').post(async (req,res)=>{
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
    await report.save()
    res.json({data:requests})
})

router.route('/add/:id').post(async(req,res)=>{
    const { date, slots, lab, system} = req.body;

    let findSlot = await BookingConf.findOne({date,slots,lab});

    if(findSlot){
        system.forEach(s=>{
            findSlot._doc.system.push(s)
        })
        findSlot.save()
            .then(async ()=>{
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
                            res.json({ status: "Request granted", success: true })
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
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
            .then(async ()=>{
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
                            res.json({ status: "Request granted", success: true })
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }

})

router.route('/cancel/:id').post(async(req,res)=>{
    Report.findById(req.params.id)
        .then(async response=>{
            // res.json({ status: "fetched", data:response, success: true })
            const slots =  response.slots
            const date =  response.date
            const lab =  response.lab
            let findSlot = await BookingConf.findOne({date,slots,lab})
            response.system.forEach(sys=>{
                findSlot.system.remove(sys)
            })
            findSlot.save()
                .then(reply=>{
                    res.json({ status:"successfully cancelled", success: true })
                }).catch(err=>{
                    res.json({ status: "Error occured!", success: true })
                })
        })
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