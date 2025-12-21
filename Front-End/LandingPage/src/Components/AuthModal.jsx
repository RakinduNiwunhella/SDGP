import { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'

function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('signin')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8 text-gray-900 dark:text-gray-100">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        {mode === 'signin' ? <Signin /> : <Signup />}

        <div className="mt-4 text-center text-sm">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-green-700 dark:text-green-400 font-semibold"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-green-700 dark:text-green-400 font-semibold"
              >
                Sign in
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default AuthModal