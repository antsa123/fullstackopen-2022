const PersonForm = ({name, number, onNameChange, onNumberChange, onSubmit}) => {
    return (
      <div>
          <form onSubmit={onSubmit}>
            <div>
              Name: <input value={name} onChange={onNameChange}/>
            </div>
            <div>
              Number: <input value={number} onChange={onNumberChange}/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
      </div>
  )
}

export default PersonForm