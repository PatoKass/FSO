import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecs } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecs())
  }, [dispatch])

  return (
    <div>
      {notification && <Notification />}
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App
