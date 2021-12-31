import React from 'react'

const Textarea = ({
  onChange,
  placeholder,
  ...rest
}) => {
  return <textarea className='pna-input-field' onChange={onChange} placeholder={placeholder} {...rest}/>
}

export default Textarea