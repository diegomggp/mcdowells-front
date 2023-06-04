import '../../assets/clients/navBarMenu.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import logoTop from '../../assets/images/top_single_menu.png'
import burger from '../../assets/images/top_menu_burger.png'
import patatas from '../../assets/images/patatas_cortadas.png'

const NavBarMenus = () => {


    return <>
        <div className='image_nav'>
            <img src={burger} alt={burger} className="image_logo_nav_b" />
        </div>
        <div className='image_nav'>
            <img src={patatas} alt={patatas} className="image_logo_nav_p" />
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
                    Menú Burguer
                </Typography>
            </div>
            <div className='container_logo_single'>
                <img src={logoTop} alt={logoTop} className="logo_single" />
            </div>
        </div>
    </>
}

export default NavBarMenus