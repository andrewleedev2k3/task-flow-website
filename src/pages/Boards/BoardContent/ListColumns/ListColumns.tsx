import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAdd from '@mui/icons-material/NoteAdd'
import { Column as TypeColumn } from '@/types/board'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Close from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

const ListColumns = ({
  columns,
  createNewColumn,
  createNewCard,
  deleteColumnDetails
}: {
  columns: TypeColumn[]
  createNewColumn: any
  createNewCard: any
  deleteColumnDetails: any
}) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const handleAddNewColumn = () => {
    if (!value) {
      toast.error('Please enter column title')
      return
    }

    const newColumnData = {
      title: value
    }

    createNewColumn(newColumnData)

    toggleOpenNewColumnForm()
    setValue('')
  }
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            mx: 2
          }
        }}
      >
        {columns.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
        ))}
        <Box
          sx={{
            minWidth: 250,
            maxWidth: 250,
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
        >
          {openNewColumnForm ? (
            <Box
              sx={{
                borderRadius: '6px',
                p: 1,
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <TextField
                size="small"
                label="Enter column title..."
                type="text"
                variant="outlined"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }
                  }}
                  onClick={handleAddNewColumn}
                >
                  Add Column
                </Button>
                <Close
                  onClick={toggleOpenNewColumnForm}
                  fontSize="small"
                  sx={{
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      color: (theme) => theme.palette.error.light
                    }
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Button
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1.2
              }}
              startIcon={<NoteAdd />}
              onClick={toggleOpenNewColumnForm}
            >
              Add new column
            </Button>
          )}
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
