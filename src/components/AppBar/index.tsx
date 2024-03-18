import Box from '@mui/material/Box'
import ModeSelect from '@/components/ModeSelect'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '@/assets/icons/trello.svg'
import Typography from '@mui/material/Typography'
import Workspaces from '@/components/AppBar/Menus/Workspaces'
import Recent from '@/components/AppBar/Menus/Recent'
import SearchAppBar from '@/components/AppBar/Search'
import Notification from '@/components/AppBar/Notification'
import Profiles from '@/components/AppBar/Menus/Profiles'
import Helps from '@/components/AppBar/Helps'
import MenuDrawer from '@/components/AppBar/Menus/MenuDrawer'
import Started from '@/components/AppBar/Menus/Started'
import Templates from '@/components/AppBar/Menus/Templates'
import Button from '@mui/material/Button'
import { LibraryAdd } from '@mui/icons-material'

const AppBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.app.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#2980b9')
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <MenuDrawer />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ color: 'white', fontSize: '1.35rem' }}
          />
          <Typography variant="h1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
            TaskFlow
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1
          }}
        >
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
        </Box>
        <Button
          sx={{
            color: 'white'
          }}
          endIcon={<LibraryAdd />}
        >
          Create
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 2
          }}
        >
          <SearchAppBar />
          <ModeSelect />
        </Box>
        <Notification />
        <Helps />
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
