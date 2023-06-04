import '../../assets/clients/modalClients.css'
import '../../assets/clients/modalBruger.css'
import '../../assets/clients/cart.css'
import logoTop from '../../assets/images/top_single_menu.png'
import logoNavBar from '../../assets/images/logo_navbar.png'
import extrasFinal from '../../libs/extrasFinal'
import { Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useCartContext } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

const ModalFinal = (props) => {

    const [styleMod, setStyleMod] = useState("modal-close")

    useEffect(() => {
        setTimeout(() => {
            setStyleMod("containerModal_final")
        }, 100)


    }, [])

    const context = useCartContext();
    const navigate = useNavigate()

    const addToTotal = (id, product) => {
        const isInCart = context.extrasCart.find(item => item.id === id)
        if (isInCart) {
            const setOneProd = context.extrasCart.map(item =>
                item.id === isInCart.id ? {
                    ...item, quantity: item.quantity + 1, total: item.price * (item.quantity + 1)
                } : item
            );
            context.setExtrasCart(setOneProd);
        } else {
            context.extrasCart.push({
                ...product,
                total: product.price,
                quantity: 1
            })
        }

        const setTotalPrice = context.totalCart.map((item) => {
            return (
                {
                    totalPrice: item.totalPrice + product.price,
                    totalQuantity: item.totalQuantity
                })
        })
        context.setTotalCart(setTotalPrice)
    }

    return <>
        <div className="containerModal_clients">
            <div className={styleMod} onClick={props.back}>

                <div className='image_nav_modal'>
                    <img src={logoNavBar} alt={logoNavBar} className="image_logo_modal" />
                </div>

                <div className='container_logo_single'>
                    <img src={logoTop} alt={logoTop} className="logo_single" />
                </div>
                <div className='texto_top_final'>
                    <HighlightOffIcon onClick={() => navigate("/cart")} />
                    <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "17px" }}>
                        Completa tu pedido
                    </Typography>
                </div>
                <div className='box_final_1'>

                    {extrasFinal.map((prod) =>
                        <>
                            <div className='modal_final_1'>
                                <div className='modal_cont_2'>
                                    <Typography variant='body1' sx={{ fontSize: "15px" }}>
                                        {prod.title}<br />
                                        {prod.price} €
                                    </Typography>
                                </div>
                                <div className='modal_cont_2'>
                                    <img src={prod.image} alt="auto" className='imag_mod_f' />
                                </div>
                                <div className='modal_cont_2'>
                                    <button className='btn_modal_f' onClick={() => addToTotal(prod.id, prod)}>Añadir</button>
                                </div>
                            </div>
                        </>)}



                </div>
                <button className='btn_mod_bottom' onClick={() => navigate("/cart")}>No gracias</button>
            </div>
        </div>
    </>
}

export default ModalFinal;