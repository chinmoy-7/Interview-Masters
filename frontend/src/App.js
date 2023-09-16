
import './App.css';
import {Box,Grid} from '@mui/material'
import Header from './component/Header';
import ContactTable from './component/ContactTable';
function App() {
  return (
    <>
      <Grid gap={10} direction={"column"}>
        <Header/>
        <ContactTable/>
      </Grid>
    </>
  );
}

export default App;
