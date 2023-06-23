import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import NotifContext from '../notifContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [, dispatch] = useContext(NotifContext)

  const queryClient = useQueryClient()
  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({
        type: 'ERROR',
        payload: 'too short anecdote, must have length 5 or more',
      })
    },
  })

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'ADD', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnec}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
