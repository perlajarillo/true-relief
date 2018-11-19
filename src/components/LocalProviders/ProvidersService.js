import React from "react";
import { Input } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class ProvidersService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialties: null,
      providers: null
    };
  }

  getSpecialties = () => {
    const resource_url =
      "https://api.betterdoctor.com/2016-03-01/specialties?skip=0&limit=20&user_key=" +
      process.env.REACT_APP_BETTER_DOCTOR_KEY;
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const parsedResponse = JSON.parse(httpRequest.responseText);
        console.log(parsedResponse);
        const response = Object.values(parsedResponse)[1];
        this.setState({ specialties: response });
        console.log(response);
      } else if (httpRequest.readyState === 4 && httpRequest.status === 404) {
        const response = JSON.parse(httpRequest.responseText);
        console.log("ERROR! 404");
        console.log(response);
      }
    };

    httpRequest.open("GET", resource_url);
    httpRequest.send();
  };

  getProviders = () => {
    const resource_url =
      "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" +
      process.env.REACT_APP_BETTER_DOCTOR_KEY;
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const parsedResponse = JSON.parse(httpRequest.responseText);
        console.log(parsedResponse);
        const response = Object.values(parsedResponse)[1];
        this.setState({ providers: response });
        console.log(response);
      } else if (httpRequest.readyState === 4 && httpRequest.status === 404) {
        const response = JSON.parse(httpRequest.responseText);
        console.log("ERROR! 404");
        console.log(response);
      }
    };
    httpRequest.open("GET", resource_url);
    httpRequest.timeout = 3500;
    httpRequest.ontimeout = function(e) {
      console.log("just waiting");
    };
    httpRequest.send();
  };

  componentDidMount() {
    this.getSpecialties();
    //this.getProviders();
  }

  render() {
    const { specialties } = this.state;
    return (
      <div>
        <Select value="">
          <MenuItem value="" disabled>
            Select one specialty
          </MenuItem>
          {specialties !== null &&
            specialties.map(item => (
              <MenuItem value={item.uid} key={item.uid}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </div>
    );
  }
}

export default ProvidersService;
