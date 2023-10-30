import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from 'react-hook-form'
import { Eye, EyeSlash } from '@phosphor-icons/react'


interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  field: string
  theme?: 'dark' | 'light'
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result
};

export function InputBox(props: InputBoxProps) {
  const { register } = useFormContext()
  const { formState: { errors } } = useFormContext()
  const fieldError = get(errors, props.field)

  let { theme, type } = props

  const [hidePassword, setHidePassword] = useState(type === 'password')
  function toggleShowPassword() {
    if (type === 'password') {
      setHidePassword(!hidePassword);
    }
  }

  let inputStyle = 'bg-gray-500 text-gray-50  border-gray-200 focus:border-green-900'
  let labelStyle = 'text-gray-200 peer-focus:text-gray-50'
  let passwordIconColor = 'text-gray-50'
  
  if (!theme) theme = 'light'
  if (theme === 'light') {
    inputStyle = 'bg-gray-100 text-gray-950 border-gray-200 focus:border-green-900'
    labelStyle = 'text-gray-400 peer-focus:text-gray-950'
    passwordIconColor = 'text-gray-950'
  }

  return (
    <div className='z-0 relative'>
      <input
        id={props.field}
        {...register(props.field)}
        className={`${inputStyle} block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer`}
        placeholder=" "
        {...props}
        type={hidePassword ? 'password' : 'text'}
      />
      <label
        htmlFor={props.field}
        className={`${labelStyle} absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {props.label}
      </label>
      {!fieldError ? "" : <span className="absolute bottom--1 text-xs text-red-500">{fieldError.message?.toString()}</span>}

      {(type === 'password') &&
        <div className={`${passwordIconColor} absolute right-0 top-2 mt-3 mr-2 flex`}>
          {hidePassword ?
            <Eye className="hover:cursor-pointer" onClick={toggleShowPassword} size={20} />
            :
            <EyeSlash className="hover:cursor-pointer" onClick={toggleShowPassword} size={20} />
          }
        </div>
      }
    </div>
  )
}
