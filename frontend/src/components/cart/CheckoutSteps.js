import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shipping, confirmOrder, payment}) => {

    useEffect(() => {
        if (shipping) console.log('shipping: ', shipping);
    })

  return (
    <div className='checkout-progress d-flex justify-content-center mt-5'>

        {shipping ? <Link to='/shipping' className='float-right'>
            <div className="triangle2-active"></div>
            <div className="active-step step">Shipping</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!'disabled>
            <div className="triangle2-incomplete"></div>
            <div className="incomplete step">Shipping</div>
            <div className="triangle-incomplete"></div>
        </Link>}

        {confirmOrder ? <Link to='/order/comfirm' className='float-right'>
            <div className="triangle2-active"></div>
            <div className="active-step step">Confirm Order</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!'disabled>
            <div className="triangle2-incomplete"></div>
            <div className="incomplete step">Confirm Order</div>
            <div className="triangle-incomplete"></div>
        </Link>}

        {payment ? <Link to='/payment' className='float-right'>
            <div className="triangle2-active"></div>
            <div className="active-step step">Payment</div>
            <div className="triangle-active"></div>
        </Link> : <Link to='#!'disabled>
            <div className="triangle2-incomplete"></div>
            <div className="incomplete step">Payment</div>
            <div className="triangle-incomplete"></div>
        </Link>}

    </div>
  )
}

export default CheckoutSteps