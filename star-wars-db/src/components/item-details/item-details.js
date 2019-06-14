import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-details.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Record };

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

    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  onItemLoaded = item => {
    this.setState({
      item,
      loadingItem: false,
      image: this.props.getImageUrl(item)
    });
  };

  render() {
    const { item, image, loadingItem, error } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }
    const hasDate = !(loadingItem || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loadingItem ? <Spinner /> : null;
    const content = hasDate ? (
      <ItemView
        item={item}
        image={image}
        content={React.Children.map(this.props.children, child => {
          return React.cloneElement(child, { item });
        })}
      />
    ) : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image, content }) => {
  const {name} = item;
  return (
    <React.Fragment>
      <img className="item-image" alt="item" src={image} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">{content}</ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
