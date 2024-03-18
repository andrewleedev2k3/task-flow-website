import Dashboard from '@mui/icons-material/Dashboard'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { AddToDrive, Bolt, FilterList, PersonAdd, VpnLock } from '@mui/icons-material'
import InviteList from '@/pages/Boards/BoardBar/InviteList'
import { Button } from '@mui/material'
const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: 2,
  borderRadius: 2,
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
const BoardBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.app.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid #bbbbba'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Chip sx={MENU_STYLE} icon={<Dashboard />} label="Andrew Lee Developer" clickable />
        <Chip sx={MENU_STYLE} icon={<VpnLock />} label="Public/Private Workspaces" clickable />
        <Chip sx={MENU_STYLE} icon={<AddToDrive />} label="Public/Private Workspaces" clickable />
        <Chip sx={MENU_STYLE} icon={<Bolt />} label="Automation" clickable />
        <Chip sx={MENU_STYLE} icon={<FilterList />} label="Filter" clickable />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Button variant="outlined" startIcon={<PersonAdd />}>
          Invite
        </Button>
        <InviteList />
      </Box>
    </Box>
  )
}

export default BoardBar
