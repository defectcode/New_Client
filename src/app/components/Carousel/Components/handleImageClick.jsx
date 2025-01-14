import React from "react";


const handleImageClick = (e, index) => {
    // Verificăm dacă imaginea apăsată este cea centrală
    if (index === currentIndex) {
      // Redirecționăm către link-ul specificat
      window.location.href = images[index].link;
      return;
    }
  
    // Determinăm direcția de navigare pe baza poziției clicului
    const x = e.clientX;
    const screenWidth = window.innerWidth;
  
    if (x > screenWidth / 2) {
      slider.current?.next();
    } else {
      slider.current?.prev();
    }
  };
  

  export default handleImageClick();