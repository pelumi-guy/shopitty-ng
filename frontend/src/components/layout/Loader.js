import React from 'react'

const Loader = ({ className, forHeader }) => {
  return (
    <div className={`loader ${className} ${forHeader ? '' : 'vh-100'}`}></div>
  )
}

export default Loader