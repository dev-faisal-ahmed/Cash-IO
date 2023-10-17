import { useState } from 'react';
import { allIconsData } from '@/data/all-icons-data';
import { IconDataType } from '@/lib/types';

export function useGetIcons() {
  const [icons, setIcons] = useState<IconDataType>(allIconsData);
  const [selectedIcon, setSelectedIcon] = useState('');

  const keys = Object.keys(allIconsData);
  const length = keys.length;

  function handleIconSelection(iconKey: string) {
    setSelectedIcon(iconKey);
  }

  function handleFiler(value: string) {
    if (value === '') return setIcons(allIconsData);

    const newIcons: IconDataType = {};
    for (let i = 0; i < length; i++) {
      if (keys[i].toLocaleLowerCase().includes(value)) {
        newIcons[keys[i]] = allIconsData[keys[i]];
      }
    }
    setIcons(newIcons);
  }

  return {
    icons,
    handleFiler,
    allIconsData,
    handleIconSelection,
    selectedIcon,
  };
}
