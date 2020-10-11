// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Appointmnets = require("../models/appointments");
const Contacts = require("../models/contacts");
const Products = require("../models/products")

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

//find all contacts
  app.get("/api/contacts", (req,res) =>{
    if (!req.user){
      db.Contacts.findAll({
      }).then((dbContacts) => {
        res.json({dbContacts});
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new post
  app.post("/api/contacts", (req,res) =>{
    if (!req.user){
      db.Contacts.create(req.body).then((dbContacts) => {
        res.json({dbContacts});
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

   // DELETE route for deleting posts
   app.delete("/api/contacts/:id", (req, res)=> {
    if (!req.user){
    db.Contacts.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbContacts) => {
      res.json(dbContacts);
    });
    } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
  });

  // PUT route for updating posts
  app.put("/api/contacts", (req, res)=> {
    if (!req.user){
    db.Contacts.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then((dbContacts)=> {
      res.json(dbContacts);
    });
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
  });

  //find all products
  app.get("/api/products", (req,res) =>{
    if (!req.user){
      db.Products.findAll({
      }).then((dbProducts) => {
        res.json({dbProducts});
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new products
  app.post("/api/products", (req,res) =>{
    if (!req.user){
      db.Products.create(req.body).then((dbProducts) => {
        res.json({dbProducts});
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

   // DELETE route for deleting products
   app.delete("/api/products/:id", (req, res)=> {
    if (!req.user){
    db.Products.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbProducts) => {
      res.json(dbProducts);
    });
    } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
  });

  // PUT route for updating products
  app.put("/api/products", (req, res)=> {
    if (!req.user){
    db.Products.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then((dbProducts)=> {
      res.json(dbProducts);
    });
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
  });
};
