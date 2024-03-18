import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import SearchAppBar from '@/components/AppBar/Search'
import ModeSelect from '@/components/ModeSelect'
import Recent from '@/components/AppBar/Menus/Recent'
import Workspaces from '@/components/AppBar/Menus/Workspaces'
import Started from '@/components/AppBar/Menus/Started'
import Templates from '@/components/AppBar/Menus/Templates'

const MenuDrawer = () => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 300 }}>
      <List>
        <ListItem>
          <SearchAppBar />
        </ListItem>
        <ListItem>
          <ModeSelect />
        </ListItem>
        <ListItem>
          <Workspaces />
        </ListItem>
        <ListItem>
          <Recent />
        </ListItem>
        <ListItem>
          <Started />
        </ListItem>
        <ListItem>
          <Templates />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          padding: 1,
          minWidth: 0,
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center'
        }}
      >
        <MenuIcon sx={{ color: 'primary.main' }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )
}

export default MenuDrawer
