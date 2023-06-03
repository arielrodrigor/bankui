"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import {
  RecoilRoot,
} from 'recoil';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <RecoilRoot>
        <body>{children}</body>
      </RecoilRoot>
    </html>
  )
}
