'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={null}>
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
