import React from 'react'
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-6'>
      <div className='text-center space-y-6'>
        <h1 className='text-6xl font-bold text-gray-900'>404</h1>
        <p className='text-xl text-gray-600'>Page Not Found</p>

        <div className='flex gap-4 justify-center pt-4'>
          <Link to="/" className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'>Go Home</Link>
          <Link to="/notes" className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'>View Notes</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound