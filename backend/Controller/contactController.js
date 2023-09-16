const { insertData,getContacts,getContactById,updates,del } = require("../Services/contactServices");

const insertContact = async(req,res)=>{
    try {
        const data = req.body;
        const newData = await insertData(data);
        res.send({
            "status":200,
            "data":newData
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

const getContact = async(req,res)=>{
try {
    const allData = await getContacts();
    res.send(allData)
} catch (error) {
    throw new Error(error.message);
}
}

const getContactId=async(req,res)=>{
    try {
        const {id}=req.params;
        const contact = await getContactById(id);
        res.send(contact);
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateContact = async(req,res)=>{
    try {
        const {id}=req.params;
        const updateData = await updates(id,req.body);
        res.send(updateData);
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteContact=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted = await del(id);
        res.send(deleted);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports={insertContact,getContact,getContactId,updateContact,deleteContact}