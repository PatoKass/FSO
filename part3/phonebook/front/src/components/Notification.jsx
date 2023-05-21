const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message.type === 'error' ? (
        <div key="92935" className="message--error">
          {message.text}
        </div>
      ) : (
        <div key="435384" className="message--success">
          {message.text}
        </div>
      )}
    </div>
  )
}

export default Notification
