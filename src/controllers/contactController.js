import Contact from "../models/contactModel";
const createContact = async(req, res) =>{
    try{
        const message = new Contact({
            Email:req.body.Email,
            Subject:req.body.Subject,
            Message:req.body.Message
        })

        const SavedMessage = await message.save();
       
        res.send(SavedMessage);

    }catch(error){
        // you can add a console of the error (to debug later)
        res.status(500).json({"message":error});
    }
}

const getContacts = async (req, res) =>{
    try{
       var max  = req.query.max;
       var fetchContact = await Contact.find({}).limit(max);

        res.send(fetchContact);
    }catch(error){
        res.send({"message":"error happened! sorry"});
    }
}
const getsingleContact = async (req, res) =>{
    try{
   
        var id = req.params.id;

       var fetchsingleContact = await Contact.find({_id:id});

        res.send(fetchsingleContact);
    }catch(error){
        res.send({"message":"error happened! sorry"});
    }
}


export {createContact, getContacts,getsingleContact};