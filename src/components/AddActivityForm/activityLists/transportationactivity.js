import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const TransportationActivity = (props) => {
    const {landprep, plantseeds, irrigation, cropgrowth, fertilization, harvesting, storage, transportation, marketing} = props;

    return(
        // landprep && <div>hi</div>
        <div>
            <Container>
                <Grid>
                    <Grid.Row columns = {2} className = "mx-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Covering the gaps"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Covering the gaps"
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
                                label= "Mulching Material"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Cold Storage"
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
                                label= "Based on Product"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Based on Product"
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
                                label= "road type pucca or"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "road type pucca or"
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


export default TransportationActivity