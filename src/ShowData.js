import React from "react";
import { Table } from "react-bootstrap";

function ShowData({ finalData }) {
  const ID_URI = "http://www.ensembl.org/id/";
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Transcript ID</th>
          <th>Display Name</th>
          <th>Assembly Name</th>
        </tr>
      </thead>
      <tbody>
        {finalData.map((data, i) => (
          <tr key={i}>
            <td>
              <a href={ID_URI + data.id}>{data.id}</a>
            </td>
            <td>{data.display_name}</td>
            <td>{data.assembly_name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ShowData;
