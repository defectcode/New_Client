

export interface FooterInfo {
    title: string;
    links: { name: string; href: string }[];
}


export const footerData: FooterInfo[] = [
    {
      title: 'Help',
      links: [
        { name: 'Faq', href: '/faq' },
        { name: 'Delivery Information', href: '/delivery' },
        { name: 'Returns Policy', href: '/returns' },
        { name: 'Make a Return', href: '/return' },
        { name: 'Orders', href: '/orders' },
        { name: 'Submit a Fake', href: '/submit-fake' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
        { name: 'My Progress', href: '/progress' },
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