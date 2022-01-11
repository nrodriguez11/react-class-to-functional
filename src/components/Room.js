import React, { Component } from "react";
import Person from "./Person";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      totalVisits: 1,
    };
  }

  newVisit = () => {
    this.setState({ totalVisits: this.state.totalVisits + 1, loading: true });
  };

  removePerson = (id) => {
    this.setState({
      people: this.state.people.filter((people) => people.id !== id),
    });
  };

  fetchPerson = () => {
    fetch(`https://randomuser.me/api/?inc=name,login,picture&nat=us`)
      .then((res) => res.json())
      .then((data) => {
        const newPeople = data.results.map((person) => ({
          id: person.login.uuid,
          name: `${person.name.first} ${person.name.last}`,
          picture: person.picture.large,
        }));

        this.setState({
          people: [...this.state.people, ...newPeople],
          totalVisits: this.state.people.length + newPeople.length,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchPerson();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.totalVisits > prevState.totalVisits && this.state.loading) {
      this.fetchPerson();
    }
  }

  render() {
    const { people, loading } = this.state;
    return (
      <div className="room-container">
        <button onClick={this.newVisit}>New Visitor</button>
        <div className="room">
          {people.map((person) => (
            <Person {...person} key={person.id} remove={this.removePerson} />
          ))}
          {loading && <Person pending />}
        </div>
      </div>
    );
  }
}

export default Room;
