import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotifContext from './notifContext'
import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnec } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation(updateAnec, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const notifReducer = (state, action) => {
    switch (action.type) {
      case 'VOTE':
        return (state = `you voted for ${action.payload}`)
      case 'ADD':
        return (state = `you added a new anecdote: ${action.payload} `)
      case 'CLEAR':
        return (state = '')
      case 'ERROR':
        return (state = action.payload)
      default:
        return state
    }
  }

  const [notif, notifDispatch] = useReducer(notifReducer, '')

  const { isLoading, isError, data } = useQuery('anecdotes', getAnecdotes, {
    retry: false,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return (
      <span>
        <strong>
          Anecdote service is not available due to problems in the server
        </strong>
      </span>
    )
  }

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notifDispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        {notif && <Notification />}
        <AnecdoteForm />

        {data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  )
}

export default App
