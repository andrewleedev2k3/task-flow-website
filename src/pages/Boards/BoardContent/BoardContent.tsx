import Box from '@mui/material/Box'
import ListColumns from '@/pages/Boards/BoardContent/ListColumns/ListColumns'
import { Board, Column } from '@/apis/mock-data'
import { mapOrder } from '@/utils/sort'
interface IBoardContent {
  board: Board
}
const BoardContent = ({ board }: IBoardContent) => {
  const orderedColumns = mapOrder<Column>(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.app.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db'),
        p: '10px 0'
      }}
    >
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
