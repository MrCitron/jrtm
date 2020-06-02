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
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

class SimpleTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            form: {
                name: '',
                race: '',
                profession: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const headers = new Headers();
        const myInit = {headers: headers};
        headers.append("Authorization", "Bearer " + process.env.REACT_APP_TOKEN);
        fetch(process.env.REACT_APP_API_ENDPOINT + '/characters', myInit)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            });
    };

    handleClick() {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/characters', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
            },
            body: JSON.stringify(this.state.form)
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
            });
    }

    handleChange(event) {
        console.log(event.target.value);
//        this.setState({form.name: event.target.value});
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField label="Nom" variant="outlined"
                               value={this.state.form.name}
                               onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel htmlFor="race-select">Race</InputLabel>
                    <Select
                        native
                        value={this.state.form.race}
                        label="Race"
                        id="race-select"
                    >
                        <option aria-label="None" value=""/>
                        <option value={1}>Ten</option>
                        <option value={2}>Twenty</option>
                        <option value={3}>Thirty</option>
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel htmlFor="profession-select">Profession</InputLabel>
                    <Select
                        native
                        value={this.state.form.profession}
                        label="Profession"
                        id="profession-select"
                    >
                        <option aria-label="None" value=""/>
                        <option value={1}>Ten</option>
                        <option value={2}>Twenty</option>
                        <option value={3}>Thirty</option>
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.handleClick}>Ajouter</Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
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