import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
const Notification = () => {
  return (
    <Tooltip title="Notification">
      <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
        <NotificationsNoneIcon sx={{ color: 'white' }} />
      </Badge>
    </Tooltip>
  )
}

export default Notification
