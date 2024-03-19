import Box from '@mui/material/Box'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import Button from '@mui/material/Button'
import NoteAdd from '@mui/icons-material/NoteAdd'

const ListColumns = () => {
  return (
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
      <Column />
      <Column />
      <Column />
      <Column />
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
  )
}

export default ListColumns
