import React, { useState, useEffect } from 'react';
import imagen from './assets/images/cryptomonedas.png';
import Formulario from './components/Formulario';
import Loading from './components/Loading';
import axios from 'axios';
import Conversion from './components/Conversion';

function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ cargando, guardarCargando ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(
    () => {
      const cotizarCriptoMoneda = async () => {

        // SI NO HAY MONEDA, NO EJECUTAR
        if (moneda === '') return;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        // MOSTRAR LOADING
        guardarCargando(true);

        // OCULTAR LOADING Y AGREGAR EL RESULTADO
        setTimeout( () => {
          guardarCargando(false);
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        }, 3000);
      }

      cotizarCriptoMoneda();
    }, [moneda, criptomoneda]
  )

  // MOSTRAR LOADING O RESULTADO
  const cargandoComponent = (cargando) ? <Loading /> : <Conversion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
        </div>

        <div className="one-half column" >
          <h1>Cotizador de Criptomonedas</h1>

          <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />

          {cargandoComponent}

        </div>
      </div>
    </div>
  );
}

export default App;
