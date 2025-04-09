import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd'; // Importa Card, Typography y Spin}
import './Login.css'; // Importa los estilos CSS
import { auth } from '../../api/auth';
import { setLoading } from "../../redux/authSlice";
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {

  const [formData, setFormData] = React.useState({
    email: "",
    current_password: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.auth)
  const [errors, setErros] = useState({})
  const [loginError, setLoginError] = useState(null);

  const validateForm = () => { 
    const newErrors = {};

    //Validación de correo electrónico
    if(!formData.email) {
      newErrors.email = "Email is required";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/){
      newErrors.email = "Invalid email format";
    }

    //Validación de contraseña
    if(!formData.current_password) {
      newErrors.current_password = "Password is required";
    }

    setErros(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  }

  const handleChange =(e)=>{
    const {name, value}=e.target;
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null); 
    if(!validateForm()){
      return; 
    }

    dispatch(setLoading(true));
    try{
      const response = await auth.signIn(formData);

      if (response.ok) {
        localStorage.setItem("email", formData.email);
        navigate('/verifyPhone');
      } else {
        setLoginError("Unexpected login response");
      }
      

    }catch(error){
      console.error("Error during login:", error);
      setLoginError("Invalid email or password");
    }
  }

  return <div className='login-container'>
        <Title level={2} style={{textAlign: "center", color: "#72B4FF"}}>LogIn</Title>
        <form onSubmit={handleSubmit}> 
          {/*Input email*/} 
          <div className='form-group'>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' />

            {errors.email && <span className='field-error'>{errors.email}</span>}
          </div>
          {/*Input password*/} 
          <div className='form-group'>

            <label htmlFor="current_password">Password</label>
            <input type="password" name="current_password" id="current_password" value={formData.current_password} onChange={handleChange} 
            placeholder='Enter your password' />

            {errors.email && <span className='field-error'>{errors.current_password}</span>}
          </div>

          <button type ="submit" className='login-button' disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
  </div>
}

export default Login