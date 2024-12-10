
import classes from './style/Size.module.css'



const Size = () => {
  return (
      <div className="hidden group-hover:flex flex-col absolute bottom-0 left-0 w-full h-[100px] backdrop-blur-sm py-2 justify-center items-center gap-2 rounded-b-[10px] ">
          <h3 className="text-center text-sm font-medium text-[#1E1E1E] mb-2 md:block hidden">
            Quick Add
          </h3>
          <div className="flex gap-2">
            {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
              <button
                key={size}
                className="h-10 w-10 text-[#1E1E1E] border border-[#FFFFFF] rounded-[10px] hover:bg-gray-300 bg-[#FFFFFF]"
              >
                {size}
              </button>
            ))}
          </div>
      </div>
  )
}

export default Size;
