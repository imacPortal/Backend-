const router = require('express').Router();
let auth = require('../Model/auth.model');
let user = require('../Model/User.model');
var bcrypt = require('bcryptjs');


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
        }
        // console.log(existingUser);
    }
})


module.exports = router;