import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MetaData from './layout/MetaData'

const Home = () => {
  return (
    <Fragment>
        <MetaData title={"Best prices you can ask for"}/>

        <div className='container justify-content-start'>
            <div className="row"><h2>Latest Products</h2></div>
            
            <div className="row">
              <div className="card col-3">
                  <img src="/images/sandisk-memcard.jpg" className="img-fluid" alt="Sample Product" />
                <div className="card-body">
                    <h5 className="card-title">128GB Solid Storage Memory card - Sandisk Ultra</h5>
                    {/* <p className="card-text"></p> */}
                   <div className="container text-center">
                    <button className="btn btn-warning theme">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

    </Fragment>
  )
}

export default Home