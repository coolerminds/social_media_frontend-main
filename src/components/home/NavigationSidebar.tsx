import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Home, Search, Bell, Mail, Bookmark, Users, User } from 'lucide-react';
import PostModal from './PostModal';

export function NavigationSidebar() {
  const [postOpen, setPostOpen] = useState(false);
  const menuItems = [
    { icon: Home, label: 'HOME', to: '/', end: true },
    { icon: Search, label: 'EXPLORE', to: '/explore' },
    { icon: Bell, label: 'NOTIFICATIONS', to: '/notifications' },
    { icon: Mail, label: 'MESSAGES', to: '/messages' },
    { icon: Bookmark, label: 'BOOKMARKS', to: '/bookmarks' },
    { icon: Users, label: 'COMMUNITIES', to: '/communities' },
    { icon: User, label: 'PROFILE', to: '/profile' },
  ];

  return (
    <>
      <aside className="hidden lg:flex lg:w-72 h-screen sticky top-0 p-6 border-r-4 border-black flex-col bg-white">
      <div className="mb-8">
        <div className="w-16 h-16 bg-black flex items-center justify-center border-4 border-black">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-4 text-base font-bold uppercase tracking-tight border-2 transition-colors btn-dynamic ${
                isActive
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-400 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setPostOpen(true)}
        className="w-full bg-red-600 text-white py-4 px-6 text-base font-bold uppercase tracking-tight border-4 border-red-600 mb-6 btn-dynamic"
      >
        POST
      </button>

      <div className="flex items-center gap-3 p-4 border-2 border-gray-400">
        <div className="w-12 h-12 bg-gray-300 border-2 border-black flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm truncate text-black uppercase">YOUR NAME</div>
          <div className="text-gray-600 text-xs truncate uppercase">@YOURNAME</div>
        </div>
      </div>
      </aside>
      <PostModal open={postOpen} onClose={() => setPostOpen(false)} />
    </>
  );
}
