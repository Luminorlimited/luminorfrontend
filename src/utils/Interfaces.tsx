export interface UserInterface {
    name?: string; // optional, as not all responses may include it
    email: string;
    role: string;
    photoUrl?: string;
    token?: string; // add token if needed for user convenience
}



export interface  ClientData {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    dateOfBirth: string; 
    phoneNumber: string;
    businessType: string;
    jobTitle: string;
    role: string;
    linkedinProfile: string;
}
export interface IProfessional {
    name: {
        firstName: string;
        lastName: string;
    };
    dateOfBirth: Date;
    email: string;
    phoneNumber: string;
    role: string;
    cvOrCoverLetter: string;
    password: string;
    previousPositions: { position: string }[];  // Updated type here
    references: { name: string; emailOrPhone: string }[];  // Keep this as it is
    educationalBackground: string;
    relevantQualification: string;
    technicalSkill?: string;
    linkedinProfile: string;
    industry: string[];
    businessType: string;
}

