import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import themeContext from "./ThemeContext";
import Modal from "./Modal";

// Cant use hooks in class components (aka useEffect, useParams or anything that uses ´use´)
class Details extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: true };
  // }

  // This works by using the class properties babel plugin
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );

    const json = await res.json();

    // this.setState({
    //   loading: false,
    // });

    // this.setState(json.pets[0]);

    // Does the same as above but in 1 statement so react gets it all at once
    this.setState(Object.assign({ loading: false }, json.pets[0]));

    // Could also use a spread operator to do the same thing
    // this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    // Works the same as above but deconstructed so we don't have to say this.state.animal or this.state.breed every time
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <themeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </themeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <a
                    // We just send them to an actual adoption site (in Mexico) in another tab just for this example
                    href="https://localizoo.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yes
                  </a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
