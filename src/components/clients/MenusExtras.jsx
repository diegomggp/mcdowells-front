import NavBarMenus from "./Navbar_Menus";
import { Typography } from '@mui/material';
import '../../assets/clients/productdetailsAdds.css'
import '../../assets/clients/menuExtras.css'
import { useState } from "react";
import extras from "../../libs/extras";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import NavBarBottom from './NavBarBotttom';

const MenuExtras = () => {

    const [idProd, setIdProd] = useState()
    const [color, setColor] = useState("#FFFFFF")
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const context = useCartContext();
    const price = 1.99

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

        if(total !==0){
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
        <NavBarMenus />
        <div className='container_top_extras'>
            <div className='text_top_add'>
                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "24px" }}>
                    ¡Tus complementos!
                </Typography >
                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    Añade un complemento por 1,99€
                </Typography>
            </div>
            <div className='btn_single_add' onClick={() => navigate("/menus/drinks")} >
                <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    Continuar
                </Typography>
            </div>
        </div>

        <div className='containter_custom_menu_1'>
            {extras.map((product) =>
                <>
                    {idProd !== product.id ?
                        <div className='container_extras' style={{ backgroundColor: color }}>
                            <div className='ingredients_options'>
                                <img src={product.image} />
                            </div>

                            <div className='extras_options'>
                                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                    {product.title}
                                </Typography>
                                <button className='btn_ingredients' >
                                    <AddCircleOutlineIcon onClick={() => addToTotal(product.id, product)}/>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Añadir
                                    </Typography>
                                </button>
                                <button className='btn_ingredients' >
                                    <RemoveCircleOutlineIcon onClick={() => removeToTotal(product.id, product)}/>
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
                                <img src={product.image} />
                            </div>

                            <div className='extras_options'>
                                <Typography variant='h2' sx={{ fontWeight: "bold", fontSize: "20px" }}>
                                    {product.title}
                                </Typography>
                                <button className='btn_ingredients' onClick={() => addToTotal(product.id, product)}>
                                    <AddCircleOutlineIcon />
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                        Añadir
                                    </Typography>
                                </button>
                                <button className='btn_ingredients' onClick={() => removeToTotal(product.id, product)}>
                                    <RemoveCircleOutlineIcon />
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
    </>

}


export default MenuExtras