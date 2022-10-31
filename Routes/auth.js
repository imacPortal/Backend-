const router = require('express').Router();
let auth = require('../Model/auth.model');
let user = require('../Model/User.model');
let nodemailer = require('nodemailer')
var bcrypt = require('bcryptjs');
require('dotenv').config();

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
    const {email, password} = req.body

    const existingUser = await auth.findOne({ email: email });

    const salt = await bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hashSync(password, salt);

    if(existingUser){
        res.json('user already exists');
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
                    text: `You have been added as an user in the imac lab SRM\nYour Email: ${email}\nYour Password: ${password}`
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


module.exports = router;