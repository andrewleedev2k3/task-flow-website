import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAdd from '@mui/icons-material/NoteAdd'
import { Column as TypeColumn } from '@/apis/mock-data'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const ListColumns = ({ columns }: { columns: TypeColumn[] }) => {
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            mx: 2
          }
        }}
      >
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        <Box
          sx={{
            minWidth: 200,
            maxWidth: 200,
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
        >
          <Button
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1.2
            }}
            startIcon={<NoteAdd />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
