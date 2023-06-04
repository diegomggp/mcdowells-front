import '../../assets/clients/cart.css'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import { useUserContext } from "../../context/User";
import NavBar from './NavBar';
import { Typography } from '@mui/material';
import NavBarBottom from './NavBarBotttom';
import papelCero from "../../assets/images/papel_cero.png"
import OrdersManager from "../../services/order.Api";


function Cart() {
   
    const navigate = useNavigate();
    const context = useCartContext();
    const contextUser = useUserContext()

    const sendOrder = async () => {
        const order = context.cart
        const email = { email: contextUser.user.email, id_user: contextUser.user.id_user }
        await OrdersManager.createOrder(email, order)
        context.setCart([])
        context.setTotalCart([{
            totalPrice: 0,
            totalQuantity: 0
        }])

        navigate('/see-you-soon')
    }

    

    return (
        <>
            <NavBar />
            <div className='container_cart'>
                <div className='containert_ticket'>
                    {context.cart.map((prod) =>
                        <div className='container_title_ticket'>
                            <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                                {prod.name}
                            </Typography>
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                {prod.price}€
                            </Typography>

                        </div>)}


                    <div className='containter_text_ticket'>
                        <div className='text_ticket_title'>
                            {context.extrasCart.map((prod) => prod.id <= 12 ?
                                <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                    {prod.title}
                                </Typography>
                                : "")}
                        </div>
                        <div className='text_ticket'>
                            {context.extrasCart.map((prod) => prod.id <= 12 ?
                                <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                    {prod.id <= 3 ? `x ${prod.quantity}` : ""}
                                </Typography>
                                : "")}
                        </div>
                        <div className='text_ticket'>
                            {context.extrasCart.map((prod) => prod.id <= 12 ?
                                <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                    {prod.price ? `${prod.price} €` : ""}
                                </Typography>
                                : "")}
                        </div>

                    </div>
                    <br />
                    <div className='container_title_ticket'>
                        <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                            Complementos
                        </Typography>
                    </div>

                    <div className='containter_text_ticket'>
                        <div className='text_ticket_title'>
                        {context.extrasCart.map((prod) => prod.id >= 13 && prod.id<=16?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                {prod.title}
                            </Typography>
                            :"")}
                        </div>
                        <div className='text_ticket'>
                        {context.extrasCart.map((prod) => prod.id >= 13 && prod.id<=16?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                x {prod.quantity}
                            </Typography>
                            :"")}
                        </div>
                        <div className='text_ticket'>
                        {context.extrasCart.map((prod) => prod.id >= 13 && prod.id<=16?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                {prod.price}€
                            </Typography>
                            :"")}
                        </div>

                    </div>
                    <br />

                    <div className='container_title_ticket'>
                        <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                            Postres
                        </Typography>
                    </div>

                    <div className='containter_text_ticket'>
                        <div className='text_ticket_title'>
                        {context.extrasCart.map((prod) => prod.id > 16 ?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                {prod.title}
                            </Typography>
                             :"")}
                        </div>
                        <div className='text_ticket'>
                        {context.extrasCart.map((prod) => prod.id > 16 ?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                x {prod.quantity}
                            </Typography>
                            :"")}
                        </div>
                        <div className='text_ticket'>
                        {context.extrasCart.map((prod) => prod.id > 16 ?
                            <Typography variant='body1' sx={{ fontSize: "14px" }}>
                                {prod.price}€
                            </Typography>
                            :"")}
                        </div>

                    </div>
                </div>
                <div className='container_btn_cart'>
                    <div className='btn_cart' style={{ backgroundColor: "#D5D5D5" }} onClick={() => sendOrder()}>
                        <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                            Pagar
                        </Typography>
                    </div>
                    <div className='btn_cart' onClick={() => navigate("/menus")}>
                        <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "13px" }}>
                            Seguir Comprando
                        </Typography>
                    </div>
                </div>
                <div className='container_btn_cart'>
                    <img src={papelCero} alt={papelCero} />
                </div>

            </div>
            <NavBarBottom />
            
        </>
    )
}

export default Cart;
