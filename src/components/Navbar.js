'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/">QuoteLab</Link>
        <div>
          {token ? (
            <>
              <Link href="/create" style={{ marginRight: '1rem' }}>Create Quote</Link>
              <Link href="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
