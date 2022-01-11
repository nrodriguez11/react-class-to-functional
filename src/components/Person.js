import React, { Component } from "react";
import { DateTime } from "luxon";
import Placeholder from "../images/placeholder.png";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivalTime: DateTime.local(),
      timeSinceArrival: "00:00:00",
    };
  }

  componentDidMount() {
    if (!this.props.pending) {
      this.timerID = setInterval(() => {
        const timeSinceArrival = DateTime.local()
          .diff(this.state.arrivalTime)
          .toFormat("hh:mm:ss");
        this.setState({ timeSinceArrival });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { id, name, picture, remove, pending } = this.props;
    const { timeSinceArrival } = this.state;
    return (
      <div className="person">
        {pending ? (
          <img src={Placeholder} alt="Placeholder" />
        ) : (
          <img src={picture} alt={name} onClick={() => remove(id)} />
        )}
        <h3>{name || "Loading..."}</h3>
        <h4>{timeSinceArrival}</h4>
      </div>
    );
  }
}

export default Person;
