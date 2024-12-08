'use client'

import { useQuery } from '@apollo/client'
import { GET_MY_PROFILE } from '@/lib/graphql/operations'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function Profile() {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_MY_PROFILE)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h1 className="center-align">Profile</h1>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <img className="circle responsive-img" src={`https://robohash.org/${data.myprofile.firstName}.png?size=200x200`} alt="pic" style={{ border: '3px solid lightgray', padding: '5px', borderRadius: '50%', width: '100%', maxWidth: '200px' }} />
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h2 className="center-align">{data?.myprofile.firstName} {data?.myprofile.lastName}</h2>
            <p className="center-align">Email: {data?.myprofile.email}</p>
          </div>
        </div>
        <div className="section">
          <h3 className="center-align">My Quotes</h3>
          <div className="row">
            {data?.myprofile.quotes.map((quote, index) => (
              <div key={index} className="col s12 m6 offset-m3">
                <div className="card">
                  <div className="card-content">
                    <p>{quote.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
