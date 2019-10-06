
import React from 'react';

const Criptomoneda = ({cripto}) => {

    const {FullName, Name} = cripto.CoinInfo;

    return ( 
        <option value={Name}>{FullName}</option>
     );
}
 
export default Criptomoneda;