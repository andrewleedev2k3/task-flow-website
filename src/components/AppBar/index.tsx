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
const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.app.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto'
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
            sx={{ color: 'primary.main', fontSize: '1.35rem' }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}
          >
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
