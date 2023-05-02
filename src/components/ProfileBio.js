import React, {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const ProfileBio = (props) => {
    const {bio, handleChange, prevStep, nextStep} = props;
    
    const [firstTimeContinueClick, setFirstTimeContinueClick] = useState(false);
    const [inputProps, setInputProps] = useState({bioProps:{}});

    useEffect(()=>{
        if(firstTimeContinueClick){
            if(bio !== "")  {
                setInputProps(prevInputProps => ({...prevInputProps, bioProps: {error: false, helperText:" "}}));
            }
        }
    },[bio])

    const continueStep = (e) => {
        e.preventDefault();
        if(bio === ""){
            setInputProps(prevInputProps => ({...prevInputProps, bioProps: {error: true, helperText:"Please enter summary of Profile"}}));
            setFirstTimeContinueClick(true);
            return;
        }
        setFirstTimeContinueClick(false);
        nextStep();
    }

    const previousStep = (e) => {
        e.preventDefault();
        prevStep();
    }

    
  return (
        <>
            <FormControl fullWidth sx={{position:"relative"}}>
                <span className="form-control-title">Profile</span>
                <span className="form-control-sub-title">Featuring a professional summary introduces you to hiring managers.</span>
                
                <TextField
                    {...{...inputProps}.bioProps}
                    multiline
                    minRows={4}
                    // label="Description"
                    onChange={(e)=>handleChange(e)}
                    defaultValue={bio}
                    margin="normal"
                    fullWidth
                />
                
                <div className="flex-btn-group">
                    <div className="btn">
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e)=>previousStep(e)}
                            style={{margin:"0 0 0.2em 0"}}
                        >Back
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e)=>continueStep(e)}
                            style={{margin:"0 0 0.2em 0.5em"}}
                        >Continue
                        </Button>
                    </div>
                </div>
            </FormControl>
        </>
    )
}

export default ProfileBio