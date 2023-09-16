import { createContext,useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
const contactContext = createContext();
const ContactContextProvider = ({children})=>{

    const notify = (msg) => toast(msg,{
        toastId:1,
        position:toast.POSITION.TOP_CENTER
    });


    const [contact, setContact] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [rows,setRows]=useState([]);
    const getContact = async()=>{
        notify();
        const res =await  axios.get("http://localhost:4000/api/contacts");
        res.data.map((item,idx)=>{
          item["id"]=idx
        })
        setRows(res.data)
      }
      const handleDelete=async(row)=>{
        if(row.length==0) {
            notify("Nothing to Delete")
            return
        }
        let arr = rows.filter(item=>{
            return row.includes(item.id)
        }).map(data=>{
            return data._id
        })
        await axios.delete(`http://localhost:4000/api/contacts/${arr}`);
        getContact();
      }
return(
    <contactContext.Provider value={{
        contact,
        setContact,
        editDialogOpen,
        setEditDialogOpen,
        editedData,
        setEditedData,
        rows,
        setRows,
        getContact,
        handleDelete,
        notify

    }}>
        {children}
    </contactContext.Provider>
)
}

export {contactContext,ContactContextProvider};