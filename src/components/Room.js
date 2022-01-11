/* eslint-disable react-hooks/exhaustive-deps */
// import React, { Component } from "react";
// import Person from "./Person";

// class Room extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       people: [],
//       totalVisits: 1,
//     };
//   }

//   newVisit = () => {
//     this.setState({ totalVisits: this.state.totalVisits + 1, loading: true });
//   };

//   removePerson = (id) => {
//     this.setState({
//       people: this.state.people.filter((people) => people.id !== id),
//     });
//   };

//   fetchPerson = () => {
//     fetch(`https://randomuser.me/api/?inc=name,login,picture&nat=us`)
//       .then((res) => res.json())
//       .then((data) => {
//         const newPeople = data.results.map((person) => ({
//           id: person.login.uuid,
//           name: `${person.name.first} ${person.name.last}`,
//           picture: person.picture.large,
//         }));

//         this.setState({
//           people: [...this.state.people, ...newPeople],
//           totalVisits: this.state.people.length + newPeople.length,
//           loading: false,
//         });
//       });
//   };

//   componentDidMount() {
//     this.fetchPerson();
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.totalVisits > prevState.totalVisits && this.state.loading) {
//       this.fetchPerson();
//     }
//   }

//   render() {
//     const { people, loading } = this.state;
//     return (
//       <div className="room-container">
//         <button onClick={this.newVisit}>New Visitor</button>
//         <div className="room">
//           {people.map((person) => (
//             <Person {...person} key={person.id} remove={this.removePerson} />
//           ))}
//           {loading && <Person pending />}
//         </div>
//       </div>
//     );
//   }
// }

// export default Room;

import React, { useState, useEffect } from "react";
import Person from "./Person";

export default function Room() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [totalVisits, setTotalVisits] = useState(1);

  const newVisit = () => {
    setTotalVisits(totalVisits + 1);
    setLoading(true);
  };

  const removePerson = (id) => {
    setPeople(people.filter((people) => people.id !== id));
  };

  useEffect(() => {
    const apiCall = async () => {
      const result = await fetch(
        `https://randomuser.me/api/?inc=name,login,picture&nat=us`
      );

      const data = await result.json();

      const newPeople = data.results.map((person) => ({
        id: person.login.uuid,
        name: `${person.name.first} ${person.name.last}`,
        picture: person.picture.large,
      }));

      setPeople([...people, ...newPeople]);
      setTotalVisits(people.length + newPeople.length);
      setLoading(false);
    };

    apiCall();
  }, [totalVisits]);

  return (
    <div className="room-container">
      <button onClick={() => newVisit()}>New Visitor</button>
      <div className="room">
        {people.map((person) => (
          <Person {...person} key={person.id} remove={() => removePerson()} />
        ))}
        {loading && <Person pending />}
      </div>
    </div>
  );
}
