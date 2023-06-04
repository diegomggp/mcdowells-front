import "../../assets/clients/login.css"
import '../../assets/clients/clientshome.css'
import logo from '../../assets/images/logo_burger.png'
import { useNavigate } from 'react-router-dom';
import UsersManager from "../../services/user.Api";
import { useUserContext } from "../../context/User";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {

    const navigate = useNavigate()
    const contextUser = useUserContext()
    const [errorLog, setErrorLog] = useState(null)
    const [log, setLog] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()


    const onSubmit = async (data) => {
        setErrorLog(null)
        const userInformation = {
            username: data.userName,
            password: data.password,
            name: data.name
        }

        const response = await UsersManager.register(userInformation, setErrorLog, setLog)
        contextUser.setUser({ ...response.data, email: data.userName.toLowerCase() })

    }
    if (log) {

        navigate('/menus')
    }

    return <>
        <container className="container_menu_login">
            <div className='container_image_login'>
                <img className='logo_menu' src={logo} alt=" NOT FOUND" />

                <form onSubmit={handleSubmit(onSubmit)} className="container_inputs">
                    <input placeholder="Nombre" className="input_log" {...register('name', {
                        required: true,
                    })} />
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
                        {errorLog && <p className="p_error">{errorLog[0].msg}</p>}
                    </div>
                    <div className="containter_btn_reg">
                        <button className="btn_sendlogin" onClick={() => navigate("/login")}>Volver</button>
                        <button type="submit" className="btn_sendlogin">Registrarse</button>

                    </div>
                </form>
            </div>
        </container>
    </>

}

export default Register