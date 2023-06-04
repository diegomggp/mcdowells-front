import '../../assets/clients/cart.css'
import '../../assets/clients/lastPage.css'
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useUserContext } from "../../context/User";
import logo from '../../assets/images/logo_burger.png'
function LastPage() {
    const contextUser = useUserContext();
    const navigate = useNavigate();

    function redireccionar() {

        setTimeout(() =>{
            
            navigate('/menus')}
            , 7000)
    }

    function sendHome (){
       
        navigate('/menus')
    }

    return (
        <>
            <div className='container_final_msg' onLoad={() => redireccionar()}>
               {/* <img className='logo_menu_last' src={logo} alt=" NOT FOUND" onClick={() => navigate('/employees-login')} />*/}
                <div className='containert_ticket_last'>
                    <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                        Hemos enviado el ticket de tu compra a la direccion {contextUser.user.email}.¡Gracias por tu compra!
                    </Typography>
                </div>
                <button className='btn_cart' onClick={() => sendHome()}>Finalizar</button>
            </div>
        </>
    )
}

export default LastPage;
