import React, { useEffect, useRef, useState } from 'react';
import './HomeAdmin.css';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { auth } from "../../api/auth";

const HomeAdmin = () => {
    const fileInputRef = useRef(null);
    const [deptos, setDeptosData] = useState([]);
    const [loginError, setLoginError] = useState(null);
    const columns = [
        {
            name: "Departamento",
            selector: row => row.departamento
        },
        {
            name: "Municipio",
            selector: row => row.municipio
        }
    ];
    const departments = async () => {
        let response = {};
        try {
            response = await auth.deptos();
        } catch (error) {
        }
        // Convierte el objeto a un array usando sus valores.
        return Array.isArray(response) ? response : [response];
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await departments(); // la función que creaste
            setDeptosData(response);
        }
        fetchData();
    }, []);


    const data = [
        {
            departamento: "Antioquia",
            municipio: "Medellín"
        },
        {
            departamento: "Cundinamarca",
            municipio: "Bogotá"
        },
        {
            departamento: "Valle del Cauca",
            municipio: "Cali"
        },
        {
            departamento: "Atlántico",
            municipio: "Barranquilla"
        },
        {
            departamento: "Santander",
            municipio: "Bucaramanga"
        }
    ]

    const customStyles = {
        header: {
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#72B4FF',
                fontSize: '16px',
                fontWeight: '600',
            },
        },
        headCells: {
            style: {
                color: '#202124',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                backgroundColor: '#ffffff',
                minHeight: '48px',
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#e0e0e0',
                },
            },
        },
        pagination: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#e0e0e0',
                padding: '10px',
            },
        },
    };


    const handleSubmitClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isCSV = file.name.toLowerCase().endsWith('.csv');

        if (!isCSV) {
            Swal.fire({
                icon: 'error',
                title: 'Archivo inválido',
                text: 'Por favor selecciona un archivo con extensión .csv',
            });
            e.target.value = null;
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Archivo válido',
            text: `Archivo cargado: ${file.name}`,
        });

        const formData = new FormData();
        formData.append('file', file);

        try{
            Swal.fire({
                title: 'Cargando...',
                text: 'Estamos obteniendo la información',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                }
              });
            const response = await auth.uploadFile(formData);
            console.log(response);
            Swal.close();
            window.location.reload();
           
        }catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al cargar el archivo.',
            });
        }
    };

    return (
        <div className="home-admin">
            <header className="main-header">
                <h1>WELCOME ADMIN</h1>
            </header>

            <main className="main-content">
                <div className="top-actions">
                    <input
                        type="file"
                        accept=".csv"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <button className="submit-button" onClick={handleSubmitClick}>SUBMIT</button>
                </div>
                <div className="table-container">
                    <DataTable
                        columns={columns}
                        data={deptos}
                        pagination
                        customStyles={customStyles}
                    />
                </div>
            </main>
        </div>
    );
};

export default HomeAdmin;
