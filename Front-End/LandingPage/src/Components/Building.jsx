import { Link } from 'react-router-dom'

const Building = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <div className="max-w-md text-center space-y-6">

        <h1 className="text-3xl font-bold">
          RiceVision System Under Development
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed">
          Our platform is currently being enhanced to deliver accurate,
          data-driven insights for smart agricultural monitoring.
          We appreciate your patience as we complete the system.
        </p>

        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>

      </div>
    </div>
  )
}

export default Building