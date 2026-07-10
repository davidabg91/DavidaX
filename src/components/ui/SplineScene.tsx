'use client'

import { useState, Suspense } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!isLoaded && (
        <div className="hero-robot-fallback" style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
          <span className="loader"></span>
        </div>
      )}
      <Suspense 
        fallback={
          <div className="hero-robot-fallback">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
        />
      </Suspense>
    </div>
  )
}
