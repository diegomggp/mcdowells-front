import '../../assets/clients/modalClients.css'
import '../../assets/clients/modalBruger.css'
import '../../assets/clients/cart.css'
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';


const ModalPolitics = (props) => {

    const [styleMod, setStyleMod] = useState("modal-close")

    useEffect(() => {
        setTimeout(() => {
            setStyleMod("container_mod_politics")
        }, 100)


    }, [])
    return <>
        <div className="container_politics" >
            <div className={styleMod}>
                <div className='text_politics'>
                    <Typography variant='body1' sx={{ fontSize: "15px" }}>
                        MCDOWELL y nuestros partners externos emplean cookies con finalidades técnicas y analíticas, para almacenar y administrar las peferencias del usuario, habilitar contenido
                        y recolectar datos analíticos y de uso, así como garantizar el correcto funcionamiento de esta web.
                    </Typography>
                </div>
                <div className='buttons_politics'>
                    <button className='btn_mod_politics' onClick={props.close}>Aceptar</button>
                    <button className='btn_mod_politics' onClick={props.close}>Rechazar</button>
                </div>


            </div>
        </div>
    </>
}



export default ModalPolitics