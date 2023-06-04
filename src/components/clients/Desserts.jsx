import NavBarHelados from "./NavBarHelados"
import { Typography } from '@mui/material';
import '../../assets/clients/productdetailsAdds.css'
import '../../assets/clients/menuExtras.css'
import { useState } from "react";
import desserts from "../../libs/desserts";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import NavBarBottom from './NavBarBotttom';
import ModalFinal from './ModalFinal';

const Desserts = () => {

    const [idProd, setIdProd] = useState()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const context = useCartContext();
    const [showModal, setShowModal] = useState(false)

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
        setIdProd(id)
        setTotal(total + product.price)
    }

    const removeToTotal = async (id, product) => {
        const isInCart = context.extrasCart.find(item => item.id === id)
        if (isInCart.quantity === 1) {

            const setDeleteProd = context.extrasCart.filter(item => isInCart.id !== item.id);
            context.setExtrasCart(setDeleteProd);

        } else {

            const setDeleteOne = context.extrasCart.map(item =>
                item.id === isInCart.id ? {
                    ...isInCart,
                    quantity: isInCart.quantity - 1,
                    total: isInCart.price * (isInCart.quantity - 1)
                } : item
            );
            context.setExtrasCart(setDeleteOne);
        }


        if (total !== 0) {
            setTotal(total - product.price)
        }
        if (total > 0) {

            const setTotalPrice = context.totalCart.map((item) => {
                return (
                    {
                        totalPrice: item.totalPrice - product.price,
                        totalQuantity: item.totalQuantity
                    })
            })
            context.setTotalCart(setTotalPrice)
            setIdProd(null)
        }
    }


    return <>
        <NavBarHelados />
        <div className='container_top_extras'>
            <div className='text_top_add'>
                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                    ¡Tus complementos!
                </Typography >
                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    Añade un complemento por 1,99€
                </Typography>
            </div>
            <div className='btn_single_add' onClick={() => setShowModal(true)} >
                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    Continuar
                </Typography>
            </div>
        </div>

        <div className='containter_custom_menu_1'>
            {desserts.map((product) =>
                <>
                    {idProd !== product.id ?
                        <div className='container_extras' style={{ backgroundColor: "#FFFFFF" }}>
                            <div className='ingredients_options'>
                                <img src={product.image} alt={"auto"} />
                            </div>

                            <div className='extras_options'>
                                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                    {product.title}
                                </Typography>
                                <button className='btn_ingredients' >
                                    <AddCircleOutlineIcon onClick={() => addToTotal(product.id, product)} />
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Añadir
                                    </Typography>
                                </button>
                                <button className='btn_ingredients' >
                                    <RemoveCircleOutlineIcon onClick={() => removeToTotal(product.id, product)} />
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Quitar
                                    </Typography>
                                </button>
                            </div>
                            <div className='total_extras_options'>
                                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    +{product.price}€
                                </Typography>
                            </div>
                        </div>
                        :
                        <div className='container_extras' style={{ backgroundColor: "#F3FFE3" }}>
                            <div className='ingredients_options'>
                                <img src={product.image} alt={"auto"} />
                            </div>

                            <div className='extras_options'>
                                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                    {product.title}
                                </Typography>
                                <button className='btn_ingredients' >
                                    <AddCircleOutlineIcon onClick={() => addToTotal(product.id, product)} />
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Añadir
                                    </Typography>
                                </button>
                                <button className='btn_ingredients' >
                                    <RemoveCircleOutlineIcon onClick={() => removeToTotal(product.id, product)} />
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Quitar
                                    </Typography>
                                </button>
                            </div>
                            <div className='total_extras_options'>
                                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    +{product.price}€
                                </Typography>
                            </div>
                        </div>}
                </>
            )}
        </div>
        <NavBarBottom />

        {showModal && <ModalFinal />}
    </>

}


export default Desserts