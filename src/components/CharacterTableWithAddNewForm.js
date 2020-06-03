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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class CharacterTableWithAddNewForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            races: [],
            professions: [],
            players: [],
            form: {
                name: '',
                race: 0,
                profession: 0
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.fetchRaces = this.fetchRaces.bind(this);
        this.fetchProfessions = this.fetchProfessions.bind(this);
        this.fetchPlayers = this.fetchPlayers.bind(this);
    }

    componentDidMount() {
        this.fetchRaces();
        this.fetchProfessions();
        this.fetchPlayers();
    }

    handleAdd() {
        const newCharacter = {
            name: this.state.form.name,
            race: {
                id: parseInt(this.state.form.race)
            },
            profession: {
                id: parseInt(this.state.form.profession)
            }
        }
        fetch(process.env.REACT_APP_API_ENDPOINT + '/characters', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
            },
            body: JSON.stringify(newCharacter)
        })
            .then((response) => response.json())
            .then(this.fetchPlayers)
            .catch(error => this.setState({error}));
        // .then(data => {
        //     console.log(data);
        // });
    };

    handleDelete(id, event) {
        event.preventDefault();
        if (id && id !== '') {
            fetch(process.env.REACT_APP_API_ENDPOINT + '/characters/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN
                }
            })
                .then(this.fetchPlayers);
            // .then(data => {
            //     console.log(data);
            // });
        }
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.updateForm(name, value);
    }

    updateForm(name, value) {
        const form = {...this.state.form}
        form[name] = value;
        this.setState({form});
    }

    fetchRaces() {
        const headers = new Headers();
        const myInit = {headers: headers};
        headers.append("Authorization", "Bearer " + process.env.REACT_APP_TOKEN);
        // Where we're fetching data from
        fetch(process.env.REACT_APP_API_ENDPOINT + '/races', myInit)
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data => {
                this.setState({
                    races: data
                });
                if (data.length > 0) {
                    this.updateForm("race", data[0].id);
                }
            })
            // Catch any errors we hit and update the app
            .catch(error => this.setState({error}));
    }

    fetchProfessions() {
        const headers = new Headers();
        const myInit = {headers: headers};
        headers.append("Authorization", "Bearer " + process.env.REACT_APP_TOKEN);
        // Where we're fetching data from
        fetch(process.env.REACT_APP_API_ENDPOINT + '/professions', myInit)
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data => {
                this.setState({
                    professions: data
                });
                if (data.length > 0) {
                    this.updateForm("profession", data[0].id);
                }
            })
            // Catch any errors we hit and update the app
            .catch(error => this.setState({error}));
    }

    fetchPlayers() {
        const headers = new Headers();
        const myInit = {headers: headers};
        headers.append("Authorization", "Bearer " + process.env.REACT_APP_TOKEN);
        fetch(process.env.REACT_APP_API_ENDPOINT + '/characters', myInit)
            .then((response) => response.json())
            .then(data => {
                // console.log(data);
                this.setState({players: data});
            });
    };

    render() {

        let racesOptions = this.state.races.map((race) =>
            <option key={race.id} value={race.id}>{race.name}</option>
        );

        let professionsOptions = this.state.professions.map((profession) =>
            <option key={profession.id} value={profession.id}>{profession.name}</option>
        );

        return (
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField label="Nom" variant="outlined"
                               name="name"
                               value={this.state.form.name}
                               onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel htmlFor="race-select">Race</InputLabel>
                    <Select
                        native
                        value={this.state.form.race}
                        name="race"
                        label="Race"
                        id="race-select"
                        onChange={this.handleChange}
                    >
                        {racesOptions}
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel htmlFor="profession-select">Profession</InputLabel>
                    <Select
                        native
                        value={this.state.form.profession}
                        name="profession"
                        label="Profession"
                        id="profession-select"
                        onChange={this.handleChange}
                    >
                        {professionsOptions}
                    </Select>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.handleAdd}>Ajouter</Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Race</TableCell>
                                    <TableCell>Profession</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.players.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.race != null ? row.race.name : ""}</TableCell>
                                        <TableCell>{row.profession != null ? row.profession.name : ""}</TableCell>
                                        <TableCell><Button variant="contained"
                                                           onClick={this.handleDelete.bind(this, row.id)}
                                                           value={row.id}><DeleteForeverIcon/></Button></TableCell>
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

export default CharacterTableWithAddNewForm;