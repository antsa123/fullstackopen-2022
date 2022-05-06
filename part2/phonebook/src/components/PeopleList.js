import peopleService from "../services/peopleService"

const PeopleList = ({peopleToShow, deletePerson}) => {

  return (
    <div>
      {
        peopleToShow.map(person => 
          <p key={person.id}>{person.name} {person.number}  <button onClick={() => deletePerson(person.id)}>Delete</button></p>
        )
      }
    </div>
    )
}

export default PeopleList