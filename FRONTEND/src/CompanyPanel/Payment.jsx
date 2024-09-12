import React from 'react'

const payment = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className="relative flex flex-col rounded-lg border-2 border-indigo-500 p-6 bg-white max-w-xs mt-4">
  <div className="absolute left-0 right-0 -top-6 flex justify-center">
    <span className="flex items-center justify-center rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
  </div>
  <div className="text-center mb-2 text-2xl font-bold text-gray-900">Team</div>
  <p className="text-center text-gray-500 mb-8">Advanced features for Individuals and organizations</p>
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Unlimited file storage</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>10 GB bandwidth per month</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>10,000 tasks per month</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Email support</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>100 Webhooks</span>
    </div>
  </div>
  <div className="mt-auto flex flex-col gap-8">
    <div className="flex items-end justify-center gap-1">
      <span className="text-gray-600">$</span>
      <span className="text-3xl font-bold text-gray-900">19</span>
      <span className="text-gray-500">/month</span>
    </div>
    <a href="#" className="block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white transition-colors duration-100 hover:bg-indigo-600 active:bg-indigo-700">Continue with Team</a>
  </div>
</div>

    </div>
  )
}

export default payment
