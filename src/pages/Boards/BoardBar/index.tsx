import Box from '@mui/material/Box'

const BoardBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.app.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      ModeBar
    </Box>
  )
}

export default BoardBar
