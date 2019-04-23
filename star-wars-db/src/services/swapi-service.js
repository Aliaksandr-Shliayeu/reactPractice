export default class SwapiService {
  _apiBase = "https://swapi.co/api";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._trasformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._trasformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._trasformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._trasformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._trasformStarships);
  }

  async getStarship(id) {
    const starships = await this.getResource(`/starships/${id}/`);
    return this._trasformStarships(starships);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp[1]);
  }

  _trasformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  }

  _trasformStarships(starships) {
    return {
      id: this._extractId(starships),
      name: starships.name,
      model: starships.model,
      manufacturer: starships.manufacturer,
      costInCredits: starships.cost_in_credits,
      length: starships.length,
      crew: starships.crew,
      passengers: starships.passengers,
      cargoCapacity: starships.cargo_capacity
    };
  }

  _trasformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  }
}
