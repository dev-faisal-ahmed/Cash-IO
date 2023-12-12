import { GoHomeFill } from 'react-icons/go';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { BiSolidWalletAlt, BiSolidShoppingBagAlt } from 'react-icons/bi';

export const navigationLinksData = [
  { title: 'Dashboard', url: '/', icon: <GoHomeFill /> },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: <BiSolidShoppingBagAlt />,
  },
  {
    title: 'Wallets',
    url: '/wallets',
    icon: <BiSolidWalletAlt />,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: <BiSolidFoodMenu />,
  },
];
