import { useContext } from 'react'
import notifContext from '../notifContext'

const Notification = () => {
  const [notif] = useContext(notifContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={style}>{notif}</div>
}

export default Notification
