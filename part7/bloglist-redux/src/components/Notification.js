import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const errorStyle = {
    color: 'white',
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'red',
  }

  const successStyle = {
    color: 'white',
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'green',
  }

  if (notification.type === 'error') {
    return (
      <div className="my-4" style={errorStyle}>
        {notification.text}
      </div>
    )
  } else {
    return (
      <div className="my-4" style={successStyle}>
        {notification.text}
      </div>
    )
  }
}

export default Notification
