import Image from 'next/image';
import Link from 'next/link';
import { navigationLinks } from '../constants';

export default function Header() {
  return (
    <header
      className="hidden md:flex bg-light-green py-10 items-center justify-between 
      custom-container rounded-b-[100px]"
    >
      <Link href="/">
        <Image width={150} height={27} src="/logo.svg" alt="logo" />
      </Link>
      <nav>
        <ul className="p-0 m-0 flex items-center gap-5">
          {navigationLinks.map(link => (
            <li className="font-medium text-lg" key={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
