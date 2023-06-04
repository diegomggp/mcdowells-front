import '../../assets/clients/clientshome.css'
import logo from '../../assets/images/logo_burger.png'
import { useNavigate } from 'react-router-dom';

function ClientsHome() {
    const navigate = useNavigate();

    return (
        <>
            <container className="container_menu" >
                <div className='container_menu_1'>
                    <img className='logo_menu' src={logo} alt=" NOT FOUND" onClick={() => navigate('/login')}/>
                </div>
            </container>
        </>
    )
}

export default ClientsHome;
