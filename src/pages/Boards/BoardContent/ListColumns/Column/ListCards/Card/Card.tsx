import { Attachment, Group, Comment } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

const Card = () => {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/382976793_1306468150234625_1735486998639163218_n.jpg?stp=cp6_dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OLzts0-l7tAAX-U_Hfh&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBNx2qgwdhRRMT86qKl1fXnfc80zLyPuf5VWUShaCTenw&oe=65FD3712"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Andrew Lee Dev</Typography>
      </CardContent>
      <CardActions
        sx={{
          p: '0 4px 8px 4px'
        }}
      >
        <Button size="small" startIcon={<Group />}>
          15
        </Button>
        <Button size="small" startIcon={<Comment />}>
          25
        </Button>
        <Button size="small" startIcon={<Attachment />}>
          15
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
