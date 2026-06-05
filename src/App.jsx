import React from 'react'
import MaintenanceCanvas from './components/MaintenanceCanvas'
import InteractiveCard from './components/InteractiveCard'

export default function App() {
  return (
    <main className="app-container">
      {/* Background shifting techno grid */}
      <div className="grid-overlay" />

      {/* 3D Interactive WebGL Canvas */}
      <MaintenanceCanvas />

      {/* Content card centered on screen */}
      <div className="content-wrapper">
        <InteractiveCard />
      </div>
    </main>
  )
}
