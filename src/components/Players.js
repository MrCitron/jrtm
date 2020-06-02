import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

class SimpleTable extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {
        var headers = new Headers();
        var myInit = {headers: headers}
        headers.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU5MzUyODkzOX0.jGiDuMeCjkSeBydgypsT5n3aSJVUQE7Wdolz0fNHjdewvtw4SuMHl7VwSAqp73CcxyxMXMOKL0swKAIWC_-u9A");
        fetch(process.env.REACT_APP_API_ENDPOINT + '/characters', myInit)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            });
    };

    handleClick() {

    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={this.handleClick}>Ajouter</Button>
                </Grid>
                <Grid>
                    <TableContainer component={Paper}>
                        <Table style={{width: '600px'}} aria-label="simple table">
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
                                        <TableCell>{row.race != null ? row.race.name : ""}</TableCell>
                                        <TableCell>{row.profession != null ? row.profession.name : ""}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

export default SimpleTable;