import { InputHTMLAttributes } from "react";
import { useFormContext } from 'react-hook-form'



interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  field: string
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

  return (
    <div className="relative">
      <input
        id={props.field}
        {...register(props.field)}
        type="text"
        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm bg-gray-500 border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        placeholder=" "
        {...props}
      />
      <label 
        htmlFor={props.field}
        className="absolute text-sm text-gray-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-50 peer-focus:dark:text--50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {props.label}
      </label>
      {!fieldError ? "": <span className="text-xs text-red-500">{fieldError.message?.toString()}</span>}
    </div>
  )

}