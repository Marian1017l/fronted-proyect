import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './VerifyCodePhone.css';
import { setLoading } from '../../redux/authSlice';
import { auth } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';


const VerifyCodePhone = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [verifyError, setVerifyError] = useState(null);
  const [message, setMessage] = useState(null);
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!code.trim()) {
      newErrors.code = "El código es requerido";
    } else if (code.trim().length !== 6) {
      newErrors.code = "El código debe tener exactamente 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerifyError(null);
    setMessage(null);

    if (!validateForm()) return;

    dispatch(setLoading(true));

    try {
      const response = await auth.verifyCodePhone(code);

      if (!response.ok) {
        //salto 
      }
      else {
        console.log("Verificado:", response);
        setMessage("Código verificado correctamente.")
        navigate("/homeAdmin");
      }
    } catch (error) {
      console.error("Error en la verificación:", error);
      setVerifyError("Error al verificar el código.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResend = () => {
    const email = localStorage.getItem("email");
    if (email) {
      const response = auth.resendCodePhone(email);
      console.log(response);
      
      console.log("Código reenviado");
    }
  };


  return (
    <div className="verify-container">
      <div className="verify-box">
        <div className="verify-header">VERIFICATION CODE</div>

        <p className="verify-instruction">
          Please look at your phone and <br /> enter the code
        </p>

        <input
          type="text"
          name="code"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="verify-input"
        />
        {errors.code && <span className="field-error">{errors.code}</span>}

        <button
          type="submit"
          className="verify-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Verifying..." : "LOG IN"}
        </button>

        {verifyError && (
          <p className="field-error" style={{ textAlign: "center" }}>
            {verifyError}
          </p>
        )}
        {message && (
          <p className="field-success" style={{ textAlign: "center" }}>
            {message}
          </p>
        )}

        <p className="verify-footer">
          Did you not get the code? <span className="resend" onClick={handleResend}>Resend.</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyCodePhone;
