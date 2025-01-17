const handleImageClick = (e, index) => {
    if (index === currentIndex) {
      window.location.href = images[index].link;
      return;
    }
  
    const x = e.clientX;
    const screenWidth = window.innerWidth;
  
    if (x > screenWidth / 2) {
      slider.current?.next();
    } else {
      slider.current?.prev();
    }
  };
  

  export default handleImageClick();