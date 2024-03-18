import Close from '@mui/icons-material/Close'
import Search from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const SearchAppBar = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <TextField
      size="small"
      id="outlined-search"
      label="Search"
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: 'white' }} />
          </InputAdornment>
        ),
        endAdornment: (
          <Close
            onClick={() => setSearchValue('')}
            fontSize="small"
            sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
          />
        )
      }}
      sx={{
        minWidth: 120,
        maxWidth: 180,
        '& label': { color: 'white' },
        '& input': { color: 'white' },
        '& label.Mui-focused': { color: 'white' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white'
          },
          '&:hover fieldset': {
            borderColor: 'white'
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white'
          }
        }
      }}
    />
  )
}

export default SearchAppBar
