

export interface FooterInfo {
    title: string;
    links: { name: string; href: string }[];
}


export const footerData: FooterInfo[] = [
    {
      title: 'Help',
      links: [
        { name: 'Faq', href: '/policy' },
        { name: 'Delivery Information', href: '/policy' },
        { name: 'Returns Policy', href: '/policy' },
        { name: 'Make a Return', href: '/policy' },
        { name: 'Orders', href: '/orders' },
        { name: 'Submit a Fake', href: '/policy' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'Login', href: '/auth' },
        { name: 'Register', href: '/register' },
        { name: 'My Progress', href: '/progress' },
        { name: 'Crowdfunding', href: '/crowdfunding'},
      ],
    },
    {
      title: 'Catalog',
      links: [
        { name: 'View All', href: '/category' },
        { name: 'Accessories', href: '/category' },
        { name: 'Cloth', href: '/category' },
      ],
    },
    {
      title: 'Bag',
      links: [
        { name: 'Quick View', href: '/bag' },
        { name: 'View Bag', href: '/bag' },
      ],
    },
  ];