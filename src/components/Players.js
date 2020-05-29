import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SimpleTable extends React.Component {

  state = {
    data: []
  };

  componentDidMount() {
    fetch('http://localhost:4001/players/all')
      .then((response) => response.json())
      .then(data => {
        this.setState({ data: data });
      });
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table style={{ width: '600px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Race</TableCell>
              <TableCell>Profession</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.race}</TableCell>
                <TableCell>{row.profession}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default SimpleTable;