import React,{useContext, useState} from 'react'

import { Box,Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import axios from 'axios';
import { generatePDF } from './PDFgen';
import { contactContext } from '../context/ContactContextProvider';
function Header() {
  const context = useContext(contactContext)
  const {getContact,rows,setRows,handleDelete,contact,notify}=context;
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);
  const [insertData, setInsertData] = useState({name:"",email:"",phone:"",spoc:""});
  const handleInsertDialogClose = () => {
    setInsertDialogOpen(false);
  };
  const handleInsert=async()=>{
    console.log(insertData)
    if(insertData.name==""||insertData.email==""||insertData.phone==""||insertData.spoc==""){
      notify("Please fill all the fields");
      return
    }
    await axios.post("http://localhost:4000/api/contacts",insertData);
    getContact();
    setInsertData({name:"",email:"",phone:"",spoc:""})
    handleInsertDialogClose()
    
  }
  const handleSearch=async(value)=>{
    if(value==""){
      getContact();
      return;
    }
    const res = await axios.get(`http://localhost:4000/api/search-contacts/${value}`)
    res.data.map((item,idx)=>{
      console.log(idx)
      item["id"]=idx
    })
    setRows(res.data)
  }
  return (
    <Box height={"10vh"} bgcolor={"#555079"} display={"flex"}>
        <Box width={"50%"}  display={"flex"} paddingLeft={"10px"} alignItems={"center"} color={"white"}>
            <h1 >Contacts</h1>
        </Box>
        <Grid gap={2} width={"50%"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"} >
            <TextField size='small' style={{"backgroundColor":"white"}} label="Seach" onChange={e=>handleSearch(e.target.value)}/>
            <Button variant='contained' onClick={()=>generatePDF(rows)}>Export PDF</Button>
            <Button variant='contained' onClick={()=> setInsertDialogOpen(true)} color='success'>Insert</Button>
            <Button variant='contained' onClick={()=> handleDelete(contact)} color='warning'>Delete</Button>
        </Grid>
        <Dialog open={insertDialogOpen} onClose={handleInsertDialogClose}>
          <DialogTitle>Insert Data</DialogTitle>
          
          <DialogContent   >
            <Box marginBottom={"10px"} width={"20vw"}>
            <TextField
              label="name"
              fullWidth
              value={insertData.name||""}
              onChange={(e)=>setInsertData({...insertData,name:e.target.value})}
            />
            </Box>
            <Box marginBottom={"10px"} width={"20vw"}>
            <TextField
              label="email"
              fullWidth
              value={insertData.email||""}
              onChange={(e)=>setInsertData({...insertData,email:e.target.value})}
            />
            </Box>
            <Box marginBottom={"10px"} width={"20vw"}>
            <TextField
              label="spoc"
              fullWidth
              value={insertData.spoc||""}
              onChange={(e)=>setInsertData({...insertData,spoc:e.target.value})}
            />
            </Box>
            <Box marginBottom={"10px"} width={"20vw"}>
            <TextField

              label="Phone No"
              fullWidth
              type='number'
              value={insertData.phone||""}
              onChange={(e)=>setInsertData({...insertData,phone:e.target.value})}
            />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInsertDialogClose}>Cancel</Button>
            <Button onClick={handleInsert}>Insert</Button>
          </DialogActions>
        </Dialog>
    </Box>
  )
}

export default Header