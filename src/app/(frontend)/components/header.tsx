'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navigation } from '../site-data'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b border-violet-950/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1480px] items-center gap-5 px-4 sm:px-6 lg:h-20 lg:px-10">
        <Link href="/" className="mr-auto flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/pharlog-logo.webp"
            alt="PHARLOG"
            width={52}
            height={52}
            priority
            className="h-11 w-11 object-contain lg:h-13 lg:w-13"
          />
          <span className="flex flex-col leading-none">
            <b className="font-display text-base tracking-[.12em] text-[#181529] lg:text-lg">
              PHARLOG
            </b>
            <small className="mt-1.5 hidden text-[10px] tracking-wide text-[#6e6a7a] sm:block">
              Logistique officinale
            </small>
          </span>
        </Link>
        <nav
          aria-label="Navigation principale"
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-18 max-h-[calc(100vh-4.5rem)] flex-col gap-1 overflow-auto border-b border-violet-950/10 bg-white p-4 shadow-xl lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-full px-3 py-3 text-sm font-semibold transition hover:bg-violet-50 hover:text-[#5b21c4] lg:py-2 ${pathname === item.href ? 'bg-violet-50 text-[#5b21c4]' : 'text-[#403d4d]'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[#5b21c4] px-5 py-3 text-center text-sm font-bold text-white lg:hidden"
          >
            Demande sur mesure
          </Link>
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-[#5b21c4] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#49189f] md:block"
        >
          Demande sur mesure
        </Link>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-violet-950/15 lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span aria-hidden className="text-xl">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>
    </header>
  )
}
