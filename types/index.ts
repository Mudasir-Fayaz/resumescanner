import { ReactNode } from "react";

export type Job = {
    label: string;
    description: string;
    skills: string[];
}

export type Tip = {
    text: string;
    important: boolean
}

export interface TipItemProps {
    tip: Tip;
    index: number;
}

export type BenchMark = {
    id:number;
    name:string;
    passed:boolean
}

type AtsType = {
    score: number;
    benchmarks: BenchMark[];
}
export interface AtsStats {
   atsStats: AtsType
}

export type Career =  {
    title: string;
    description: string;
    timeline: number;
    salary:number;
    difficulty: number;
    progress: string[];
  }

  export interface CareerProp {
    careerPaths: Career[]
  }

  export interface CareerItemProp {
    career: Career;
    index:number;
  }

  export interface DifficultyProp {
    difficulty:number;
  }

  export type ActiveTab = keyof ViewComponents; 
  
  export type MenuItem = {
    id:ActiveTab;
    icon:any;
    label:string;
  }

  export interface MenuItemProp {
    item:MenuItem;
}

// types.ts

interface ResumeScoreProps {
    data: any; // Replace 'any' with the appropriate type for resumeData
  }
  
  interface SkillAssessmentProps {
    resumeData: any; // Replace 'any' with the appropriate type
  }
  
  interface ResumeSectionProps {
    resumeData: any; // Replace 'any' with the appropriate type
  }
  
  interface ATSResumeScannerProps {
    atsStats: any; // Replace 'any' with the appropriate type
  }
  
  interface ResumeBenchmarksProps {
    resumeData: any; // Replace 'any' with the appropriate type
  }
  
  interface CareersPathProps {
    careerPaths: any; // Replace 'any' with the appropriate type
  }

  
  // types.ts

  
  
  
export type ViewComponents = {
    score: React.ReactElement<ResumeScoreProps>;
    skills: React.ReactElement<SkillAssessmentProps>;
    achievements: React.ReactElement<ResumeSectionProps>;
    "ats-score": React.ReactElement<ATSResumeScannerProps>;
    "ats-tips": React.ReactElement<ResumeBenchmarksProps>;
    "career-map": React.ReactElement<CareersPathProps>;
};
// Assuming ViewComponents is the type defined for your viewComponents
type SkillItem = {
  skill: string;
  level: number;
}



type SkillLearn = {
  name:string;
  description:string
}

type SkillOveriew = {
    workExperience: SkillItem[];
    jobDescription: SkillItem[];
    projects: SkillItem[];
    skillsToLearn: SkillLearn[]
}

  export interface SkillOverviewProp {
    skillOverview: SkillOveriew
  }

  
export interface SkillBarProp {
    skill:string;
    level:number;
    color:string;
  }
  export interface SkillLearnProp {
    skill:string;
    description:string;
    index:number;
  }

  type SkillMatch = {
    skill: string;
    match: boolean
  }

  type SkillStats = {
skill:string;
value:number;
match: boolean
  }
  
  type ResumeOverview = {
    resumeScore: number;
    skillsMatched: SkillMatch[];
    skillPerformance: SkillStats[];
  }
  export interface ResumeStatsProp {
   resumeOverview:ResumeOverview;
  }

type Work = {
    id:number;
    title:string;
    company:string;
    duration:string;
    description:string;
}

type Project = {
    id:number;
    title:string;
    
    description:string;
}

type Certs = {
    id:number;
    title:string;
    issuer:string;
    date:string;
    description:string;
}

type Education = {
    id:number;
    degree: string;
    institution:string;
    year:number;
    description:string;
}

type Achievement = {
    workExperience: Work[];
    projects: Project[];
    certifications:Certs[];
    education:Education[];
}
  export interface ExperienceProp {
  achievements: Achievement
}
type Intro = {
    name:string;
    email:string;
    phone:string;
    github:string;
    portfolio:string;
    linkedin:string;
}
export type ResumeData = {
    introduction: Intro;
    resumeOverview: ResumeOverview;
    skillOverview:SkillOveriew;
        
        achievements: Achievement;
        atsOverview: AtsType;
        careerPaths: Career[];}
export interface ResumeDataProp {
    resumeData: ResumeData;
}

export interface SectionCardProp {
    title:string;
    icon:any;
    children:ReactNode;
}

export interface ScannerAnimProp {
    data:ResumeData | undefined;
    setLoading: (value:boolean) => void;
}