import "../../assets/clients/login.css"
import '../../assets/clients/clientshome.css'
import logo from '../../assets/images/logo_burger.png'
import { useNavigate } from 'react-router-dom';
import UsersManager from "../../services/user.Api";
import { useUserContext } from "../../context/User";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ModalPolitics from "./ModalPoliticas";


const Login = () => {
    const contextUser = useUserContext()
    const navigate = useNavigate()
    const [errorLog, setErrorLog] = useState(null)
    const [showMod, setShowMod] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        setTimeout(() => {
            setShowMod(!showMod)
        }, 1000)
    }, [])

   
    const onSubmit = async (data) => {
        const infoUser = {
            username: data.userName,
            password: data.password
        }
        const response = await UsersManager.login(infoUser)
        if (typeof response !== 'undefined') {
            contextUser.setUser({ ...response.data, email: data.userName.toLowerCase() })
            navigate(`/menus`)
            setErrorLog(null)
        } else {
            setErrorLog("Usuario/contraseña no encontrado")
        }

    }

    return <>
        <container className="container_menu_login" >
            <div className='container_image_login' >
                <img className='logo_menu_login' src={logo} alt=" NOT FOUND" onClick={() => navigate('/employees-login')} />

                <form onSubmit={handleSubmit(onSubmit)} className="container_inputs">

                    <input placeholder="Email" className="input_log" {...register('userName', {
                        required: true,
                        pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                    })} />


                    <input type="password" placeholder="Contraseña" className="input_log" {...register('password', {
                        required: true
                    })} />
                    <div className="input_errors">
                        {errors.userName?.type === 'required' && <p className="p_error">Es necesario rellenar todos los campos</p>}
                        {errors.userName?.type === 'pattern' && <p className="p_error">Introduzca un email valido</p>}
                        {errors.password?.type === 'required' && <p className="p_error">Es necesario rellenar todos los campos</p>}
                        {errorLog && <p className="p_error">{errorLog}</p>}
                    </div>
                    <Typography variant='body1' sx={{ textDecoration: " underline #74AF00" }} className="text_bottom">
                        ¿Has olvidado tu contraseña?
                    </Typography>
                    <button type="submit" className="btn_sendlogin">Entrar</button>
                </form>
                <p>--------O--------</p>
                <button className="btn_sendlogin" onClick={() => navigate("/register/new-account")}>Registrate</button>
            </div>
        </container>
        {showMod && <ModalPolitics close={()=>setShowMod(!showMod)}/>}
    </>

}

export default Login