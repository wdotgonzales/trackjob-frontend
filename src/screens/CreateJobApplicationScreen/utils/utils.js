
export const ReturnJobApplicationStatusTextValueById = (job_application_id) => {
    switch(job_application_id){
        case 1:
            return "Applied";
        case 2:
            return "Under Review";
        case 3:
            return "Interview Scheduled";
        case 4:
            return "Offer Received";
        case 5:
            return "Accepted Offer";
        case 6:
            return "Rejected";
        case 7:
            return "Ghosted";
        case 8:
            return "Closed/Withdraw";
    }
}

export const ReturnWorkArrangementValueById = (work_arrangement_id) => {
    switch(work_arrangement_id){
        case 1:
            return "On-site";
        case 2:
            return "Remote";
        case 3:
            return "Hybrid";
    }
}

export const ReturnEmploymentTypeValueById = (employment_type_id) => {
    switch(employment_type_id){
        case 1:
            return "Full-time";
        case 2:
            return "Part-time";
        case 3:
            return "Contract";
        case 4:
            return "Internship";
        case 5:
            return "Temporary";
        case 6:
            return "Freelance";
    }
}   