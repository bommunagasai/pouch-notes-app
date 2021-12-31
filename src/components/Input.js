import React from 'react'

const Input = ({
  onChange,
  placeholder,
  ...rest
}) => {
  return <input className='pna-input-field' onChange={onChange} placeholder={placeholder} {...rest}/>
}

export default Input