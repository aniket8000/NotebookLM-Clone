import React from 'react'

export default function InputField({ value, onChange, placeholder = '', type = 'text', onKeyDown }) {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}
