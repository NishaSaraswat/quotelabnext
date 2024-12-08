'use client'

import { useQuery } from '@apollo/client'
import { GET_USER_PROFILE } from '@/lib/graphql/operations'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { use } from 'react'

export default function UserProfile({ params }) {
  // Properly unwrap params using React.use()
  const id = use(params).id

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { _id: id },
    fetchPolicy: 'cache-and-network' // This ensures we get cached data first, then update from network
  })

  if (loading && !data) return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    </div>
  )
  
  if (error) return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      </div>
    </div>
  )

  const user = data?.user

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h1 className="center-align">User Profile</h1>
        {user && (
          <>
            <div className="row">
              <div className="col s12" style={{ textAlign: 'center' }}>
                <img 
                  src={`https://robohash.org/${user.firstName}.png?size=200x200`}
                  alt={`${user.firstName}'s profile`}
                  style={{
                    border: '3px solid lightgray',
                    padding: '5px',
                    borderRadius: '50%',
                    width: '100%',
                    maxWidth: '200px',
                    margin: '1rem auto',
                    display: 'block'
                  }}
                />
                <h2 style={{ marginTop: '1rem' }}>{user.firstName} {user.lastName}</h2>
                <p>Email: {user.email}</p>
              </div>
            </div>
            <div className="section">
              <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>User's Quotes</h3>
              {user.quotes.map((quote, index) => (
                <div key={index} className="card" style={{ marginTop: '1rem' }}>
                  <div className="card-content">
                    <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>{quote.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
