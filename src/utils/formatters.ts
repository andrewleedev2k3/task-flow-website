import { Column } from '@/types/board'

export const generatePlaceholderCard = (column: Column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
