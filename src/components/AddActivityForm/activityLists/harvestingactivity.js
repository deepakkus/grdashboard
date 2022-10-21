import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const HarvestingActivity = (props) => {
    const {landprep, plantseeds, irrigation, cropgrowth, fertilization, harvesting, storage, transportation, marketing} = props;

    return(
        // landprep && <div>hi</div>
        <div>
            <Container>
                <Grid>
                    <Grid.Row columns = {3} className = "mx-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Maturity Indices"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Maturity Indices"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Fruit size"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Fruit size"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Shape"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Shape"
                                helperText= "Required"
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row columns = {2} className = "ml-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Colour"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Colour"
                                helperText= "Required" 
                                // onChange={this.handleCropCycleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Smell"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Smell"
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


export default HarvestingActivity