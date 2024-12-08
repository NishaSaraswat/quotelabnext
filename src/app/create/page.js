'use client'

import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_QUOTE, GET_ALL_QUOTES } from '@/lib/graphql/operations'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function CreateQuote() {
  const [quote, setQuote] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const [createQuote, { loading, error }] = useMutation(CREATE_QUOTE, {
    onCompleted: () => {
      router.push('/')
    },
    refetchQueries: [{ query: GET_ALL_QUOTES }]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createQuote({
      variables: {
        name: quote
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <h1>Create Quote</h1>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea
            placeholder="Write your quote here..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
            style={{ minHeight: '100px', padding: '0.5rem' }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Quote'}
          </button>
        </form>
      </div>
    </div>
  )
}
