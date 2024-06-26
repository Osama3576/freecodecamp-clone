import { Lato } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import ToasterContext from '@/context/ToasterContext';
import QueryContext from '@/context/QueryContext';

const inter = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryContext>
          <ToasterContext />
          {/* <NavBar /> */}
          {children}
        </QueryContext>
      </body>
    </html>
  );
}
