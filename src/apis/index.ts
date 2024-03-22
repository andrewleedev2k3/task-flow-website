import { API_ROOT } from '@/utils/constants'
import axios from 'axios'

export const fetchBoardDetailsAPI = async (boardId: string) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}
