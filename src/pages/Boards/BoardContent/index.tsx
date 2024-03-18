import Box from '@mui/material/Box'

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.app.appBarHeight} - ${theme.app.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent