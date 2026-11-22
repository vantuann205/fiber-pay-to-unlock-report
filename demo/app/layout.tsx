import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CKB Field Notes · Fiber Testnet',
  description: 'Pay to unlock an encrypted CKB Testnet research brief with Fiber.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
