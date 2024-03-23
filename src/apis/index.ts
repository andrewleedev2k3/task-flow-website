import { API_ROOT } from '@/utils/constants'
import axios from 'axios'

export const fetchBoardDetailsAPI = async (boardId: string) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}

export const createNewColumnAPI = async (data: any) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, data)
  return request.data
}

export const createNewCardAPI = async (data: any) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, data)
  return request.data
}

export const updateBoardDetailsAPI = async (boardId: string, data: any) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, data)
  return request.data
}

export const updateColumnDetailsAPI = async (columnId: string, data: any) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, data)
  return request.data
}

export const moveCardToDifferentColumnAPI = async (data: any) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving-card`, data)
  return request.data
}
