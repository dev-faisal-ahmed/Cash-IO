import { GoHomeFill } from 'react-icons/go';
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
];
