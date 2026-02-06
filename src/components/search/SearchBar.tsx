import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  variant?: 'light' | 'dark';
}

export default function SearchBar({ initialValue = '', placeholder = 'SEARCH', variant = 'light' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  const baseClasses =
    'w-full border-4 px-4 py-4 text-sm font-bold uppercase tracking-tight focus:outline-none';
  const variantClasses =
    variant === 'dark'
      ? 'bg-black text-white border-black placeholder-gray-400 focus:border-red-600'
      : 'bg-white text-black border-black placeholder-gray-500 focus:border-blue-600';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={`${baseClasses} ${variantClasses}`}
      />
    </form>
  );
}
