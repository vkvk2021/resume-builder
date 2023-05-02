import React, {useState, useRef, useEffect} from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import parse from 'html-react-parser';

import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ResumePage = (props) => {
    const {step, bio, contactInformation, image, educationInfo, workInfo, skills} = props;
    const [open, setOpen] = useState(false);

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open && descriptionElementRef.current !== null) {
            descriptionElementRef.current.focus();
        }
    }, [open]);

    const handlePreviewPage = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getPreviewContent = () => {
        // let previewContainer = document.createElement('div');
        // const form = document.getElementById('resume-form')
        // const formContact = document.querySelector('.form-contact');
        // const formBio = document.querySelector('.form-bio');
        // const formExperience = document.querySelector('.form-experience');
        // const formEducation = document.querySelector('.form-education');
        // const formSkills = document.querySelector('.form-skills');
        // previewContainer.innerHTML = "hi"
        // console.log("previewContainer", previewContainer, form)
        // return previewContainer;
        // return <h1>Hello</h1>;
        const input = document.getElementById('resume-form');
        // input.style.transform = "scale(0.95)"
        // input.style.border = "none"
        console.log("input", input)
        // input.style.transform = "scale(0.95)"
        // input.style.border = "none";
        return input?.innerHTML
    }

    const handleDownloadPage = () => {
        const input = document.getElementById('resume-form');
        input.style.transform = "scale(0.95)"
        input.style.border = "none"
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save(`resume-${Date.now()}.pdf`);
            });
        input.style.transform = "scale(0.6)"
        input.style.border = "1px solid rgb(40, 40, 40)";
    }
  return (
    <>
        <div className="form-wrapper" id="form-wrapper-id">
        <form id="resume-form">
            <div className="form-contact">
                <span className="profile-image">
                    {image ?
                            <span className="image-circle">
                                <img src={image} alt="image"></img>
                            </span>
                        : 
                            <span className="image-circle">
                                <span className="image-name">
                                    {contactInformation?.firstName?
                                            contactInformation.firstName.slice(0,1).toUpperCase()
                                        :   "C"
                                    }
                                    {contactInformation?.lastName?
                                            contactInformation.lastName.slice(0,1).toUpperCase()
                                        :   "C"
                                    }
                                </span>
                            </span>
                    }
                </span>
                <div className="wrapper">
                    <div className="nameJob">
                        <span className="name">
                            {contactInformation?.firstName ?
                                    `${contactInformation.firstName}`
                                :   "Chris"
                            }
                            {contactInformation?.lastName ?
                                    ` ${contactInformation.lastName}`
                                :   " Candidate"
                            }
                        </span>
                        <span className="job">
                            {contactInformation?.jobTitle ?
                                    contactInformation.jobTitle
                                :   "Human Resource Manager"
                            }
                        </span>
                    </div>
                    <div className="location">
                        <div>
                            {contactInformation?.address ?
                                    contactInformation.address
                                :   "4759 Sunnydale Lane"
                            }
                        </div>
                        <div>
                            {contactInformation?.city ?
                                    `${contactInformation.city} ${contactInformation.state} ${contactInformation.zip}`
                                :   `Plano, ${contactInformation.state? contactInformation.state : "TX"}, ${contactInformation.zip? contactInformation.zip : "75071"}`
                            }
                        </div>
                        <div>
                            {contactInformation?.email ?
                                    contactInformation.email
                                :   "email@youremail.com"
                            }
                        </div>
                        <div>
                            {contactInformation?.phone ?
                                    contactInformation.phone
                                :   "469-358-2948"
                            }
                        </div>
                        <div>
                            {contactInformation?.showLinks && contactInformation?.links ?
                                    contactInformation.links.map(showLink=>{
                                        return <div key={showLink.id}>
                                                    {showLink.label? `${showLink.label} : ${showLink.link}` : null}
                                                </div>
                                    })
                                :   null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-bio">
                {bio? bio :
                    "Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees and helping department managers improve employee performance. Worked with labor unions to negotiate compensation packages for workers. Organized new hire training initiatives as well as ongoing training to adhere to workplace safety standards. Worked with OSHA to ensure that all safety regulations are followed."
                }
            </div>
            <div className="form-experience">
                <div className="form-heading">
                    Professional Experience
                </div>
                {workInfo?.map(work=>{
                    return  <div className="form-content" key={work.id}>
                                <span className="form-sub-heading">
                                    { work.position || "Human Resources Manager"}
                                </span>
                                <span>
                                    {`${ work.companyName || "Jim's Widget Factory, Plano, TX"} ${work.startMonth? " | "+work.startMonth : (work.companyName?"":"| January")} ${ work.startYear || (work.companyName?"":"2016")} ${ work.endMonth ? " - "+work.endMonth : (work.companyName?"":"- November")} ${work.endYear || (work.companyName?"":"2022")}`}
                                </span>
                                <div className="form-ul-description">
                                    { work.description
                                       ||   <ul className="ul-list">
                                                <li>
                                                    Implement effective company policies to ensure that all practices comply with labor and employment regulations
                                                </li>
                                                <li>
                                                    Increased employee retention rates by managing workplace satisfaction to an over 90% success rate by creating and maintaining a positive work environment
                                                </li>
                                                <li>
                                                    Develop targeted outreach practices to increase minority recruitment and ensure compliance with affirmative action policies
                                                </li>
                                                <li>
                                                    Monitor scheduled in and out times as well as employee breaks to ensure that proper employment laws are met
                                                </li>
                                            </ul>
                                    }
                                </div>
                            </div>
                    })
                }
                {workInfo[0]?.description ? null
                    :   <div className="form-content">
                            <span className="form-sub-heading">
                                Human Resources Associate
                            </span>
                            <span>
                                Jim's Widget Factory, Plano, TX | March 2015 - January 2016
                            </span>
                            <div className="form-ul-description">
                                <ul className="ul-list">
                                    <li>
                                        Implement effective company policies to ensure that all practices comply with labor and employment regulations
                                    </li>
                                    <li>
                                        Increased employee retention rates by managing workplace satisfaction to an over 90% success rate by creating and maintaining a positive work environment
                                    </li>
                                    <li>
                                        Develop targeted outreach practices to increase minority recruitment and ensure compliance with affirmative action policies
                                    </li>
                                </ul>
                            </div>
                        </div>
                }
            </div>
            <div className="form-education">
                <div className="form-heading">
                    Education
                </div>
                {educationInfo.map(education => {
                    return education.schoolName ?
                                    <div className="form-content" key={education.id}>
                                        <span className="form-sub-heading">
                                            {`${education.degree || ''} ${education.fieldOfStudy ? "in "+education.fieldOfStudy : ""}`}
                                        </span>
                                        <span>
                                            {`${education.schoolName} ${education?.schoolLocation? "at "+education.schoolLocation: ""} ${education?.startMonth? "| "+education.startMonth : ""} ${education?.startYear? education.startYear : ""} ${education?.endMonth? "- "+education.endMonth : ""} ${education?.endYear? education.endYear : ""}`}
                                        </span>
                                        <div className="form-ul-description">
                                            {education?.description? education.description:""}
                                        </div>
                                    </div> 
                                    
                                :   <div className="form-content" key={education.id}>
                                        <span className="form-sub-heading">
                                            {`${education.degree || 'Masters'} ${education.fieldOfStudy ? "in "+education.fieldOfStudy : " in Human Resources"}`}
                                        </span>
                                        <span>
                                            {`${education.schoolName || "The University of Texas"} at ${education?.schoolLocation || "Dallas"} | ${education.startMonth || "September"} ${ education.startYear || "2007"} - ${education.endMonth || "May"} ${education.endYear || "2011"}`}
                                        </span>
                                        <div className="form-ul-description">
                                            {education?.description? education.description
                                                :<ul className="ul-list">
                                                    <li>Academic Awardee of AY 2007-2008</li>
                                                </ul>
                                            }
                                        </div>
                                    </div>
                            
                })}
                
            </div>
            <div className="form-skills">
                <div className="form-heading">
                    Key Skills
                </div>
                <div className="form-content">
                    <div className="form-ul-description">
                        <ul className="ul-list">
                            {(skills.filter(skill=>skill.value!=="").length!==0)?
                                skills.filter(skill=>skill.value!=="").map(skill=>{
                                    return <li key={skill.id}>{skill.value}</li>
                                })
                            :<>
                                <li>Detail oriented</li>
                                <li>Well-versed in Texas employment law</li>
                                <li>Excellent written and oral communication skills</li>
                                <li>Develops positive workplace relationships</li>
                            </>}
                        </ul>
                    </div>
                </div>
            </div>
            
        </form>
        </div>
            
        <div className="flex-prev-down-btn-group">
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={(e)=>handlePreviewPage(e)}
                    style={{color: "blue", backgroundColor: "lightblue", margin:"0 0 0.2em 0"}}
                >Preview
                </Button>
                <Button
                    color="default"
                    variant="outlined"
                    onClick={(e)=>handleDownloadPage(e)}
                    style={{ color:(step<7)?"black":"green", backgroundColor: (step<7)?"lightgray":"lightgreen", margin:"0 0 0.2em 0.5em"}}
                    disabled={step<7}
                >Download
                </Button>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll='body'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            {/* <DialogTitle id="scroll-dialog-title">Preview</DialogTitle> */}
            <DialogContent>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                >
                    {parse(getPreviewContent()?.toString() || '')}
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions> */}
        </Dialog>
    </>
  )
}

export default ResumePage