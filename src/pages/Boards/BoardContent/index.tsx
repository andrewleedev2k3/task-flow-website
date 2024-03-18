import Box from '@mui/material/Box'

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.app.appBarHeight} - ${theme.app.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db')
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent
