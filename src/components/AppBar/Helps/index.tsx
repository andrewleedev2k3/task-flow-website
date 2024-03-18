import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
const Helps = () => {
  return (
    <Tooltip title="Helps">
      <Badge color="secondary" sx={{ cursor: 'pointer', color: 'white' }}>
        <HelpOutlineIcon />
      </Badge>
    </Tooltip>
  )
}

export default Helps
