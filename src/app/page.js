'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/proxy/test')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Next.js + Flask Integration</h1>
      
      {loading ? (
        <p className={styles.loading}>Loading data...</p>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <pre className={styles.pre}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}