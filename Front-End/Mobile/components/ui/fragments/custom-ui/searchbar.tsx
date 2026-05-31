import { Icon } from '../shadcn-ui/icon';

import { THEME } from '@/lib/theme';

import { Search, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Input } from '../shadcn-ui/input';

import { cn } from '@/lib/utils';
import { Search01FreeIcons } from '@hugeicons/core-free-icons';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  loading?: boolean;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  debounceMs?: number;
  iconColor?: string;
  containerClassName?: string;
}

export function SearchBar({
  loading = false,
  onSearch,
  iconColor,
  onClear,
  showClearButton = true,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  debounceMs = 300,
  placeholder = 'Search...',
  value,
  containerClassName,
  onChangeText,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value || '');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Theme colors
  const cardColor = THEME.light.card;
  const textColor = THEME.light.foreground;
  const muted = THEME.light.muted;

  // Handle text change with debouncing
  const handleTextChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);

      if (onSearch && debounceMs > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        (debounceRef.current as any) = setTimeout(() => {
          onSearch(text);
        }, debounceMs);
      } else if (onSearch) {
        onSearch(text);
      }
    },
    [onChangeText, onSearch, debounceMs]
  );

  // Handle clear button press
  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText?.('');
    onClear?.();
    onSearch?.('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, [onChangeText, onClear, onSearch]);

  // Get container style based on variant and size
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cardColor,
    height: 59,
    paddingHorizontal: 16,
    borderRadius: 12,
  };

  const baseInputStyle = {
    flex: 1,
    fontSize: 16,
    color: textColor,
    marginHorizontal: 8,
  };

  const displayValue = value !== undefined ? value : internalValue;
  const showClear = showClearButton && displayValue.length > 0;
  const [isFocused, setIsFocused] = useState(false);
  const toggleKeyboard = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      inputRef && 'current' in inputRef && inputRef.current?.focus();
    }
  };
  const handleFocus = (e: any) => {
    setIsFocused(true);

    toggleKeyboard();
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
  };
  return (
    <View className={cn('relative mb-0 w-full rounded-2xl', isFocused || displayValue)}>
      {/* Left Icon */}
      {leftIcon || (
        <View className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <Icon
            icon={Search01FreeIcons}
            size={15}
            color={isFocused || displayValue ? THEME.light.primary : THEME.light.mutedForeground}
          />
        </View>
      )}

      <Input
        className={cn(
          `h-11 rounded-2xl bg-transparent text-sm text-primary shadow-none transition-all duration-200`,
          'pl-12',
          isFocused || (displayValue && 'bg-primary/5 border-primary')
        )}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        value={displayValue}
        onChangeText={handleTextChange}
        placeholderTextColor={isFocused ? THEME.light.primary : THEME.light.mutedForeground}
        {...props}
      />

      {/* {loading && <ActivityIndicator size="small" color={muted} style={{ marginRight: 4 }} />} */}
    </View>
  );
}

interface SearchBarWithSuggestionsProps extends SearchBarProps {
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  maxSuggestions?: number;
  showSuggestions?: boolean;
}

export function SearchBarWithSuggestions({
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  showSuggestions = true,
  containerStyle,
  ...searchBarProps
}: SearchBarWithSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardColor = THEME.light.card;
  const borderColor = THEME.light.border;

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes((searchBarProps.value || '').toLowerCase())
    )
    .slice(0, maxSuggestions);

  const shouldShowSuggestions =
    showSuggestions &&
    isExpanded &&
    filteredSuggestions.length > 0 &&
    (searchBarProps.value || '').length > 0;

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
    setIsExpanded(false);
  };

  return (
    <SearchBar
      {...searchBarProps}
      onFocus={(e) => {
        setIsExpanded(true);
        searchBarProps.onFocus?.(e);
      }}
      onBlur={(e) => {
        setTimeout(() => setIsExpanded(false), 150);
        searchBarProps.onBlur?.(e);
      }}
    />
  );
}
