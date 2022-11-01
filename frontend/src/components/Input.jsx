import React from 'react'

function Input(props) {
    return (
               
     <div>
       <lable className="text-sm font-medium leading-none text-gray-800">{props.label}</lable>
        <input type={props.type} className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
     </div>
                    
    );
}

export default Input