'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@/lib/graphql/operations'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import client from '@/lib/apollo-client'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signinUser.token)
      client.resetStore()  // Clear Apollo cache after login
      router.push('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({
      variables: {
        userSignin: formData
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
