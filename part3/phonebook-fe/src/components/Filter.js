const Filter = ({value, onChange}) => {
  return (
      <div>
        <div>
          <input value={value} onChange={onChange}/>
        </div>
      </div>
    )
  }

export default Filter