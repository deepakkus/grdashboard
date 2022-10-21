import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const ActivityOption = (props) => {
    const {landprep, plantseeds, irrigation, cropgrowth, fertilization, harvesting, storage, transportation, marketing} = props;

    return(
        // landprep && <div>hi</div>
        <div>
            <Container>
                <Grid>
                    <Grid.Row className = "mx-0">
                        <Grid.Column width = {8}>
                            <TextField
                                id="outlined-select-cc"
                                label= "Tillage"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Tillage"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width = {4}>
                            <TextField
                                id="outlined-select-cc"
                                label= "Levelling"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Levelling"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width = {4}>
                            <TextField
                                id="outlined-select-cc"
                                label= "Bunds"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Bunds"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row className = "ml-0">
                        <Grid.Column width = {8}>
                            <TextField
                                id="outlined-select-cc"
                                label= "Drainage"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Drainage"
                                helperText= "Required" 
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width = {8}>
                            <TextField
                                id="outlined-select-cc"
                                label= "Choosing"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Choosing"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
    
}


export default ActivityOption