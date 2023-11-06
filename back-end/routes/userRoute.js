// When we create a routes for any APIs we have to import our route in our main index.js file.
import express from "express";
import { create, deleteUser, getAll, getOne, update } from "../controller/userController.js";   // import our APIs from the controller.

const route = express.Router();   //initialize our route

// route for the create Users.
route.post("/create",create)  // two parameters first: Path , second : name of the APIs in controller.

// route for the getAll APIs.
route.get("/getall", getAll)    // using get method because we want to fetch our all data.

// route for the getOne data.
route.get("/getone/:id", getOne)   // give url:id beacuse we want to fine our specific user.

// route for the update APIs.
route.put("/update/:id", update)

// route for the delete User APIs.
route.delete("/delete/:id", deleteUser)

export  default route;   //export our route.