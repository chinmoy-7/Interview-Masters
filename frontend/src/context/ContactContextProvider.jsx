import { createContext,useState } from "react";
import axios from "axios";
const contactContext = createContext();

const ContactContextProvider = ({children})=>{
    
    const [contact, setContact] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [rows,setRows]=useState([]);
    const getContact = async()=>{
        const res =await  axios.get("http://localhost:4000/api/contacts");
        // console.log(res.data);
        res.data.map((item,idx)=>{
          item["id"]=idx
        })
        setRows(res.data)
      }
      const handleDelete=async(row)=>{
        console.log(row)
        let arr = rows.filter(item=>{
            console.log(item)
            return row.includes(item.id)
        }).map(data=>{
            return data._id
        })
        // console.log(arr);
        await axios.delete(`http://localhost:4000/api/contacts/${arr}`);
        getContact();
      }
    //   const handleDeleteOne=async
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
        handleDelete

    }}>
        {children}
    </contactContext.Provider>
)
}

export {contactContext,ContactContextProvider};