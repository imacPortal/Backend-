const router = require('express').Router();
let auth = require('../Model/auth.model');
let user = require('../Model/User.model');
let signupReq = require('../Model/signupRequest.model')
let nodemailer = require('nodemailer')
var bcrypt = require('bcryptjs');
var randomString = require('randomstring')
require('dotenv').config();

//employeeDB
var STAFF = require('../staffDB/employeeId')

router.route('/priorityLogin/:id').get(async (req,res)=>{
    const data = STAFF.find((v)=>(v['Faculty ID'] === req.params.id))

    if(data){
        const email = data['Email ID'];

        const existingUser = await auth.findOne({ email: email });

        const password = randomString.generate(10)

        const salt = await bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hashSync(password, salt);

        if(existingUser){
            res.json({ status: 'user already exists', success: false })
        }else{
            const newAuth = new auth({
                email,
                password:encryptedPassword,
                userId:"onboarding"
            });
            newAuth.save()
                .then(()=>{
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                        }
                    });
                    
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Imac Lab Access',
                        text: `Hello ${data['Faculty Name']}!\nYou have been added as an user in the imac lab SRM\nYour Email: ${email}\nYour Password: ${password}\n\nNote:Change the password from the settings for better security`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json({ status: "user added", success: true })
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }

    }else{
        res.json({ status: "Faculty Informations Not Found", success: false })
    }
})

router.route('/deleteSignupReq/:id/:t').get(async (req,res)=>{
   const id = req.params.id

   signupReq.findByIdAndDelete(id)
        .then((response)=>{
            if(req.params.t === "sendInfo"){
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                        });
                        
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: response.email,
                        subject: 'Imac Lab Access Denied',
                        text: `WE are regret to inform you that your permission to access the imac lab portal was denied.`
                        };
                        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
            }
            res.json({ status: "deleted", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/fetchSignupReq').get(async (req,res)=>{
    signupReq.find()
        .then((response)=>{
            res.json({ status: "fetched", data:response, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/signupReq').post(async (req,res)=>{
    const {email, department, type, reason} = req.body

    const existingReq = await signupReq.findOne({email})

    if(existingReq){
        res.json({ status: "request already sent!", success: false })
    }else{
        if(email.split('@')[1] !== 'srmist.edu.in'){
            res.json({ status: "access is only possibel for people in SRMIST!", success: false })
        }else{
            const newReq = new signupReq({
                email,
                department,
                type,
                reason
            });
            newReq.save()
            .then(()=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORD
                    }
                  });
                  
                  var mailOptions = {
                    from: process.env.EMAIL,
                    to: process.env.EMAIL,
                    subject: 'Imac Lab Access',
                    text: `A person just requested acces into the imac lab portal\nEmail: ${email}\nReason: ${reason}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.json({ status: "Request successfully passed awaiting confirmation", success: true })
            })
            .catch(err => res.status(400).json('Error: ' + err));
        }
    }
})


router.route('/setup').post(async (req,res)=>{
    const {name,registrationnumber,department, phoneNumber, email} = req.body

    const newUser = new user({
                name,
                regno:registrationnumber,
                dept:department,
                phno:phoneNumber,
                email,
                designation:"staff/user",
            });
    newUser.save()
        .then((findUser)=>{
            const userData = {
                id:findUser._id,
                name:findUser.name,
                regno:findUser.regno,
                dept:findUser.dept,
                designation:findUser.designation,
                email:findUser.email,
                phno:findUser.phno
            }
            res.json({ status: "user added",data:userData, success: true })
        })
        .catch(err => res.status(400).json('Error: ' + err));

})


router.route('/add').post(async (req,res)=>{
    const {email} = req.body

    const existingUser = await auth.findOne({ email: email });

    const password = randomString.generate(10)

    const salt = await bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hashSync(password, salt);

    if(existingUser){
        res.json({ status: 'user already exists', success: false })
    }else{
        const newAuth = new auth({
            email,
            password:encryptedPassword,
            userId:"onboarding"
        });
        newAuth.save()
            .then(()=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORD
                    }
                  });
                  
                  var mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Imac Lab Access',
                    text: `You have been added as an user in the imac lab SRM\nYour Email: ${email}\nYour Password: ${password}\n\nNote:Change the password from the settings for better security`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.json({ status: "user added", success: true })
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }


})


router.route('/signup').post(async (req,res)=>{
    const { name, regno, dept, designation, email, phno, password } = req.body;

    const existingUser = await user.findOne({ email: email });

    if (existingUser) {
        res.json('user already exists');
        // console.log(existingUser);
    }
    else {
            const salt = await bcrypt.genSaltSync(10);
            const encryptedPassword = await bcrypt.hashSync(password, salt);
            const newUser = new user({
                name,
                regno,
                dept,
                phno,
                email,
                designation,
            });
            newUser.save()
                .then(() => {
                    const newAuth = new auth({
                        email,
                        password:encryptedPassword,
                        userId:newUser._id
                    });
                    newAuth.save()
                        .then(()=>{
                            res.json({ status: "user added", success: true })
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
    
    }
})

router.route('/getUser/:id').get(async (req,res)=>{
    const id = req.params.id;

    if(id != 'null'){
        const findUser = await user.findById(id);
        if(findUser){
            const userData = {
                id:findUser._id,
                name:findUser.name,
                regno:findUser.regno,
                dept:findUser.dept,
                designation:findUser.designation,
                email:findUser.email,
                phno:findUser.phno
            }
            res.json({ status: "user found", data:userData, success: true });
        }else{
            res.json({ status: "user not found", data:null, success: true });
        }
    }else{
        const userData = {
            id:null,
            name:null,
            regno:null,
            dept:null,
            designation:null,
            email:null,
            phno:null
        }
        res.json({ status: "onboarding", data:userData, success: true });
    }

})

router.route('/login').post(async (req,res)=>{
    const { email, password } = req.body;

    const isUser = await auth.findOne({ email: email });

    if (isUser) {
        const ispassCorrect = await bcrypt.compare(password, isUser.password)
        if (!ispassCorrect) {
            res.json({ status: "password is incorrect", uid: null, success: false });
        }
        else {
            const findUser = await user.findOne({ email: email });
            if(findUser){
                const userData = {
                    id:findUser._id,
                    name:findUser.name,
                    regno:findUser.regno,
                    dept:findUser.dept,
                    designation:findUser.designation,
                    email:findUser.email,
                    phno:findUser.phno
                }
                res.json({ status: "user found", data:userData, success: true });
            }else{
                const userData = {
                    id:null,
                    name:null,
                    regno:null,
                    dept:null,
                    designation:null,
                    email:email,
                    phno:null
                }
                res.json({ status: "onboarding", data:userData, success: true });
            }
        }
        // console.log(existingUser);
    }else{
        res.json({ status: "User not found", success: true });
    }
})

router.route('/resetPassword').post(async (req,res)=>{
    const {email} = req.body;

    const pass = randomString.generate(10)
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(pass, salt);

    const findAuth = await auth.findOne({email})

    if(findAuth){
        console.log(findAuth._doc)
        auth.findOneAndUpdate({email},{password:encryptedPassword})
            .then(()=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORD
                    }
                  });
                  
                  var mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Imac Lab Password Reset',
                    text: `Your password has been updated\nYour Email: ${email}\nYour Password: ${pass}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.json({ status: "new password set. Check mail", success: true });
            }).catch(err=>{
                res.json({ status: "Something went wrong", success: true });
            })
    }else{
        res.json({ status: "User not found", success: true });
    }
})

router.route('/changePassword/:id').post(async (req,res)=>{
    const { newPassword } = req.body;
    const email = req.params.id;

    
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(newPassword, salt);
    // console.log(encryptedPassword)

    const findAuth = await auth.findOne({email})

    if(findAuth){
        auth.findOneAndUpdate({email},{password:encryptedPassword})
            .then(()=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORD
                    }
                  });
                  
                  var mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Imac Lab Password Changed',
                    text: `Your password has been updated\nYour Email: ${email}\nYour Password: ${newPassword}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.json({ status: "new password set. Check mail", success: true });
            }).catch(err=>{
                res.json({ status: err, success: true });
            })
    }else{
        res.json({ status: "User not found", success: true });
    }

})

module.exports = router;