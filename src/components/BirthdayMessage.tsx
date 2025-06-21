import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: flex-start;
    padding-top: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    padding-top: 1rem;
  }
  
  @media (max-height: 600px) {
    justify-content: flex-start;
    padding-top: 1rem;
  }
`

const MessageCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 192, 203, 0.8));
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  text-align: center;
  border: 3px solid white;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
    max-width: 90vw;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 15px;
    max-width: 95vw;
    border: 2px solid white;
  }
  
  @media (max-height: 600px) {
    padding: 1.5rem;
    max-height: 80vh;
    overflow-y: auto;
  }
`

const MessageTitle = styled(motion.h1)`
  color: #ff1493;
  font-size: 3rem;
  font-family: 'Comic Sans MS', cursive;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  @media (max-height: 600px) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
`

const MessageText = styled(motion.p)`
  color: #ff1493;
  font-size: 1.3rem;
  font-family: 'Comic Sans MS', cursive;
  line-height: 1.6;
  margin: 1rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0.8rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0.6rem 0;
    line-height: 1.5;
  }
  
  @media (max-height: 600px) {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
`

const EmojiRow = styled(motion.div)`
  font-size: 2rem;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    gap: 0.8rem;
    margin: 0.8rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    gap: 0.6rem;
    margin: 0.6rem 0;
    flex-wrap: wrap;
  }
  
  @media (max-height: 600px) {
    font-size: 1.3rem;
    margin: 0.5rem 0;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border: none;
  color: white;
  font-size: 1.1rem;
  font-family: 'Comic Sans MS', cursive;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(255, 105, 180, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 105, 180, 0.6);
  }
`

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  pointer-events: none;
  z-index: 1;
`

interface BirthdayMessageProps {
  triggerCelebration: () => void
  onRestart: () => void
}

const birthdayMessages = [
  {
    title: "Happy Birthday, Mansi! 🎉",
    content: "Today is all about celebrating the amazing, wonderful, absolutely incredible person you are! Your friendship means the world to me, and I'm so grateful to have you in my life.",
    emojis: ["🎂", "🎁", "🌟", "💖", "🎊"]
  },
  {
    title: "You're Absolutely Amazing! ⭐",
    content: "Every day with you as a friend is a gift! Your kindness, your laughter, your beautiful heart - everything about you makes the world a brighter place. I hope your special day is filled with all the joy you bring to others!",
    emojis: ["✨", "🌈", "💕", "🦋", "🌸"]
  },
  {
    title: "Wishing You Magic! 🪄",
    content: "May this new year of your life be filled with endless adventures, beautiful moments, amazing surprises, and all the happiness your heart can hold. You deserve every wonderful thing life has to offer!",
    emojis: ["🎪", "🎨", "🌺", "🎭", "🎪"]
  },
  {
    title: "Best Friend Forever! 💝",
    content: "Thank you for being the most incredible best friend anyone could ask for. Your support, your hugs, your silly jokes, and your caring heart make every day better. Here's to many more years of friendship and fun!",
    emojis: ["👯‍♀️", "💫", "🌻", "🎈", "🥳"]
  }
]

export function BirthdayMessage({ triggerCelebration, onRestart }: BirthdayMessageProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showFloatingEmojis, setShowFloatingEmojis] = useState(false)

  useEffect(() => {
    triggerCelebration()
    setShowFloatingEmojis(true)
  }, [triggerCelebration])

  const nextMessage = () => {
    if (currentMessage < birthdayMessages.length - 1) {
      setCurrentMessage(currentMessage + 1)
      triggerCelebration()
    }
  }

  const prevMessage = () => {
    if (currentMessage > 0) {
      setCurrentMessage(currentMessage - 1)
    }
  }

  const floatingEmojis = ['🎂', '🎉', '🎁', '💖', '🌟', '🎊', '✨', '🌈', '💕', '🦋']

  return (
    <MessageContainer>
      {showFloatingEmojis && (
        <>
          {floatingEmojis.map((emoji, index) => (
            <FloatingEmoji
              key={index}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
                opacity: 0
              }}
              animate={{
                y: -100,
                rotate: 360,
                opacity: [0, 1, 1, 0],
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </FloatingEmoji>
          ))}
        </>
      )}

      <AnimatePresence mode="wait">
        <MessageCard
          key={currentMessage}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <MessageTitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {birthdayMessages[currentMessage].title}
          </MessageTitle>

          <EmojiRow
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {birthdayMessages[currentMessage].emojis.map((emoji, index) => (
              <motion.span
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </EmojiRow>

          <MessageText
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {birthdayMessages[currentMessage].content}
          </MessageText>

          <ActionButtons>
            {currentMessage > 0 && (
              <ActionButton
                onClick={prevMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                ← Previous Message
              </ActionButton>
            )}

            {currentMessage < birthdayMessages.length - 1 ? (
              <ActionButton
                onClick={nextMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Next Message →
              </ActionButton>
            ) : (
              <ActionButton
                onClick={onRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ background: 'linear-gradient(45deg, #32cd32, #228b22)' }}
              >
                🔄 Start Over
              </ActionButton>
            )}
          </ActionButtons>
        </MessageCard>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          color: 'white',
          fontSize: '1rem',
          fontFamily: 'Comic Sans MS, cursive',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}
      >
        💖 Made with love for the most amazing best friend! 💖
      </motion.div>
    </MessageContainer>
  )
}
