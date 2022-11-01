import React from 'react'

function Button(props) {
  return (
<button
  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 mt-6 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  type={props.type}>{props.title}</button>  )
}

export default Button