import React from 'react';
import './Loader.scss';
import { useTranslation } from 'react-i18next';
import spinner from '../../assets/images/spinner.svg';

function Loader({ showText = true }) {
  const { t } = useTranslation();
  return (
    <div className='loader-container'>
      <div className='loader-content'>
        <img src={spinner} alt='loading' />
        { showText && <h1>{t('Loader.text')} </h1> }
        
      </div>
    </div>
  );
}

export default Loader;
