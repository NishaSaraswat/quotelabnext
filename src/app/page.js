'use client'

import { useQuery } from '@apollo/client'
import { GET_ALL_QUOTES } from '@/lib/graphql/operations'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>All Quotes</h1>
        {data?.quotes.map((quote, index) => (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '70%' }}>
            <p style={{ flex: 1, textAlign: 'center' }}>{quote.name}</p>
            <Link href={`/profile/${quote.by._id}`} style={{ marginLeft: 'auto' }}>
              ~{quote.by.firstName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
