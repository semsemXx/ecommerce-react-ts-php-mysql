import React from 'react'
import Image from '../Assets/Images/imageDesgin.jpg'

export default function Design() {
  return (
    <div style={{
      backgroundColor: '#1a1a1a', // Tan/kraft paper color
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img src={Image} alt="Wassim Guidara Engineer Package" style={{height:'100vh', width:'auto'}} />
    </div>
  )
}