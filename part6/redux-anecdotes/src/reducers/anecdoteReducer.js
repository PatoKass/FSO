import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnec, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecs = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdote = state.find((a) => a.id === id)

    const anecdoteWithVote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const updatedAnecdote = await anecdoteService.update(id, anecdoteWithVote)
    const updatedAnecdotes = state.map((a) =>
      a.id !== id ? a : updatedAnecdote.data
    )
    console.log(updatedAnecdotes)
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer
