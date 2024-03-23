import { Card as TypeCard } from '@/types/board'
import Card from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'

const ListCards = ({ cards }: { cards: TypeCard[] }) => (
  <SortableContext items={cards?.map((card) => card._id)} strategy={verticalListSortingStrategy}>
    <Box
      sx={{
        p: '0 5px 5px 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowy: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.app.boardContentHeight} - ${theme.spacing(5)} - ${theme.app.columnHeaderHeight} - ${theme.app.columnFooterHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}
    >
      {cards.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  </SortableContext>
)

export default ListCards
