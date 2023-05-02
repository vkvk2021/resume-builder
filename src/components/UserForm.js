import React, {useState, useEffect} from 'react'
import ContactInformation from './ContactInformation';
import Education from './Education';
import WorkExperience from './WorkExperience';
import KeySkills from './KeySkills';
import Success from './Success';
import ResumePage from './ResumePage';
import ProfileBio from './ProfileBio';
import MultipleEducation from './MultipleEducation';
import MultipleExperience from './MultipleExperience';

const UserForm = () => {

    //useState
    const [step, setStep] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('step'))
        return initialValue || 1
    });
    const [image, setImage] = useState(null);

    const [contactInformation, setContactInformation] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('contactInformation'))
        return initialValue || {
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            email: "",
            showLinks: true,
            links: [{id:0, label:"", link:""}]
        }
    })
    
    const [educationInfo, setEducationInfo] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('educationInfo'))
        return initialValue || [{
            id:0,
            schoolName: "",
            schoolLocation: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            isPresentlyStudying: false,
            degree: "",
            fieldOfStudy: "",
            description: "",
        }]
    })

    const [currentDisplayEducationKey, setCurrentDisplayEducationKey] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('displayEduKey'))
        return initialValue || 0
    })

    const [workInfo, setWorkInfo] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('workInfo'))
        return initialValue || [{
            id:0,
            position: "",
            companyName: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            description: "",
        }]
    })

    const [currentDisplayWorkExpKey, setCurrentDisplayWorkExpKey] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('displayWorkKey'))
        return initialValue || 0
    })

    const [skills, setSkills] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('skills'))
        return initialValue || [{id:0,value:"", empty:true}]
    });
    const [bio, setBio] = useState(()=>{
        const initialValue = JSON.parse(localStorage.getItem('bio'))
        return initialValue || ""
    })

    useEffect(()=>{
        localStorage.setItem('step', JSON.stringify(step));
        // localStorage.setItem('image', image);
        localStorage.setItem('contactInformation', JSON.stringify(contactInformation));
        localStorage.setItem('educationInfo', JSON.stringify(educationInfo));
        localStorage.setItem('displayEduKey', JSON.stringify(currentDisplayEducationKey));
        localStorage.setItem('workInfo', JSON.stringify(workInfo));
        localStorage.setItem('displayWorkKey', JSON.stringify(currentDisplayWorkExpKey));
        localStorage.setItem('skills', JSON.stringify(skills));
    },[step, currentDisplayEducationKey, currentDisplayWorkExpKey, contactInformation, educationInfo, workInfo, skills])

    //go to next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    }

    //go back to previous step
    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    }

    const handleContactInputChange = input => e => {
        setContactInformation(prevContactInfo => ({...prevContactInfo, [input]:e.target.value}))
    }

    const handleContactLinksInputChange = (linkIndex, input) => e => {
        let newLinks = JSON.parse(JSON.stringify(contactInformation.links));
        // let index = newLinks.findIndex(link=> link.id === linkId);
        newLinks[linkIndex] = {...newLinks[linkIndex], [input]:e.target.value};
        setContactInformation(prevContactInfo => ({...prevContactInfo, links:newLinks}));
    }

    const handleEducationInputChange = (input, eIndex) => e => {
        let newEducation = JSON.parse(JSON.stringify(educationInfo));
        // let index = newEducation.findIndex(edu=> edu.id === eKey);
        newEducation[eIndex] = {...newEducation[eIndex], [input]:e.target.value}
        setEducationInfo(newEducation);
    }

    const handleWorkInputChange = (input, wIndex) => e => {
        let newWorkInfo = JSON.parse(JSON.stringify(workInfo));
        // let index = newWorkInfo.findIndex(work=> work.id === wKey);
        newWorkInfo[wIndex] = {...newWorkInfo[wIndex], [input]:e.target.value}
        setWorkInfo(newWorkInfo)
    }

    const handleSkillInputChange = sIndex => e => {
        let newSkills = JSON.parse(JSON.stringify(skills));
        let empty;
        if(e.target.value === "") empty = true;
        else empty = false;
        // let index = newSkills.findIndex(skill=> skill.id === sId);
        newSkills[sIndex] = {id:newSkills[sIndex].id, value:e.target.value, empty};
        setSkills(newSkills);
    }

    const handleBioInputChange = e => {
        setBio(e.target.value);
    }

    const getPage = () => {
        switch (step){
            case 1:
                return (
                    <ContactInformation contactInformation={contactInformation} setContactInformation={setContactInformation} nextStep={nextStep} handleLinkChange={handleContactLinksInputChange} handleChange={handleContactInputChange} setImage={setImage}/>                   
                );
            case 2:
                return (
                    <Education educationInfo={educationInfo} educationKey={currentDisplayEducationKey} nextStep={nextStep} prevStep={prevStep} handleChange={handleEducationInputChange}/>                    
                );
            case 3:
                return (
                    <MultipleEducation educationInfo={educationInfo} setEducationInfo={setEducationInfo} setCurrentDisplayEducationKey={setCurrentDisplayEducationKey} nextStep={nextStep} prevStep={prevStep}/>                    
                );
            case 4:
                return (
                    <WorkExperience workInfo={workInfo} workExpKey={currentDisplayWorkExpKey} nextStep={nextStep} prevStep={prevStep} handleChange={handleWorkInputChange}/>
                );
            case 5:
                return (
                    <MultipleExperience workInfo={workInfo} setWorkInfo={setWorkInfo} setCurrentDisplayWorkExpKey={setCurrentDisplayWorkExpKey} nextStep={nextStep} prevStep={prevStep}/>                    
                );
            case 6:
                return (
                    <KeySkills skills={skills} nextStep={nextStep} prevStep={prevStep} handleChange={handleSkillInputChange} setSkills={setSkills}/>   
                );
            case 7:
                return (
                   <ProfileBio bio={bio} nextStep={nextStep} prevStep={prevStep} handleChange={handleBioInputChange}/>
                );
            case 8:
                return (
                   <Success />
                );

            default: 
                (console.log("step other than 1-5"))
        }
    }
    
    return (
        <>
            <div className="container">
                <div id="resume-builder-title">
                    Resume Builder
                </div>
                <div className="resume-container">
                    <div className="item-1">
                        <ResumePage step={step} bio={bio} contactInformation={contactInformation} image={image} educationInfo={educationInfo} workInfo={workInfo} skills={skills}/>
                    </div>
                    <div className="item-2">
                        {getPage()}
                    </div>
                </div>
            </div>
        </>
    )

}

export default UserForm