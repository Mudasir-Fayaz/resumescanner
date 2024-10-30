import { NextRequest } from "next/server";
import Together from "together-ai";

if (!process.env.TOGETHER_API_KEY) {
  throw new Error("Missing env var from Together.ai");
}



const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});


export const POST = async (req: NextRequest): Promise<Response> => {
    const {resumeContent, jobDescription } = (await req.json()) as {resumeContent:string, jobDescription:string};
  if(!resumeContent){
    return new Response("No resume content in the request", { status: 400   
    });
  }
    if (!jobDescription) {
      return new Response("No job description in the request", { status: 400   
   });
    }
    
    const response = await together.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a expert resume analyzer .Your analysis should be based on resume content and job description provided to you. You should response only with JSON given pattern and nothing else."},
            { role: "user", content: `RESPONSE ONLY WITH JSON AND NOTHING ELSE:
                RESUME CONTENT: ${resumeContent}
            JOB DESCRIPTION: ${jobDescription}

              {introduction: {
              name: name,
              email: email ,
              phone: phone number,
              github: set https github link,
              portfolio:set https portfolio link,
              linkedin: set https
              },
resumeOverview: {
              resumeScore: resume score from 100 based on job description and skills matched,
              skillsMatched:[
               { skill: name of skill from job description, match: matched with resume true or false },
   {...}
              ],
              skillPerformance:[
               { skill: skill in resume, value: score based on projects and experience, fullMark: 100 },
{...}
            ]},
skillOverview: {
based on job description, resume content work experience projects fill data in following
 workExperience: [
    { skill: skill name, level: based on work experience write overall skill level from 100 },
    {...}
  ],
  projects: [
    { skill: skill name, level: based on work projects write overall skill level from 100 },
    {...}
  ],
  jobDescription: [
    { skill: skill name, level: based on job write overall skill level from 100 },
    {...}
  ],
  based resume skills write data for skills to learn
   skillsToLearn: [
    {
      name: skill name,
      description:skill description,
    },
    {...}]}
              ,
analyse resume content and write work experience mentioned in resume content in achievements property in following pattern

             achievements: {workExperience: [
              { id: item id,
              title: work title based on resume,
              company: company name based on resume,
              duration: work duration based on resume,
              description: work description based on resume
              }, {...}
              ],
           
            projects: [
            {id: item id,
            title: project title based on resume,
            description: project descriptions based on resume
            },
            {...}
            ],
          
certifications: [
{id: item id,title: certificate title,
issuer: name,
date: issue date if available,
description: certificate description},
{...}
],

education: [
{id: item id,
degree: title of degree,
institution: name of institution,
year: year mentioned,
description: degree description
},
{...}]},

based on resume content and job description write ats performance of resume in following pattern:
atsOverview: {score: calculate ats score totally based on ats benchmarks and resume content also don't match it with resume score,
benchmarks:[
      { id: 1, name: 'Contact Details', passed: does resume content contain this benchmark or not true or false },
      { id: 2, name: 'Relevant Skills', passed: does resume content contain this benchmark or not true or false },
      { id: 3, name: 'Work Experience', passed: does resume content contain this benchmark or not true or false },
      { id: 4, name: 'Education', passed: does resume content contain this benchmark or not true or false },
      { id: 5, name: 'Formatting', passed: does resume content contain this benchmark or not true or false },
      { id: 6, name: 'Keywords', passed: does resume content contain this benchmark or not true or false },
      { id: 7, name: 'Certifications', passed: does resume content contain this benchmark or not true or false },
    ]},
            write 6 career paths based on skills mentioned in resume content in follwing pattern also with career progress
              careerPaths:[{ "title": "UX Designer",
        "description": "Creates user-centered design solutions to improve product usability and user experience.",
        "timeline": "3-6 months",
        "salary": expected salary in numbers,
        "difficulty": level 1-5,
        progress:['Junior Designer', 'Mid-level Designer','Senior Designer']},{...}]}` },
          ],
          model: "meta-llama/Llama-Vision-Free",
          max_tokens: 10000,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
          stop: ["<|eot_id|>","<|eom_id|>"],
          stream: false

    });
  
   
    let rawResponse: string | null | undefined = '';
   
    let generatedBios: {} = {};
    rawResponse = response.choices[0].message?.content;
//     const jsonMatch = rawResponse?.replace(/^[^{]*({})[^}]*$/, '$1');
 
//   if (jsonMatch) {
//     try {
//         generatedBios = JSON.parse(jsonMatch || '[]')
      
//     } catch (error) {
//       console.error('Invalid JSON format:', error);
//     }
//   }
const regex = /{[\s\S]*}/;
const match = rawResponse?.match(regex);

if (match) {
   rawResponse = match[0];

} else {
  console.log("No JSON object found.");
}
generatedBios = JSON.parse(rawResponse?.replaceAll(`'`,`"`) || '{}')
    return Response.json(generatedBios)
    
  };



