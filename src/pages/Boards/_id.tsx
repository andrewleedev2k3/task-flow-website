import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Board, Card, Column } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '@/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '@/utils/formatters'
import { mapOrder } from '@/utils/sort'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
const Board = () => {
  const [board, setBoard] = useState<Board | null>(null)
  useEffect(() => {
    const boardId = '65fd188ba8dd657557ab01ad'

    fetchBoardDetailsAPI(boardId).then((board) => {
      if (board) {
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      }
      const data = board as Board
      data.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData: any) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board?._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = {
      ...board
    } as Board
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData: any) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board?._id
    })
    const newBoard = {
      ...board
    } as Board

    const columnToUpdate = newBoard.columns.find((col) => col._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns: Column[]) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((col) => col._id)
    const newBoard = {
      ...board
    } as Board
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
    setBoard(newBoard)
  }

  const moveCardInTheSameColumn = (
    dndOrderedCards: Card[],
    dndOrderedCardIds: string[],
    columnId: string
  ) => {
    const newBoard = {
      ...board
    } as Board

    const columnToUpdate = newBoard.columns.find((col) => col._id === columnId)

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board as Board} />
      <BoardContent
        board={board as Board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
      />
    </Container>
  )
}

export default Board
