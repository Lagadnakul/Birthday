import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import styled from 'styled-components'
import * as THREE from 'three'
import './App.css'
import { BirthdayMessage } from './components/BirthdayMessage'
import { CuteCharacter } from './components/CuteCharacter'
import { FlowerScene } from './components/FlowerScene'
import { MessagePuzzle } from './components/MessagePuzzle'

// Debug logging
console.log('🎂 Birthday App: App.tsx loaded successfully');
console.log('🎂 Birthday App: Three.js version:', THREE.REVISION);
console.log('🎂 Birthday App: All imports loaded successfully');

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 105, 180, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 192, 203, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 182, 193, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, 
      #ff69b4 0%, 
      #ff91c4 15%, 
      #ffc0cb 30%, 
      #ffb6c1 45%, 
      #ff91c4 60%, 
      #ff69b4 75%, 
      #ff1493 90%, 
      #ff69b4 100%
    );
  background-size: 300% 300%, 400% 400%, 200% 200%, 800% 800%;
  animation: 
    gradientShift 8s ease-in-out infinite,
    backgroundFloat 12s ease-in-out infinite,
    colorShift 15s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  @keyframes gradientShift {
    0%, 100% { 
      background-position: 0% 50%, 0% 50%, 0% 50%, 0% 50%; 
    }
    25% { 
      background-position: 25% 75%, 25% 25%, 25% 75%, 25% 50%; 
    }
    50% { 
      background-position: 100% 50%, 100% 100%, 50% 50%, 100% 50%; 
    }
    75% { 
      background-position: 75% 25%, 75% 75%, 75% 25%, 75% 50%; 
    }
  }

  @keyframes backgroundFloat {
    0%, 100% { 
      filter: brightness(1) saturate(1.1) hue-rotate(0deg);
    }
    33% { 
      filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
    }
    66% { 
      filter: brightness(1.05) saturate(1.15) hue-rotate(-5deg);
    }
  }

  @keyframes colorShift {
    0%, 100% { 
      background-blend-mode: normal;
    }
    50% { 
      background-blend-mode: soft-light;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.1) 0%, transparent 40%);
    animation: shimmer 10s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
`;

const FloatingHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Heart = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: #ff1493;
  user-select: none;
  filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.6));
`;

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentView, setCurrentView] = useState<'intro' | 'puzzle' | 'message'>('intro')
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const hearts = Array.from({ length: windowSize.width < 768 ? 12 : 20 }, (_, i) => (
    <Heart
      key={i}
      animate={{
        y: [window.innerHeight + 50, -150],
        x: [
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth
        ],
        opacity: [0, 1, 1, 0.8, 0],
        scale: windowSize.width < 480 ? [0.2, 0.8, 0.7, 0.5, 0.2] : [0.3, 1.2, 1, 0.8, 0.3],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: windowSize.width < 768 ? 6 + Math.random() * 3 : 8 + Math.random() * 4,
        repeat: Infinity,
        delay: i * (windowSize.width < 768 ? 0.3 : 0.4),
        ease: "easeInOut"
      }}
      style={{
        left: Math.random() * 100 + '%',
        top: '100%',
        fontSize: windowSize.width < 480 ? '1.5rem' : '2rem'
      }}
    >
      {i % 4 === 0 ? '💖' : i % 3 === 0 ? '💕' : i % 2 === 0 ? '💗' : '❤️'}
    </Heart>
  ))

  // Add floating petals with mobile optimization
  const petals = Array.from({ length: windowSize.width < 768 ? 8 : 15 }, (_, i) => (
    <motion.div
      key={`petal-${i}`}
      style={{
        position: 'absolute',
        fontSize: windowSize.width < 480 ? '1rem' : '1.5rem',
        color: '#ff69b4',
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.4))'
      }}
      animate={{
        y: [window.innerHeight + 30, -100],
        x: [
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth + Math.sin(i) * (windowSize.width < 768 ? 50 : 100)
        ],
        rotate: [0, windowSize.width < 768 ? 360 : 720],
        opacity: [0, 0.8, 0.6, 0]
      }}
      transition={{
        duration: windowSize.width < 768 ? 8 + Math.random() * 4 : 12 + Math.random() * 6,
        repeat: Infinity,
        delay: i * (windowSize.width < 768 ? 0.6 : 0.8),
        ease: "linear"
      }}
    >
      {i % 3 === 0 ? '🌸' : i % 2 === 0 ? '🌺' : '🌼'}
    </motion.div>
  ))

  return (
    <AppContainer>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          colors={['#ff69b4', '#ffc0cb', '#ffb6c1', '#ff1493', '#fff']}
        />
      )}
      
      <FloatingHearts>
        {hearts}
        {petals}
      </FloatingHearts>

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ 
          position: [0, 0, 5], 
          fov: windowSize.width < 768 ? 70 : 60,
          near: 0.1,
          far: 100
        }}
        shadows={windowSize.width >= 768}
        gl={{ 
          antialias: windowSize.width >= 768,
          alpha: true,
          powerPreference: windowSize.width < 768 ? "default" : "high-performance"
        }}
        onCreated={({ gl, camera }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, windowSize.width < 768 ? 1.5 : 2))
          gl.setClearColor('#000000', 0)
          
          if (windowSize.width >= 768) {
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }
          
          // Smooth camera animation with mobile optimization
          const animateCamera = () => {
            const time = Date.now() * 0.0005
            const intensity = windowSize.width < 768 ? 0.3 : 0.5
            camera.position.x = Math.sin(time * 0.3) * intensity
            camera.position.y = Math.sin(time * 0.2) * (intensity * 0.6)
            camera.position.z = 5 + Math.sin(time * 0.1) * (intensity * 0.8)
            camera.lookAt(0, 0, 0)
            requestAnimationFrame(animateCamera)
          }
          animateCamera()
        }}
      >
        <FlowerScene />
      </Canvas>

      <AnimatePresence mode="wait">
        {currentView === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <CuteCharacter 
              onInteraction={() => setCurrentView('puzzle')} 
              triggerCelebration={triggerCelebration}
            />
          </motion.div>
        )}

        {currentView === 'puzzle' && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <MessagePuzzle 
              onComplete={() => setCurrentView('message')}
              triggerCelebration={triggerCelebration}
            />
          </motion.div>
        )}

        {currentView === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <BirthdayMessage 
              triggerCelebration={triggerCelebration}
              onRestart={() => setCurrentView('intro')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AppContainer>
  )
}

export default App
