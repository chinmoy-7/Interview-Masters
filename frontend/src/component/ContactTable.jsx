import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { contactContext } from '../context/ContactContextProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactTable() {
  const context = useContext(contactContext);
  const {getContact,contact,setContact,editDialogOpen,setEditDialogOpen,editedData,setEditedData,rows,setRows,handleDelete,notify}=context


  useEffect(()=>{
    getContact();
  },[])



  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: '_id', headerName: 'MongoId', width: 240 },
    { field: 'email', headerName: 'Email', width: 270 },
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'spoc', headerName: 'Spoc', width: 170 },
    { field: 'phone', headerName: 'Phone No', width: 170 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={()=>handleDelete([params.row.id])}/>
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleEditClick = (row) => {
    setEditedData(row);
    
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditedData({});
  };

  const handleEditSave = async() => {
    if(editedData.name==""||editedData.email==""||editedData.phone==""||editedData.spoc==""){
      notify("Please fill all the fields");
      return
    }
    const res=await axios.put(`http://localhost:4000/api/contacts/${editedData._id}`,editedData);
    getContact();
    handleEditDialogClose();
  };

  return (
    <Box height={"90vh"} width={"100vw"} >
      <ToastContainer
        autoClose={2000}
      />
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onSelectionModelChange={(selection) => setContact(selection)}
        checkboxSelection
        selectionModel={contact}
        rowId="none"
      />
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent >
          <TextField
          sx={{"marginTop":"10px"}}
            label="Name"
            fullWidth
            value={editedData.name || ''}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
          <TextField
          sx={{"marginTop":"10px"}}
            label="Email"
            fullWidth
            value={editedData.email || ''}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          />
          <TextField
          sx={{"marginTop":"10px"}}
            label="Spoc"
            fullWidth
            value={editedData.spoc || ''}
            onChange={(e) => setEditedData({ ...editedData, spoc: e.target.value })}
          />
          <TextField
          sx={{"marginTop":"10px"}}
            label="Phone No"
            fullWidth
            value={editedData.phone || ''}
            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ContactTable
