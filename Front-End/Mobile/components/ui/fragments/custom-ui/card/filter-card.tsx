// components/ui/fragments/custom-ui/card/filter-card.tsx - UPDATED

import React from 'react';

import { THEME } from '@/lib/theme';
import { SearchBar } from '../searchbar';
import { Icon } from '../../shadcn-ui/icon';

import { View } from 'react-native';
import { Filter } from '@hugeicons/core-free-icons';

interface FilterCardProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  searchQuery?: string;
  placeholder?: string;
}

export default function FilterCard({
  onSearch,
  onClear,
  searchQuery = '',
  placeholder = 'Cari Aktifitas...',
}: FilterCardProps) {
  return (
    <SearchBarWithFilter
      onSearch={onSearch}
      onClear={onClear}
      value={searchQuery}
      placeholder={placeholder}
    />
  );
}

interface SearchBarWithFilterProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  value?: string;
  placeholder?: string;
}

function SearchBarWithFilter({ onSearch, onClear, value, placeholder }: SearchBarWithFilterProps) {
  const [internalValue, setInternalValue] = React.useState(value || '');

  // ✅ Sync internal value with prop
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (text: string) => {
    setInternalValue(text);
  };

  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  const handleClear = () => {
    setInternalValue('');
    onClear?.();
  };

  return (
    <SearchBar
      placeholder={placeholder}
      value={internalValue}
      containerClassName=" px-6     "
      rightIcon={<Icon icon={Filter} size={16} className="text-accent/50" />}
      onChangeText={handleChange}
      onSearch={handleSearch}
      onClear={handleClear}
      showClearButton={true}
      debounceMs={300} // ✅ Debounce 300ms untuk performa
    />
  );
}
