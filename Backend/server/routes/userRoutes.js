const router = require('express').Router();
const userController=require("../apis/user/userController")


////login////
router.post('/login', userController.login)
router.post('/changePassword', userController.changePassword)

router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router