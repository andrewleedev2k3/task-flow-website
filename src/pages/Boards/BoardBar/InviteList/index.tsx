import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

const InviteList = () => {
  return (
    <AvatarGroup
      max={4}
      sx={{
        gap: '10px',
        '& .MuiAvatar-root': {
          width: 34,
          height: 34,
          fontSize: 16,
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          '&:first-of-type': {
            bgcolor: '#a4b0be'
          }
        }
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Tooltip key={item} title="Andrew Lee">
          <Avatar
            alt="Remy Sharp"
            src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/431644265_1396774701203969_6084150960102337619_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OI5lesDtqqoAX_OmGoy&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAY2GyB635I4ZuWq6-DnNI5qz7NomxRe_qovMNNNxlmJg&oe=65FCD1D3"
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}
export default InviteList
