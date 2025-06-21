// import varaImage from '../assets/vara.svg';
import type { GearApi } from '@gear-js/api';
import './balance.css';

type Props = {
    api: GearApi
}

export function Balance() {
    return(
        <>
            {/* <img src={varaImage} alt="varaImage" /> */}
            <p
                className='vara-balance-text'
            >WALLEEEETS</p>
        </>
    );
}