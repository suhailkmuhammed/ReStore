import { ThemeProvider } from "@emotion/react";
import Header from "./Header";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/Util";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {

const dispatch = useAppDispatch();    
  const [loading,setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if(buyerId) {
            agent.Basket.get()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        }
        else{
            setLoading(false);
        }
    },[dispatch])

    const [darkMode,setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light'; 
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
              default:  paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChange(){
        setDarkMode(!darkMode);
    }
    if (loading) {
        return <LoadingComponent message="Initialising app..." />;
    }
    
    // Render the rest of your component here
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="top-right" hideProgressBar theme="colored"/>
            <CssBaseline />
            <Header darkmode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}
export default App