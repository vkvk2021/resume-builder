import React, {useState, useEffect} from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const KeySkills = (props) => {
    const {skills, handleChange, setSkills, prevStep, nextStep} = props;
    // const [maxKey, setMaxKey] = useState(()=>{
    //     const initialValue = JSON.parse(localStorage.getItem('skillsMaxKey'))
    //     return initialValue || 0
    // })

    // useEffect(() => {
    //     localStorage.setItem('skillsMaxKey', JSON.stringify(maxKey));
    // }, [maxKey])

    const continueStep = (e) => {
        e.preventDefault();
        // validation here
        nextStep();
    }

    const previousStep = (e) => {
        e.preventDefault();
        prevStep();
    }

    const addTextField = (e) => {
        // const maxKeyValue = maxKey;
        let newSkills = skills;
        let nextId = newSkills[newSkills.length - 1].id + 1;
        if(!nextId) nextId = 0;
        newSkills = newSkills.concat({id:nextId, value:"", empty: true})
        // console.log("newSkills", newSkills)
        setSkills(newSkills);
        
        // setMaxKey(prevKey=>prevKey+1);
    }

    const handleDeleteSkill = (e, sIndex) => {
        // let newSkills = skills;
        // newSkills = newSkills.filter(skill=>{
        //     return skill.id !== sId
        // });
        setSkills(prevSkills => prevSkills.filter((skill, index)=>{
            return index !== sIndex
        }));
    }
  return (
        <>
            <FormControl fullWidth sx={{position:"relative"}}>
                <span className="form-control-title">Key Skills</span>
                <span className="form-control-sub-title">Add relevant professional key skills and proficiencies.</span>
                <div className="skill-container">
                    {skills?.map((skill, index)=>{
                        return (
                                <div key={skill.id}>
                                    <TextField
                                        variant="standard"
                                        onChange={handleChange(index)}
                                        defaultValue={skills[index]?.value}
                                        // error={skill.empty}
                                        // helperText={skill.empty?"Please enter skill":""}
                                        margin="normal"
                                        sx={{width: "85%", marginRight: "2%"}}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={(e)=>handleDeleteSkill(e, index)}
                                        style={{verticalAlign:"bottom", marginBottom:"0.5em"}}
                                    ><i className="fa fa-trash fa-sm"></i>
                                    </Button>
                                </div>
                        )
                    })}
                </div>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={(e)=>addTextField(e)}
                    style={{margin:"0.3em 0"}}
                    fullWidth
                >Add One More
                </Button>
                
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

export default KeySkills