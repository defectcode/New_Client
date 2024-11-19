import { useState } from 'react'

interface ColorSelectorProps {
  colors: string[] // Lista culorilor disponibile
  selectedColor: string // Culoarea selectată inițial
  onColorSelect: (color: string) => void // Funcție apelată la selectarea unei culori
}

export function ColorSelector({ colors, selectedColor, onColorSelect }: ColorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false) // Starea pentru afișarea popup-ului

  const handleColorSelect = (color: string) => {
    onColorSelect(color) // Actualizează culoarea selectată în componenta părinte
    setIsOpen(false) // Închide popup-ul
  }

  return (
    <div className="relative inline-block">
      {/* Culoarea selectată */}
      <div
        className="flex items-center font-Heebo-16 text-[#8C8C8C] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedColor}
        {/* Săgeată */}
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

      {/* Popup cu lista de culori */}
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-md mt-2 z-10">
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
