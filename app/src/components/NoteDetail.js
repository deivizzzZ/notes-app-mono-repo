const NoteDetail = ({ note }) => (
  <div>
    <h2>{note.content}</h2>
    <p>Created by {note.user.name}</p>
    <p>
      <strong>{note.important ? 'THIS IS IMPORTANT' : ''}</strong>
    </p>
  </div>
)

export default NoteDetail
