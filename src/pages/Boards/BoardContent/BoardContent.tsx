import Box from '@mui/material/Box'
import ListColumns from '@/pages/Boards/BoardContent/ListColumns/ListColumns'

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.app.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db'),
        p: '10px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
