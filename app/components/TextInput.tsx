import React from 'react'
import { TextInputCompTypes } from '../types'

const TextInput = (props: TextInputCompTypes) => {
  return (
    <>
      <input
        type={props?.inputType}
        placeholder={props?.placeholder}
        value={props?.string || ''}
        onChange={(event) => props?.onUpdate(event.target.value)}
        autoComplete='off'
        className='
         block
         w-full
         bg-[#F1F1F2]
         text-gray-800
         border
         border-gray-300
         rounded-md
         py-2.5
         px-3
         focus:outline-none
        '
      />

      <div className="text-red-500 text-[14px] font-semibold">
        {props?.error ? (props?.error) : null}
      </div>
    </>
  )
}

export default TextInput