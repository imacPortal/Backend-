const router = require('express').Router();
let User = require('../Model/User.model');
var bcrypt = require('bcryptjs');

router.route('/signup').post(async (req, res) => {
    // const name = req.body.name;
    const { name, regNo, email, password, cpassword, phone, dob, gender } = req.body;
    const existingUser = await User.findOne({ email: email });


    if (existingUser) {
        res.json('user already exists');
        // console.log(existingUser);

    }
    else {
        if (password !== cpassword) {
            res.status(500).json('cpassword and password are not same');
        }
        else {
            const salt = await bcrypt.genSaltSync(10);
            const encryptedPassword = await bcrypt.hashSync(password, salt);
            const newUser = new User({
                name,
                regNo,
                email,
                phone,
                dob,
                gender,
                password: encryptedPassword,

            });
            newUser.save()
                .then(() => res.json({ status: "you are signed in", uid: newUser._id, success: true }))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    }
})

router.route('/signin').post(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!password || !aadharno) {
            return res.status(404).json({ message: 'enter all details' })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {

            const ispassCorrect = await bcrypt.compare(password, existingUser.password)
            if (!ispassCorrect) {
                return res.json({ status: "password is incorrect", uid: null, success: false });
            }
            else {
                res.json({ status: "you are signed in", uid: existingUser._id, success: true });
            }
        } else { res.json("invalid user") }
    }
    catch (error) {
        res.status(404).json({ message: `${error} Something went wrong` })
    }
})


router.route('/:id').get((req, res) => {
    const regno = req.params.id;
    User.findOne({ "_id": regno })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(`Error: ` + err));

});

module.exports = router;