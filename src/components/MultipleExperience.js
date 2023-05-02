import React, {useState, useEffect} from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@material-ui/core/Button';

const MultipleExperience = (props) => {
    const {workInfo, setWorkInfo, setCurrentDisplayWorkExpKey, prevStep, nextStep} = props;
    // const [maxKey, setMaxKey] = useState(()=>{
    //     const initialValue = JSON.parse(localStorage.getItem('multipleExpMaxKey'))
    //     return initialValue || 0
    // })

    // useEffect(() => {
    //     localStorage.setItem('multipleExpMaxKey', JSON.stringify(maxKey));
    // }, [maxKey])

    const continueStep = (e) => {
        e.preventDefault();

        setCurrentDisplayWorkExpKey(0);
        nextStep();
    }

    const previousStep = (e) => {
        e.preventDefault();
        prevStep();
    }

    const addNewWorkExp = (e) => {
        let newWorkInfo = workInfo;
        let nextId = newWorkInfo[newWorkInfo.length - 1].id + 1;
        if(!nextId) nextId = 0;
        newWorkInfo = newWorkInfo.concat({
            id:nextId,
            position: "",
            companyName: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            description: "",
        })
        setCurrentDisplayWorkExpKey(newWorkInfo.length - 1);
        setWorkInfo(newWorkInfo);
        prevStep();
    }

    const handleEditWorkExp = (e, wIndex) => {
        setCurrentDisplayWorkExpKey(wIndex);
        prevStep();
    }
    const handleDeleteExperience = (e, wIndex) => {
        e.stopPropagation();
        let newWorkInfo = workInfo;
        newWorkInfo = newWorkInfo.filter((work,index)=>{
            return index!==wIndex
        })
        setWorkInfo(newWorkInfo);
    }
  return (
        <>
            <FormControl fullWidth sx={{position:"relative"}}>
                <span className="form-control-title">Professional Experience Summary</span>
                <span className="form-control-sub-title"></span>
                
                    {workInfo?.map((work,index)=>{
                        return (<div className="review-box" key={work.id} onClick={(e)=>handleEditWorkExp(e, index)}>
                                    <div className="review-sub-box">
                                        <div className="review-id-box">
                                            {index + 1}
                                        </div>
                                        <div className="review-details-box">
                                            <div>
                                                <div className="review-details-heading">
                                                    <strong>{`${work.position || ''} ${work.companyName ? ", "+work.companyName : ""}`}</strong>{`${work.startMonth ? " | "+work.startMonth : ""} ${ work.startYear || ""}${work.endMonth ? " - "+work.endMonth :""} ${work.endYear || ""}`}
                                                </div>
                                                <div className="review-details-description">
                                                    {`${work.description}`}
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={(e)=>handleDeleteExperience(e, index)}
                                                ><i className="fa fa-trash"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                    })}

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={(e)=>addNewWorkExp(e)}
                    style={{margin:"0.5em 0"}}
                    fullWidth
                >Add More
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

export default MultipleExperience