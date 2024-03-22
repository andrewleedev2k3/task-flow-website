import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Board } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '@/apis'
const Board = () => {
  const [board, setBoard] = useState<Board | null>(null)
  useEffect(() => {
    const boardId = '65fd188ba8dd657557ab01d'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board as Board} />
      <BoardContent board={board as Board} />
    </Container>
  )
}

export default Board
