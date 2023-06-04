import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCartContext } from '../../context/ShoppingCartContext';
import "../../assets/clients/navBarBottom.css"

const NavBarBottom = () => {
    const context = useCartContext();
    return <>
        <div className='container_total'>
            <div className='container_total_1'>
                <p className='text_total'> {context.totalCart[0].totalPrice.toFixed(2)}€</p>
                <ShoppingCartOutlinedIcon />
            </div>
        </div>

    </>
}

export default NavBarBottom