import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Ellipse from '../ellipse';
import ErrIndicator from '../error';
import './random-planet.css';

export default class RandomPlanet extends Component {
    state = {
        planet: {},
        loading: true,
        error: false
    };

    constructor() {
        super();
        this.planetUpdate();
        this.interval = setInterval(this.planetUpdate, 2000);
        // clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});
    };
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };
    swapiService = new SwapiService;

    planetUpdate = () => {
        const id = Math.floor(Math.random() * 25+3);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const {planet, loading, error} = this.state;
        const data = !(loading || error);
        const errMessage = error ? <ErrIndicator/> : null;
        const ellipse = loading ? <Ellipse/> : null;
        const content = data ? <PlanetView planet={planet}/> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errMessage}
                {ellipse}
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, climate, diameter} = planet;
    return (<React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt={name}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population:</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Climate:</span>
                        <span>{climate}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diametr:</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )

};
