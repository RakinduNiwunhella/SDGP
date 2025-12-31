import { useState } from 'react'
import { supabase } from '../supabaseClient'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [passwordLengthError, setPasswordLengthError] = useState('')

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const validatePasswords = (pass, confirm) => {
    if (pass.length > 0 && pass.length < 6) {
      setPasswordLengthError('Password must be at least 6 characters')
    } else {
      setPasswordLengthError('')
    }

    if (confirm && pass !== confirm) {
      setPasswordError('Passwords do not match')
    } else {
      setPasswordError('')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (emailError || passwordError || passwordLengthError) {
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      alert(error.message)
    } else {
      setSuccessMessage('Account created successfully. Please check your email to confirm.')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFullName('')
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSignup}
      className="space-y-6 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Get started in seconds
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            validateEmail(e.target.value)
          }}
          required
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none
            ${emailError
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'}
          `}
        />
        {emailError && (
          <p className="text-xs text-red-600 dark:text-red-400">{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            validatePasswords(e.target.value, confirmPassword)
          }}
          required
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none
            ${passwordLengthError
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'}
          `}
        />
        {passwordLengthError && (
          <p className="text-xs text-red-600 dark:text-red-400">{passwordLengthError}</p>
        )}

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            validatePasswords(password, e.target.value)
          }}
          required
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none
            ${passwordError
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'}
          `}
        />
        {passwordError && (
          <p className="text-xs text-red-600 dark:text-red-400">{passwordError}</p>
        )}
      </div>

      {successMessage && (
        <p className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/40 rounded-lg px-4 py-2">
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 dark:bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 dark:hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Signup