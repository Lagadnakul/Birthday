import { motion } from 'framer-motion'
import styled from 'styled-components'

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  z-index: 2;
  padding: 1rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    justify-content: center;
  }
  
  @media (max-height: 600px) {
    justify-content: flex-start;
    padding-top: 2rem;
  }
`

const Character = styled(motion.div)`
  font-size: 8rem;
  cursor: pointer;
  user-select: none;
  filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.7));
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 5rem;
  }
  
  @media (max-height: 600px) {
    font-size: 4rem;
  }
  
  @media (hover: none) and (pointer: coarse) {
    transform: scale(1);
    transition: transform 0.2s ease;
    
    &:active {
      transform: scale(0.9);
    }
  }
`

const WelcomeText = styled(motion.h1)`
  color: white;
  font-size: 3rem;
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin: 2rem 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin: 1rem 0;
  }
  
  @media (max-height: 600px) {
    font-size: 1.8rem;
    margin: 0.8rem 0;
  }
`

const SubText = styled(motion.p)`
  color: white;
  font-size: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin: 0.8rem 0;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
  }
  
  @media (max-height: 600px) {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`

const StartButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border: none;
  color: white;
  font-size: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
  margin-top: 2rem;
  min-height: 44px;
  min-width: 120px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.8rem 1.5rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 0.7rem 1.2rem;
    margin-top: 1rem;
    min-height: 48px;
  }
  
  @media (max-height: 600px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
    margin-top: 0.8rem;
  }
  
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.95);
      transition: transform 0.1s ease;
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 105, 180, 0.6);
  }
`

interface CuteCharacterProps {
  onInteraction: () => void
  triggerCelebration: () => void
}

export function CuteCharacter({ onInteraction, triggerCelebration }: CuteCharacterProps) {
  const handleClick = () => {
    triggerCelebration()
    setTimeout(() => {
      onInteraction()
    }, 1000)
  }

  return (
    <CharacterContainer>
      <Character
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.2,
          rotate: 15,
        }}
        whileTap={{
          scale: 0.9
        }}
        onClick={handleClick}
      >
        🐰
      </Character>
      
      <WelcomeText
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hello Beautiful! 💕
      </WelcomeText>
      
      <SubText
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Click the bunny to start your special surprise! 🎉
      </SubText>
      
      <StartButton
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 12px 25px rgba(255, 105, 180, 0.6)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        Start the Magic ✨
      </StartButton>
    </CharacterContainer>
  )
}
