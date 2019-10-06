import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import MensajeError from './MensajeError';

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    const consultarCriptoApi = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';

        const respuesta = await axios.get(url);
        
        //COLOCAR RESPUESTA EN EL STATE
        guardarCriptomonedas(respuesta.data.Data);
    }

    useEffect(
        () => {
            consultarCriptoApi();
        }, []
    )

    // Validar que el usuario llene ambos campos
    const cotizarMoneda = (e) => {
        e.preventDefault();

        // VALIDAR SI LOS CAMPOS ESTÁN LLENOS
        if(monedaCotizar === '' || criptoCotizar === '') {
            guardarError(true);
            return null;
        }

        // ENVIAR LOS DATOS AL COMPONENTE PRINCIPAL
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
        guardarError(false);
    }


    // Mostrar Error en caso que exista
    const componente = (error) ? <MensajeError mensaje="*Ambos campos son obligatorios" /> : null;


    return ( 
        <form onSubmit={cotizarMoneda}>

            {componente}

            <div className="row">
                <label>Elige tu Moneda</label>

                <select className="u-full-width" onChange={ (e) => guardarMonedaCotizar( e.target.value ) }>
                    <option value="">Elige la Conversión</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="EUR">Euro</option>
                    <option value="CLP">Peso Chileno</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>

                <select className="u-full-width" onChange={ (e) => guardarCriptoCotizar( e.target.value ) }>
                    <option value="">Elige una Criptomoneda</option>
                    {
                        criptomonedas.map( (cripto, index) => {
                            return (
                                <Criptomoneda key={index} cripto={cripto} />
                            )
                        })
                    }
                </select>
            </div>

            <button type="submit" className="button-primary u-full-width">Realizar Conversión</button>
        </form>
     );
}
 
export default Formulario;