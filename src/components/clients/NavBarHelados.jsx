import '../../assets/clients/navBarMenu.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import logoTop from '../../assets/images/top_single_menu.png'
import helados from '../../assets/images/helados_top.png'

const NavBarHelados = () => {


    return <>
        <div className='image_nav'>
            <img src={helados} alt={helados} className="image_logo_nav_h" />
        </div>
        <div className='containter_single_1'>
            <div className='container_navBar'>
                <div className='container_navBar_text'>
                    <IconButton aria-label="delete">
                        <MenuIcon color='inhert' fontSize="large" />
                    </IconButton>
                </div>
                <div className='container_navBar_text'>
                    <Typography variant='body1'>
                        Hola
                    </Typography>
                </div>
            </div>

            <div className='text_top'>
                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Postres
                </Typography>
            </div>
            <div className='container_logo_single'>
                <img src={logoTop} alt={logoTop} className="logo_single" />
            </div>
        </div>
    </>
}

export default NavBarHelados