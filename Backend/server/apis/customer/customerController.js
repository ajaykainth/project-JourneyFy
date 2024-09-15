const User = require("../user/userModel");
const customer = require("./customerModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  let validation = "";

  if (!req.body.name) {
    validation += "Name is required ";
  }
  if (!req.body.email) {
    validation += "Email is required ";
  }
  if (!req.body.password) {
    validation += "Password is required ";
  }
  if (!req.body.contact) {
    validation += "Contact is required ";
  }
  if (!req.body.gender) {
    validation += "Gender is required ";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 400,
      message: validation,
    });
  } else {
    let prevUser = await User.findOne({ email: req.body.email });
    if (prevUser == null) {
      let totalUsers = await User.countDocuments();
      let newUser = new User();
      newUser.autoId = totalUsers + 1;
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = bcrypt.hashSync(req.body.password, 10);

      newUser
        .save()
        .then(async (savedUser) => {
          let totalCustomers = await customer.countDocuments();
          let newCustomer = new customer();
          newCustomer.autoId = totalCustomers + 1;
          newCustomer.name = req.body.name;
          newCustomer.email = req.body.email;
          newCustomer.contact = req.body.contact;
          newCustomer.address = req.body.address;
          newCustomer.gender = req.body.gender;
          newCustomer.userId = savedUser._id;

          newCustomer
            .save()
            .then((savedCustomer) => {
              res.send({
                success: true,
                status: 200,
                message: "New Account Created",
                data: savedCustomer,
              });
            })
            .catch((err) => {
              res.send({
                success: false,
                status: 500,
                message: err.message,
              });
            });
        })
        .catch((err) => {
          res.send({
            success: false,
            status: 500,
            message: err.message,
          });
        });
    } else {
      res.send({
        success: false,
        status: 400,
        message: "Email already exist",
      });
    }
  }
};
const all = (req, res) => {
  req.body.status = true;
  customer
    .find(req.body)
    .populate("userId")
    .exec()
    .then((result) => {
      res.send({
        success: true,
        status: 200,
        message: "Customer Loaded",
        total: result.length,
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        status: 400,
        message: err.message,
      });
    });
};
const single = (req, res) => {
  // console.log(req.body);
  // let validation = ""
  // if (!req.body._id) {
  //     validation = "_id is required"
  // }
  // if (!!validation) {
  //     res.send({
  //         success: false,
  //         status: 400,
  //         message: "Validation Error " + validation
  //     })
  // }

  // else {
  const query = req.body._id
    ? { _id: req.body._id }
    : req.body.userId
    ? { userId: req.body.userId }
    : {};
  customer
    .findOne(query)
    .populate("userId")
    .exec()

    .then((result) => {
      if (result == null) {
        res.send({
          success: false,
          status: 400,
          message: "customer not found",
        });
      } else {
        res.send({
          success: true,
          status: 200,
          message: "Single customer",
          data: result,
        });
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        status: 500,
        message: err.message,
      });
    });
};
// }

////////////////changegegege
const updateProfile = async (req, res) => {
  let validation = "";
  if (!req.body._id) {
    validation += "_id is required";
  }
  if (!!validation) {
    res.send({
      success: false,
      status: 500,
      message: "Validation Error :" + validation,
    });
  } else {
    let prevCustomer = await customer.findOne({
      email: req.body.email,
    });
    if (prevCustomer == null) {
      User.findOne({ _id: req.body._id })
        .exec()
        .then((userData) => {
          if (userData == null) {
            res.send({
              success: false,
              status: 500,
              message: "user account does not exist",
            });
          } else {
            if (!!req.body.name) userData.name = req.body.name;
            if (!!req.body.email) userData.email = req.body.email;

            userData
              .save()
              .then((updatedUser) => {
                customer
                  .findOne({ userId: req.body._id })
                  .exec()
                  .then((customerData) => {
                    if (customerData == null) {
                      res.send({
                        success: false,
                        status: 404,
                        message: "customer does not exist",
                      });
                    } else {
                      if (!!req.body.name) customerData.name = req.body.name;
                      if (!!req.body.email) customerData.email = req.body.email;
                      if (!!req.body.contact)
                        customerData.contact = req.body.contact;
                      if (!!req.body.address)
                        customerData.address = req.body.address;
                      if (!!req.body.gender)
                        customerData.gender = req.body.gender;

                      customerData
                        .save()
                        .then((updatedCustomer) => {
                          res.send({
                            success: true,
                            status: 200,
                            message: "Customer Updated",
                            data: updatedCustomer,
                          });
                        })
                        .catch((err) => {
                          res.send({
                            success: false,
                            status: 500,
                            message: err.message,
                          });
                        });
                    }
                  })
                  .catch((err) => {
                    res.send({
                      success: false,
                      status: 500,
                      message: err.message,
                    });
                  });
              })
              .catch((err) => {
                res.send({
                  success: false,
                  status: 500,
                  message: err.message,
                });
              });
          }
        })
        .catch((err) => {
          res.send({
            success: false,
            status: 500,
            message: err.message,
          });
        });
    } else {
      res.send({
        success: false,
        status: 400,
        message: "email already exist",
      });
    }
  }
};

module.exports = { register, all, single, updateProfile };
