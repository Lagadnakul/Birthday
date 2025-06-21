import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const PuzzleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 2;
`

const Title = styled(motion.h1)`
  color: white;
  font-size: 2.5rem;
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
`

const PuzzleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`

const PuzzlePiece = styled(motion.button)<{ isCorrect: boolean; isRevealed: boolean }>`
  width: 120px;
  height: 120px;
  background: ${props => 
    props.isRevealed 
      ? props.isCorrect 
        ? 'linear-gradient(45deg, #ff69b4, #ff1493)' 
        : 'linear-gradient(45deg, #98fb98, #90ee90)'
      : 'linear-gradient(45deg, #dda0dd, #da70d6)'
  };
  border: 3px solid white;
  border-radius: 20px;
  color: white;
  font-size: ${props => props.isRevealed ? '2.5rem' : '1.2rem'};
  font-family: 'Comic Sans MS', cursive;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const Hint = styled(motion.p)`
  color: white;
  font-size: 1.3rem;
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 500px;
`

const ProgressBar = styled.div`
  width: 300px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff69b4, #ff1493);
  border-radius: 10px;
`

interface MessagePuzzleProps {
  onComplete: () => void
  triggerCelebration: () => void
}

interface PuzzlePiece {
  id: number
  question: string
  answer: string
  emoji: string
  hint: string
}

const puzzlePieces: PuzzlePiece[] = [
  {
    id: 1,
    question: "What makes you smile the brightest?",
    answer: "Your friendship",
    emoji: "😊",
    hint: "Think about our amazing bond!"
  },
  {
    id: 2,
    question: "What's your superpower?",
    answer: "Being amazing",
    emoji: "⭐",
    hint: "You're absolutely incredible!"
  },
  {
    id: 3,
    question: "What day is today?",
    answer: "Your special day",
    emoji: "🎂",
    hint: "It's all about celebrating YOU!"
  },
  {
    id: 4,
    question: "Who deserves all the happiness?",
    answer: "Beautiful Mansi",
    emoji: "💖",
    hint: "The birthday queen herself!"
  },
  {
    id: 5,
    question: "What makes this day perfect?",
    answer: "Your birthday",
    emoji: "🎉",
    hint: "Celebrating another year of awesome!"
  },
  {
    id: 6,
    question: "What's the best gift today?",
    answer: "Your smile",
    emoji: "🎁",
    hint: "Nothing beats your beautiful smile!"
  },
  {
    id: 7,
    question: "Who lights up every room?",
    answer: "You do",
    emoji: "✨",
    hint: "Your presence is magical!"
  },
  {
    id: 8,
    question: "What should today be filled with?",
    answer: "Joy and love",
    emoji: "💕",
    hint: "All the best things for you!"
  },
  {
    id: 9,
    question: "What do you deserve today?",
    answer: "Everything wonderful",
    emoji: "🌟",
    hint: "You deserve the world and more!"
  }
]

export function MessagePuzzle({ onComplete, triggerCelebration }: MessagePuzzleProps) {
  const [currentPiece, setCurrentPiece] = useState(0)
  const [revealedPieces, setRevealedPieces] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (revealedPieces.length === puzzlePieces.length) {
      triggerCelebration()
      setTimeout(() => {
        onComplete()
      }, 3000)
    }
  }, [revealedPieces, onComplete, triggerCelebration])

  const handlePieceClick = (pieceId: number) => {
    if (pieceId === currentPiece + 1 && !revealedPieces.includes(pieceId)) {
      setRevealedPieces([...revealedPieces, pieceId])
      setCurrentPiece(currentPiece + 1)
      setShowHint(false)
      triggerCelebration()
    }
  }

  const handleShowHint = () => {
    setShowHint(true)
  }

  const progress = (revealedPieces.length / puzzlePieces.length) * 100

  return (
    <PuzzleContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Unlock Mansi's Birthday Message! 🎁
      </Title>

      <ProgressBar>
        <Progress
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>

      <motion.p
        style={{ 
          color: 'white', 
          fontSize: '1.1rem', 
          fontFamily: 'Comic Sans MS, cursive',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click the pieces in order to reveal the message! ✨
      </motion.p>

      <PuzzleGrid>
        {puzzlePieces.map((piece) => (
          <PuzzlePiece
            key={piece.id}
            isCorrect={piece.id === currentPiece + 1}
            isRevealed={revealedPieces.includes(piece.id)}
            onClick={() => handlePieceClick(piece.id)}
            disabled={revealedPieces.includes(piece.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: piece.id * 0.1 }}
          >
            {revealedPieces.includes(piece.id) ? piece.emoji : piece.question}
          </PuzzlePiece>
        ))}
      </PuzzleGrid>

      {currentPiece < puzzlePieces.length && (
        <motion.button
          onClick={handleShowHint}
          style={{
            background: 'linear-gradient(45deg, #dda0dd, #da70d6)',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'Comic Sans MS, cursive',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            marginTop: '1rem'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Need a hint? 💡
        </motion.button>
      )}

      <AnimatePresence>
        {showHint && currentPiece < puzzlePieces.length && (
          <Hint
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            💭 {puzzlePieces[currentPiece].hint}
          </Hint>
        )}
      </AnimatePresence>

      {revealedPieces.length === puzzlePieces.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            color: 'white',
            fontSize: '2rem',
            fontFamily: 'Comic Sans MS, cursive',
            textAlign: 'center',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
            marginTop: '2rem'
          }}
        >
          🎉 Puzzle Complete! Getting your special message ready... 🎉
        </motion.div>
      )}
    </PuzzleContainer>
  )
}
