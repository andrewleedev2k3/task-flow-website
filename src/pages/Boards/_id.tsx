import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Board, Column } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI
} from '@/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '@/utils/formatters'
const Board = () => {
  const [board, setBoard] = useState<Board | null>(null)
  useEffect(() => {
    const boardId = '65fd188ba8dd657557ab01ad'
    fetchBoardDetailsAPI(boardId).then((board) => {
      const data = board as Board
      data.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board as Board} />
      <BoardContent
        board={board as Board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
