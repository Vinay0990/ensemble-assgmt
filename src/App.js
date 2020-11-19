import Axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./App.css";
import ShowData from "./ShowData";

const URI = "httpS://rest.ensembl.org/";

function App() {
  const initState = { symbol: "", position: "", acid: "" };

  const [loading, setloading] = useState();
  const [state, setstate] = useState(initState);
  const [finalData, setfinalData] = useState([]);

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    getData();
  };

  async function getData() {
    await Axios.get(
      URI +
        `lookup/symbol/homo_sapiens/${state.symbol}?content-type=application/json;expand=1`
    )
      .then(async (result) => {
        setloading(true);
        const data = result.data.Transcript;
        console.log("got data", data.length);
        let temp = [];
        await data.forEach(async (element) => {
          await Axios.get(URI + `sequence/id/${element.id}`)
            .then((results) => {
              if (results.data.seq[state.position] === state.acid) {
                temp.push(element);
              }
            })
            .catch((err) => console.log(err));
        });

        await setfinalData(temp);
        await setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App container ">
      <Form>
        <Row>
          <Col md={6} sm={12} lg={3}>
            <Form.Control
              placeholder="Enter Genetic Symbol eg. BRAF"
              value={state.symbol}
              onChange={handleChange}
              name="symbol"
            />
          </Col>
          <Col md={6} sm={12} lg={3}>
            <Form.Control
              placeholder="Enter position eg. 600"
              value={state.position}
              onChange={handleChange}
              name="position"
            />
          </Col>
          <Col md={6} sm={12} lg={3}>
            <Form.Control
              placeholder="Enter amino acid letter eg. V"
              value={state.acid}
              onChange={handleChange}
              name="acid"
            />
          </Col>
          <Col md={6} sm={12} lg={3}>
            <Button
              variant="primary"
              block
              color="primary"
              className="form-control"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />

      <ShowData finalData={finalData} />
    </div>
  );
}

export default App;
