'use client';

export default function Footer() {
  return (
    <footer className="border-t mt-16 border-black/10 dark:border-[#40444b] darkest:border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-10 pb-24 md:pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white darkest:text-white">AustroVis</h3>
            <p className="text-sm max-w-md text-black/50 dark:text-[#b9bbbe] darkest:text-white/50">
              A community of researchers, students, and practitioners interested in data visualization and visual analytics in Austria.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-black dark:text-white darkest:text-white">Connect</h4>
            <a 
              href="https://discord.gg/rbkSzsxP47" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm transition-colors text-black/50 hover:text-black dark:text-[#b9bbbe] dark:hover:text-white darkest:text-white/50 darkest:hover:text-white"
            >
              Discord
            </a>
            <a 
              href="https://github.com/austrovis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm transition-colors text-black/50 hover:text-black dark:text-[#b9bbbe] dark:hover:text-white darkest:text-white/50 darkest:hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm space-y-2 border-black/10 dark:border-[#40444b] darkest:border-white/20 text-black/50 dark:text-[#b9bbbe] darkest:text-white/50">
          <p>
            Code by{' '}
            <a 
              href="https://github.com/velitchko" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline font-medium text-black dark:text-white darkest:text-white"
            >
              @velitchko
            </a>
          </p>
          <p>
            <a 
              href="https://github.com/austrovis/austrovis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline transition-colors text-black/50 hover:text-black dark:text-[#b9bbbe] dark:hover:text-white darkest:text-white/50 darkest:hover:text-white"
            >
              View source & report issues →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
