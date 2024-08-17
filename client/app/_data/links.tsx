import { RiDashboardFill } from 'react-icons/ri';
import { MdCategory } from 'react-icons/md';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { RiContactsBook3Fill } from 'react-icons/ri';
import { RiShoppingBag2Fill } from 'react-icons/ri';

export const links = [
  { title: 'Dashboard', url: '/', icon: <RiDashboardFill /> },
  { title: 'Categories', url: '/categories', icon: <MdCategory /> },
  { title: 'Wallets', url: '/wallets', icon: <BsFillCreditCardFill /> },
  { title: 'Transactions', url: '/transactions', icon: <RiShoppingBag2Fill /> },
  { title: 'Contacts', url: '/contacts', icon: <RiContactsBook3Fill /> },
];
