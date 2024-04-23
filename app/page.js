'use client';
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState();

  return (
    <main>
      <NavBar setSearchQuery={setSearchQuery} />
      <Blogs searchQuery={searchQuery} />
    </main>
  );
}
