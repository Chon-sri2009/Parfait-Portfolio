"use client";

import { motion } from "framer-motion";
import { awardsData } from "@/lib/data";
import { Trophy, Award } from "lucide-react";

export default function Awards() {
  return (
    <section id="awards" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Awards & Recognition</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-cyan-500 rounded-full mx-auto md:mx-0"></div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
            A testament to delivering exceptional quality and innovative software solutions in the industry.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl">
          {awardsData.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-cyan-900/10 transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center border border-blue-100 dark:border-slate-700 group-hover:bg-blue-600 group-hover:border-blue-600 dark:group-hover:bg-cyan-500 dark:group-hover:border-cyan-500 transition-colors">
                  <Trophy className="w-8 h-8 text-blue-600 dark:text-cyan-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {award.title}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 mt-2 md:mt-0 w-fit">
                    {award.year}
                  </span>
                </div>
                
                <div className="flex items-center text-blue-600 dark:text-cyan-400 font-medium mb-3 text-sm">
                  <Award className="w-4 h-4 mr-1.5" />
                  {award.organization}
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
