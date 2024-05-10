import React from 'react'

const Skeleton = () => {
  return (
    <>
    <div class="flex flex-col gap-2 pt-4">
			<div className="w-3/5 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.2}}></div>
			<div className="w-5/6 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.25}}></div>
			<div className="w-3/4 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.3}}></div>
			<div className="w-full h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.35}}></div>
			<div className="w-3/5 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.4}}></div>
			<div className="w-3/4 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.45}}></div>
			<div className="w-full h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.5}}></div>
			<div className="w-11/12 h-5 bg-gray-300 rounded-2xl animate-pulse" style={{animationDelay:0.55}}></div>
		</div>
    </>
  )
}

export default Skeleton