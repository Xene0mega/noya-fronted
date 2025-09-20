// src/components/auth/LoginForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '@/lib/api'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', { email, password })
      const token = res.data.token
      localStorage.setItem('token', token)   // stockage du token
      setToken(token)                        // configure axios
      navigate('/')                          // redirige vers le dashboard
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Connexion</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}

      <label className="block mb-3">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm">Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded"
        />
      </label>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-white rounded"
        disabled={loading}
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  )
}
