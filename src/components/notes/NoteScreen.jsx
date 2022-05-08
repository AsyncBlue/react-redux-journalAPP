import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  const { active: note } = useSelector(state => state.notes)

  const [formValues, handleInputChange, reset] = useForm(note)

  const dispatch = useDispatch()

  const activeId = useRef(note.id)
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  const { body, title } = formValues

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [formValues, dispatch])

  const handleDelete = () => {
    dispatch(startDeleting(note.id))
  }

  return (
    <div className='notes__main-content'>

      <NotesAppBar />

      <div className='notes__content'>

        <input
          type='text'
          placeholder='some awesome title'
          className='notes__title-input'
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder='what happend today'
          className='notes__textarea'
          value={body}
          name='body'
          onChange={handleInputChange}
        />

        {
            (note.url) &&
              <img
                src={note.url}
                alt='imagen'
                className='notes__image'
              />
        }

      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>

    </div>
  )
}
