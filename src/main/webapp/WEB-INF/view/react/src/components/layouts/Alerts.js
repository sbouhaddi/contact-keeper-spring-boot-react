import React, { useContext } from 'react';
import Alertcontext from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Alerts = () => {
  const { alerts } = useContext(Alertcontext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={faInfoCircle} /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
