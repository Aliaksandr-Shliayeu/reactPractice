import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./person-details.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loadingPerson: true,
    error: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  onPersonLoaded = person => {
    this.setState({ person, loadingPerson: false });
  };

  onError = () => {
    this.setState({ error: true, loadingPerson: false });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.setState({
      loadingPerson: true
    });

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  render() {
    const { person, loadingPerson, error } = this.state;
    const hasDate = !(loadingPerson || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loadingPerson ? <Spinner /> : null;
    const content = hasDate ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <React.Fragment>
      <img
        className="person-image"
        alt="person"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
