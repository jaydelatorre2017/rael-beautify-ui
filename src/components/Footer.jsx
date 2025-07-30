import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-950 backdrop-blur-md border-t border-white/20 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-white/90">
            <span className="text-sm font-medium">
              © {new Date().getFullYear()} SDO Camarines Norte
            </span>
            <div className="hidden md:block w-px h-4 bg-white/30"></div>
            <span className="text-sm">
              ICT Unit with Year 2025 Mabini CS OJT
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/images/deped_regional_logo.png" 
                alt="DepEd Logo" 
                className="w-6 h-6 object-contain"
              />
              <span className="text-white/80 text-xs hidden sm:block">
                Regional Assembly of Education Leaders
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-center text-white/70 text-xs">
            Empowering educational leaders through digital innovation and collaboration
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
