'use client'

import Link from 'next/link'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion } from 'motion/react'

const routes = [
  { name: 'Home', path: '/' },
  { name: 'All Events', path: '/events/all' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className='flex justify-between items-center border-b border-white/10 h-14 sm:px-9 px-3'>
      <Logo />
      <nav className='h-full'>
        <ul className='flex gap-x-6 h-full text-sm'>
          {routes.map((route) => (
            <li
              key={route.path}
              className={clsx(
                'relative flex items-center hover:text-white transition',
                {
                  'text-white': pathname === route.path,
                  'text-white/50': pathname !== route.path,
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>

              {pathname === route.path && (
                <motion.div
                  layoutId='header-active-link'
                  className='bg-accent h-1 w-full absolute bottom-0'
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
