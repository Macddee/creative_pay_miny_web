import React from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }
  return (
    <div>
        Welcome {auth.user.name} {}
        <button onClick={handleLogout}> logout </button>
    </div>
  )
}
