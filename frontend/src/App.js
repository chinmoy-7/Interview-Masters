
import './App.css';
import {Box,Grid} from '@mui/material'
import Header from './component/Header';
import ContactTable from './component/ContactTable';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Grid gap={10} direction={"column"}>
      <ToastContainer
        autoClose={2000}
      />
        <Header/>
        <ContactTable/>
      </Grid>
    </>
  );
}

export default App;
