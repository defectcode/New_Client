import { useState } from 'react'

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onColorSelect }: ColorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleColorSelect = (color: string) => {
    onColorSelect(color)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center font-Heebo-16 text-[#8C8C8C] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedColor}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-1 text-[#8C8C8C]"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full w-[120px] left-0 bg-white border border-gray-200 shadow-lg rounded-md mt-2 z-10">
          {colors.map((color) => (
            <div
              key={color}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleColorSelect(color)}
            >
              {color}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
