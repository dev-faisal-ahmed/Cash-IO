import { ReactNode } from 'react';

import * as BiIcon from 'react-icons/bi';
import * as BsIcon from 'react-icons/bs';
import * as FaIcon from 'react-icons/fa';
import * as Fa6Icon from 'react-icons/fa6';
import * as GiIcon from 'react-icons/gi';
import * as HiIcon from 'react-icons/hi';
import * as Hi2Icon from 'react-icons/hi2';
import * as ImIcon from 'react-icons/im';
import * as Io5Icon from 'react-icons/io5';
import * as MdIcon from 'react-icons/md';
import * as PiIcon from 'react-icons/pi';
import * as RiIcon from 'react-icons/ri';

export const icons: Record<string, ReactNode> = {
  // Bi
  BiSolidFoodMenu: <BiIcon.BiSolidFoodMenu />,
  BiSolidCableCar: <BiIcon.BiSolidCableCar />,

  // Bs
  BsFillTrainFreightFrontFill: <BsIcon.BsFillTrainFreightFrontFill />,

  // Fa
  FaCar: <FaIcon.FaCar />,
  FaSchool: <FaIcon.FaSchool />,
  FaPlane: <FaIcon.FaPlane />,
  FaPlaneDeparture: <FaIcon.FaPlaneDeparture />,
  FaLuggageCart: <FaIcon.FaLuggageCart />,

  // Fa6
  FaBowlFood: <Fa6Icon.FaBowlFood />,
  FaCarSide: <Fa6Icon.FaCarSide />,
  FaTrainSubway: <Fa6Icon.FaTrainSubway />,
  FaPersonWalkingLuggage: <Fa6Icon.FaPersonWalkingLuggage />,

  // Gi
  GiSchoolBag: <GiIcon.GiSchoolBag />,

  // Hi
  HiOfficeBuilding: <HiIcon.HiOfficeBuilding />,

  // Hi2
  HiMiniHomeModern: <Hi2Icon.HiMiniHomeModern />,
  HiMiniBuildingOffice2: <Hi2Icon.HiMiniBuildingOffice2 />,

  // Im
  ImOffice: <ImIcon.ImOffice />,

  // Io5
  IoFastFood: <Io5Icon.IoFastFood />,
  IoSchoolSharp: <Io5Icon.IoSchoolSharp />,

  // Md
  MdEmojiFoodBeverage: <MdIcon.MdEmojiFoodBeverage />,
  MdFastfood: <MdIcon.MdFastfood />,
  MdFoodBank: <MdIcon.MdFoodBank />,
  MdHome: <MdIcon.MdHome />,
  MdElectricBolt: <MdIcon.MdElectricBolt />,
  MdLocalGasStation: <MdIcon.MdLocalGasStation />,

  // Pi
  PiBowlFoodFill: <PiIcon.PiBowlFoodFill />,

  // Ri
  RiSchoolFill: <RiIcon.RiSchoolFill />,
};
