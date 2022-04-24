const CountryInfo = ({countries}) => {
  // console.log(countries)
  if (countries.length > 10) {
    return (
      <div>
      <p>Too many matches</p>
      </div>
    )
  }
  else if (countries.length === 1){
    let country = countries[0]  
    let languages = Object.values(country.languages)
    return (
      <div>
        <p><strong>Capital</strong> {country.capital}</p>
        <p><strong>Area</strong> {country.area}</p>
        <p><strong>Population</strong> {country.population}</p>
        <p><strong>Languages:</strong></p>
        {
          languages.map(lang => <p key={lang}>{lang}</p>)
        }
        <img src={country.flags.png}/>
      </div>
    )
  }
  else {
    return (
    <>
       {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
    </>
    )
  }
}

export default CountryInfo