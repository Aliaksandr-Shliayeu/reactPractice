import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-details.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";

export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    image: null,
    loadingItem: true,
    error: false
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  
  onError = () => {
    this.setState({ error: true, loadingItem: false });
  };
  
  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    
    this.setState({
      loadingItem: true
    });
    
    getData(itemId).then(this.onItemLoaded)
    .catch(this.onError);
  }

  onItemLoaded = item => {
    this.setState({ item, loadingItem: false, image: this.props.getImageUrl(item) });
  };

  render() {
    const { item, image, loadingItem, error } = this.state;
    const hasDate = !(loadingItem || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loadingItem ? <Spinner /> : null;
    const content = hasDate ? <ItemView item={ item } image={image} /> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <React.Fragment>
      <img
        className="item-image"
        alt="item"
        src={image}
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
