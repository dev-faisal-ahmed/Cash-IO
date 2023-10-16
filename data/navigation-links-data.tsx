import { RiLayoutMasonryFill } from 'react-icons/ri';
import { BiSolidWalletAlt, BiSolidShoppingBagAlt } from 'react-icons/bi';

export const navigationLinksData = [
  { title: 'Dashboard', url: '/', icon: <RiLayoutMasonryFill size={25} /> },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: <BiSolidShoppingBagAlt size={25} />,
  },
  {
    title: 'Wallets',
    url: '/wallets',
    icon: <BiSolidWalletAlt size={25} />,
  },
];
