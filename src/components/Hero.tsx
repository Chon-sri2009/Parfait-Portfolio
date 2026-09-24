"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-purple-600 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-cyan-400 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-cyan-500"></span>
              </span>
              Available for New Projects
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              Engineering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-purple-500">
                Enterprise Software
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
              I build scalable, high-performance, and beautifully designed web applications that solve complex business problems.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#solutions" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 transition-colors shadow-lg shadow-blue-500/30"
              >
                View Solutions
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200 dark:border-slate-800 text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Floating abstract tech elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 backdrop-blur-3xl transform rotate-3 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 dark:opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                <Terminal className="w-32 h-32 text-blue-500 dark:text-cyan-400 opacity-80" strokeWidth={1} />
                
                {/* Decorative floating cards */}
                <motion.div 
                  animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -right-8 top-12 bg-white dark:bg-slate-950 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800"
                >
                  <div className="w-24 h-2 bg-gray-200 dark:bg-slate-800 rounded-full mb-2"></div>
                  <div className="w-16 h-2 bg-blue-500 dark:bg-cyan-500 rounded-full"></div>
                </motion.div>

                <motion.div 
                  animate={{ x: [5, -5, 5], y: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-20 bg-white dark:bg-slate-950 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-slate-800 rounded-full mb-2"></div>
                    <div className="w-10 h-2 bg-gray-200 dark:bg-slate-800 rounded-full"></div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
