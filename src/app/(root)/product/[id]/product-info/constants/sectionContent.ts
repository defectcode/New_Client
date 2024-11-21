


export interface SectionContentItem {
    title: string;
    description: string;
    benefits?: string[];
    details?: string[];
    image?: string;
  }
  
  export const sectionContent: Record<string, SectionContentItem> = {
    productDetails: {
      title: "PRODUCT DETAILS",
      description:
        "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better. Modern footwear technology helps bring the comfort into the 21st century.",
      benefits: [
        "Premium leather in the upper has the perfect sheen and breaks in beautifully.",
        "The modern foam midsole offers lightweight, responsive cushioning.",
        "A padded, low-cut collar adds a sleek look that feels comfortable.",
        "Bold color blocking throws it back to the original colorway inspiration: school team colors.",
        "The rubber outsole with classic hoops pivot circle adds durability, traction and heritage style.",
      ],
      details: [
        "Low-cut collar",
        "Foam insole",
        "Perforations on toe",
        "Shown: White/Grey Fog",
        "Style: DD1391-103",
      ],
      image: "/images/product.svg",
    },
    sizeAndFit: {
      title: "SIZE AND FIT",
      description:
        "This product fits true to size. Please refer to the size chart for accurate measurements.",
      image: '/images/size.svg',
    },
    shippingReturns: {
      title: "SHIPPING RETURNS",
      description:
        "We offer free shipping for orders over $100. Returns are accepted within 30 days of purchase.",
      details: [
        "Return policy: Items must be unworn and in original packaging.",
        "Processing time: Refunds will be processed within 5-7 business days.",
        "Shipping partners: UPS, FedEx, and DHL.",
      ],
      image: '/images/return.svg',
    },

    reviews: {
        title: "REVIEWS",
        description: "dsdsd",
        image: '/images/reviews.svg',
    }
  };
  