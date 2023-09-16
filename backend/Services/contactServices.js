const contact = require("../Models/contacts");

const insertData = async(data)=>{
    try{
        data.created=new Date();
    const res=await contact.create(data);
    return res;
    }catch(e){
        throw new Error(e.message)
    }
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
        const res = await contact.deleteMany({_id:{$in:id}});
        return res;
    } catch (error) {
        throw new Error(error.message)
    }
}

const search=async(name)=>{
    try {
        const reg = new RegExp(`^${name}`,'i')
        const res=await contact.find({name:reg}).limit(10);
        return res;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {insertData,getContacts,getContactById,updates,del,search};