"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 transition-colors duration-300 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Nexus<span className="text-blue-600 dark:text-cyan-400">IT</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="hover:text-blue-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#solutions" className="hover:text-blue-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Solutions</a>
              <a href="#awards" className="hover:text-blue-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Awards</a>
              <a href="#contact" className="hover:text-blue-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex items-center">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-400"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
