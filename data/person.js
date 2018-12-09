let people = [];

const addPerson = person => {
  const nextId = people.length === 0 ? 1 : people[people.length - 1].id + 1;
  people = [...people, { ...person, id: nextId }];
  console.log("people", people);
  return "success";
};

const getPeople = () => {
  console.log("get people", people);
  return people;
};

module.exports = {
  addPerson,
  getPeople
};
