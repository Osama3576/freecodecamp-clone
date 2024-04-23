'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

function NavBar({ setSearchQuery }) {
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="fixed z-20 w-full text-white">
      <div className="flex items-center justify-between p-4 bg-black">
        <div className="relative">
          <Input
            className=" pl-9 bg-[#3b3b4f] placeholder:text-slate-300"
            type="text"
            placeholder="Search Tutorials"
            onChange={handleChange}
          />
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 top-1/2 left-3 text-slate-300" />
        </div>
        <div className="text-2xl">
          <h1>FreeCodeCamp(🔥)</h1>
        </div>
        <div className="flex gap-4">
          <Button className="transition hover:bg-white hover:text-black">
            Forum
          </Button>
          <Button className="bg-[#feac32] text-black hover:bg-[#fecc4c] transition">
            Donate
          </Button>
        </div>
      </div>
      <div className="bg-[#002ead] text-center py-2">
        <h1>Learn to code --free 3000-hour curriculum</h1>
      </div>
    </div>
  );
}

export default NavBar;
