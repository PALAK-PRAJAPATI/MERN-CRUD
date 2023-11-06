import User from "../model/userModel.js"   //import userModel from the model folder.

// create APIs.
export const create = async(req,res)=>{
    try{

        // create a variable and write new keyword and model name after that in the bracket we have to write req.body;
        // req.body could be store our data and passed in our model.
        // That data will come from the UI(Front-End).
        const userData = new User(req.body);

        // now we have to check this our data are store in the create variable or not.
        if(!userData){
            // if we doesn't gave any data then it will give an error.
            return res.status(404).json({message:"User Data Not Found"});
        }

        // if we gave a data successfully then we have to store our data using await method.
        const saveData = await userData.save();
        res.status(200).json(saveData);   // send our data to response.

    }catch(error){
        res.status(500).json({error:error})
    }
}

// we can create a create APIs now we need to check it's work or not so we need to create a route for it so we have to create useRoute in pur routes folder.



// APIs for featch all data.
export const getAll = async(req,res)=>{
    try{
        // fetch All Data.
        const userData = await User.find();

        // if we can't get a User Data.
        if(!userData){
            return res.status(404).json({message:"User Data Not Found"});
        }

        // if we get the user data successfully.
        res.status(200).json(userData);
    }
    catch(error){
        res.status(500).json({error:error})
    }
}



// if we want to get one data from the id.
// APIs for getOne data from the id.
export const getOne = async(req,res)=>{
    try {

        // using is from the params.
        const id = req.params.id;
        const userData = await User.findById(id)

        // if we can't find the user Data.
        if(!userData){
            return res.status(404).json({message:"User Data Not Found"});
        }

        // if we find the data from the id.
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error:error})
    }
}



// if we want to Update our data.
// Update APIs.
export const update = async(req,res)=>{
    try {
        
        // get the user id from the url params.
        const id = req.params.id;
        const useExist = await User.findById(id)

        // if we can't get the user.
        if(!useExist){
            return res.status(401).json({message:"Uset Not Found"})
        }

        // if we find the user and update.
        // findByIdAndUpdate method take three parameters. first: id, second:res.body (getOur Data) , thrid: "accept our update data."
        const updateUser = await User.findByIdAndUpdate(id, req.body , {new:true})
        res.status(200).json(updateUser);

    } catch (error) {
        res.status(500).json({error:error})
    }
}



// if we want to delete our User Data.
// Delete User APIs.
export const deleteUser = async(req,res) =>{
    try {
        
        // get the user id from the url params.
        const id = req.params.id;
        const userExist = await User.findById(id);

         // if we can't get the user.
        if(!userExist){
            return res.status(404).json({message:"User Not Exist"});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message:"User Deleted Successfully..."})

    } catch (error) {
        res.status(500).json({error:error})   
    }
}