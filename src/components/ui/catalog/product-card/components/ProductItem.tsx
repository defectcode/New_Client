'use client'
import { useState } from "react";

function ProductItem({ item }: { item: any }) {
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(item.product.color.name);
  
    const toggleColorDropdown = () => setColorDropdownOpen(!colorDropdownOpen);
  
    const selectColor = (color: string) => {
      setSelectedColor(color);
      setColorDropdownOpen(false);
    };
  
    return (
      <div className="product-item">
        <h2>{item.product.title}</h2>
        <div>
          <p onClick={toggleColorDropdown}>{selectedColor}</p>
          {colorDropdownOpen && (
            <div>
              {['Light gray', 'Blue', 'Red', 'Black'].map((color) => (
                <p key={color} onClick={() => selectColor(color)}>
                  {color}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  