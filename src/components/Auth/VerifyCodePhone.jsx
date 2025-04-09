import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './VerifyCodePhone.css';
import { setLoading } from '../../redux/authSlice';
import { auth } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode }from 'jwt-decode';

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
      const email = localStorage.getItem("email");
      const response = await auth.verifyCodePhone(email, code);


      if (!response.ok) {
        Swal.fire({
          title: 'CODES EXPIRES!',
          icon: 'error',
          showConfirmButton: false
        });
        return;
      }

      const data = await response.json(); // Suponiendo que el backend responde con { token: '...', ... }

      const token = data.token;
      const decoded = jwtDecode(token);
      console.log(decoded.role);

      if (decoded.role === 'SUPERADMIN') {
        navigate("/homeAdmin");
      } else {
        Swal.fire({
          title: 'Access Denied',
          text: 'No tienes permisos de administrador.',
          icon: 'error',
        });
        return;
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
