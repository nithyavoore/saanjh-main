import React from 'react'

const Error = (props) => {
  return (
    <div className='error-header text-danger mx-1 my-1' > There was an Error {props.name} </div>
  )
}

export default Error