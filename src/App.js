import React from 'react'
import './style.css'
import Selection from './components/Selection'
import areaIcon from './icons/area.png'
import capitalIcon from './icons/capital.png'
import currenciesIcon from './icons/currencies.png'
import languagesIcon from './icons/languages.png'
import locationIcon from './icons/location.png'
import populationIcon from './icons/population.png'
import logo from './icons/glober-logo.png'

// SUCCESS! 1) populate dwopdown list of names with ALL country names from API
// N/A 1.5) alternatively, have a searchbox that will send search request to API and return country
// SUCCESS! 2) match selected/searched country

// 3) return the needed country properties from API
// 4) display these properties in UI

class App extends React.Component {
  
  state = {
    countryList: ['Select a country...'],
    //countrySelection: 'Russia',
    selectedCountry: '',
    countryData: '',
    countryLanguage: [],
    countryCurrency: []
    //testCountries: ['Russia', 'New Zealand', 'Hungary']
    }

  componentDidMount = () => {
    // populate 'countries' array with ALL available country names from API
    fetch('https://restcountries.eu/rest/v2/all')
    .then(data => data.json())
    .then(result => {
      for(let i = 0; i < result.length; i++) {
        this.setState(prevState => prevState.countryList.push(String(result[i].name)))
        //list.push(String(result[i].name)) - IT DID NOT LIKE USING 'list' variable, instead the fix was to update STATE using prevState and put data STRAIGHT into STATE using FOR EACH loop! :D
    }
  })   
    //console.log(list)
    //this.setState({countryList: list})
}
  
  testing = () => {
    //console.log(this.state.countryList)
    console.log(this.state.countryLanguage)
    console.log(this.state.countryCurrency)
    //console.log(this.state.countryData)
    //this.state.countryList.map((el) => console.log(el))
    }

  handleChange = (event) => {
    this.setState({selectedCountry: event.target.value})
    this.setState({countryLanguage: []})
    this.setState({countryCurrency: []})
    //console.log(event.target.value)
    
    fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}?fullText=true`)
    .then(data => data.json())
    .then(result => {
      
      this.setState(prevState => prevState.countryData = result[0])
    
      for (let i = 0; i < result[0].languages.length; i++) {
        //console.log(result[0].languages.length)
        //console.log(result[0].languages[i].name)
        this.setState(prevState => prevState.countryLanguage[i] = result[0].languages[i].name)
      }
      for (let i = 0; i < result[0].currencies.length; i++) {
        //console.log(result[0].currencies.length)
        //console.log(result[0].currencies[i].name)
        this.setState(prevState => prevState.countryCurrency[i] = result[0].currencies[i].name)
      }
    })
  }


      
    //console.log(this.state.countryData)
    //{ let { name, currencies, languages, capital, subregion, population, area } = result})
    //this.setState({ countryData: [name, currencies, languages, capital, subregion, population, area] })
    //console.log(this.state.countryData)
    

  render() {
    return (
      <div>
        <div>
          <img src={logo} alt='logo' className='logo'/>
        </div>
        <div className='topContainer'>
          <br/>
          <Selection country={this.state.countryList} class='dropdown' handleChange={this.handleChange} value={this.state.selectedCountry}/> 
          <br/>
          <h1 className='countryName'>{this.state.selectedCountry}</h1>
          <img src={this.state.countryData.flag} alt={this.state.selectedCountry} className='countryFlag'/>
        </div>
        <div className='bottomContainer'>
          <img src={locationIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Location: {this.state.countryData.subregion}</h3>
          <img src={areaIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Area: {this.state.countryData.area} km&sup2;</h3>
          <img src={populationIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Population: {this.state.countryData.population}</h3>
          <img src={capitalIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Capital: {this.state.countryData.capital}</h3>
          <img src={languagesIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Languages: {[...this.state.countryLanguage].join(', ')}</h3>
          <img src={currenciesIcon} alt='' className='smallIcon'/>
          <h3 className='subtitle'>Currencies: {[...this.state.countryCurrency].join(', ')}</h3>
        </div>
      </div>
    )
  }

}

export default App;

//<button onClick={this.testing}>TEST LOG</button><br/>

/* <select className='dropdown' onChange={this.handleChange}>
            <option>Choose a country</option>
            <option>Russia</option>
            <option>New Zealand</option>
            <option>Hungary</option>
          </select> */