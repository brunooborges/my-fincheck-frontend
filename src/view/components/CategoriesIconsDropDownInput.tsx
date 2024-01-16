import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { cn } from '../../app/utils/cn';
import { DropdownMenu } from './DropdownMenu';
import { CategoryIcon } from './icons/categories/CategoryIcon';

interface CategoriesIconsDropDownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
}

type Icon = {
  icon: string;
  type: 'income' | 'expense';
};

const icons: Icon[] = [
  { icon: 'salary', type: 'income' },
  { icon: 'home', type: 'expense' },
  { icon: 'food', type: 'expense' },
  { icon: 'education', type: 'expense' },
  { icon: 'fun', type: 'expense' },
  { icon: 'grocery', type: 'expense' },
  { icon: 'clothes', type: 'expense' },
  { icon: 'transport', type: 'expense' },
  { icon: 'travel', type: 'expense' },
  { icon: 'other', type: 'expense' },
];

export function CategoriesIconsDropDownInput({
  error,
  className,
  onChange,
  value,
}: CategoriesIconsDropDownInputProps) {
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState<null | Icon>(() => {
    if (!value) {
      return null;
    }
    return icons.find((c) => c.icon === value) ?? null;
  });

  useEffect(() => {
    if (!value) {
      setSelectedCategoryIcon(null);
      return;
    }
    const categoryIcon = icons.find((c) => c.icon === value) ?? null;
    setSelectedCategoryIcon(categoryIcon);
  }, [value]);

  function handleSelect(icon: Icon) {
    setSelectedCategoryIcon(icon);
    onChange?.(icon.icon);
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-700 transition-all outline-none text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            Ícone
            <div className=' absolute right-3 top-1/2 -translate-y-1/2 transition-all'>
              {!selectedCategoryIcon && (
                <ChevronDownIcon className='w-6 h-6 text-gray-800' />
              )}

              {selectedCategoryIcon && (
                <CategoryIcon
                  type={selectedCategoryIcon.type}
                  category={selectedCategoryIcon.icon}
                />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className='grid grid-cols-4'>
          {icons.map((icon) => (
            <DropdownMenu.Item
              key={icon.icon}
              onSelect={() => handleSelect(icon)}
            >
              <CategoryIcon
                type={icon.type}
                category={icon.icon}
              />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {error && (
        <div className='flex gap-2 items-center mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className=' text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
}
