import axios from 'axios'

const API_URL = '/api/matches'

export const createMatch = async (matchData) => {
  const response = await axios.post(API_URL, matchData)
  return response.data
}

export const reopenMatches = async (matchId) => {
  const response = await axios.post(`${API_URL}/reopen/${matchId}`)
  return response.data
}

export const updateMatch = async (matchId, matchData) => {
  const response = await axios.patch(`${API_URL}/${matchId}`, matchData)
  return response.data
}

export const deleteMatch = async (matchId) => {
  const response = await axios.delete(`${API_URL}/${matchId}`)
  return response.data
}

export const getLandlordMatches = async (landlordId) => {
  const response = await axios.get(`${API_URL}/landlord/${landlordId}`)
  return response.data
}

export const getTenantMatches = async (tenantId) => {
  const response = await axios.get(`${API_URL}/tenant/${tenantId}`)
  return response.data
}
