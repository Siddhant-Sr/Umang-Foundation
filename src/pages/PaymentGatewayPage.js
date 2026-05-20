import React from 'react';
import '../styles/ProjectPages.css';

function PaymentGatewayPage() {
  React.useEffect(() => {
    window.location.replace('https://beta.umangfoundation.org/donate-now');
  }, []);
  return null;
 
}

export default PaymentGatewayPage;