import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Container } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const MarketingActivity = (props) => {
    const {landprep, plantseeds, irrigation, cropgrowth, fertilization, harvesting, storage, transportation, marketing} = props;

    return(
        // landprep && <div>hi</div>
        <div>
            <Container>
                <Grid>
                    <Grid.Row columns = {4} className = "mx-0">
                        <Grid.Column>
                            <TextField
                                id="outlined-select-cc"
                                label= "Yield Per Hectare/Acre"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Yield Per Hectare/Acre"
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
                                label= "Input Cost per Hectare/Acre"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Input Cost per Hectare/Acre"
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
                                label= "Out cost per Hectare/Acre"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Out cost per Hectare/Acre"
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
                                label= "Profit Per Hectare/Acre"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Profit Per Hectare/Acre"
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
                                label= "Unsupporting Middle man"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Unsupporting Middle man"
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
                                label= "Direct entry for farmer"
                                fullWidth
                                // className="mr-4 ml-4 mt-2 w-25"
                                variant = "outlined"
                                placeholder = "Direct entry for farmer"
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


export default MarketingActivity