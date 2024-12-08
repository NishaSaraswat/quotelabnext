'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER } from '@/lib/graphql/operations'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const router = useRouter()

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: () => {
      router.push('/login')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser({
      variables: {
        userNew: formData
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h1>Sign Up</h1>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
