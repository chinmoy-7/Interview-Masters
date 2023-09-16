const contact = require("../Models/contacts");

const insertData = async(data)=>{
    data.created=new Date();
    const res=await contact.create(data);
    return res;
}

const getContacts = async()=>{
    try {
        const res = await contact.find({});
        return res;
    } catch (error) {
        throw new Error(error.message)
    }

}

const getContactById=async(id)=>{
    try {
        const res = await contact.findOne({_id:id})
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}
const updates=async(id,data)=>{
    console.log(id,data);
    const res = await contact.updateOne({_id:id},{$set:data})
    return res;
}

const del=async(id)=>{
    try {
        const res = await contact.deleteOne({_id:id});
        return res;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {insertData,getContacts,getContactById,updates,del};