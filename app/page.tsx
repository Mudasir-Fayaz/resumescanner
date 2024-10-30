'use client';
import { useCallback, useState } from "react";

import { motion } from "framer-motion"
import  { useDropzone, DropzoneOptions } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  FileText, UploadIcon} from "lucide-react";

import ButtonUpload from "@/components/button-upload";
import ScannerAnim from "@/components/scanner";

import NavigationMenu from "@/components/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Job, ResumeData, CustomError } from "@/types";
import { predefinedJobs } from "@/variables/constant";
import Error from "@/components/error";




export default function Home() {
  
  const [file, setFile] = useState<File | null | undefined>()
  const [pdfContent, setPdfText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>("")
  const [requiredSkills, setRequiredSkills] = useState<string>("")
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false)
  
const [resumeData, setResumeData] = useState<ResumeData | null | undefined>()
const fetchPdf = async (resumeUrl:string) => {
   setError(false)
  try {
    
    const response = await fetch('/api/parsePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeUrl }),
    });

    if (!response.ok) {
      throw {
        message: 'Failed to parse PDF',
        code: 1001, // Custom error code
        details: 'The provided data format is not valid.',
      } as CustomError; 
      setError(true)
    }

    const data = await response.json();
    
setPdfText(data)       
  } catch (error) {
    console.error('Error:', error);
  }
};
  const onDrop = useCallback(async (acceptedFiles:File[]) => {
    const file:File | null = acceptedFiles ? acceptedFiles[0]:null;
    setError(false)
    if(file){
      setFile(file)
      const formData = new FormData();
      formData.append('file', file);

      
        const response = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw {
            message: 'Failed to get PDF url',
            code: 1001, // Custom error code
            details: 'The tmpfiles has put limit on api.',
          } as CustomError; 
        }

        const fileData = await response.json();
      const fileUrl = fileData.data.url.replaceAll('org/','org/dl/');
        
fetchPdf(fileUrl)
      
  }
  else{
  console.log('Pick PDF Resume File')}
  }, [])


 
  const dropzoneOptions: DropzoneOptions = { onDrop };
  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);
  // Type assertion for the root props
  const dropzoneProps = getRootProps() as React.HTMLProps<HTMLDivElement>;

  
  const handleJobSelect = (value:string) => {
    const job:(Job | undefined) = predefinedJobs.find(job => job.label === value);
    setSelectedJob(value)
    setJobDescription(job ? job.description :'')
    setRequiredSkills(job ? job.skills.join(", ") :'')
  }
const resetUpload = () => {
  setFile(null)
  setResumeData(null);
  setPdfText('')
  setJobDescription('')
  setSelectedJob('')
  setError(false)
}

async function scanResume() {
 setError(false)
  setLoading(true)
  const response = await fetch('/api/scanResume',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resumeContent: pdfContent,
      jobDescription: 'Job Description: ' + jobDescription + '\n Required Skills:' + requiredSkills
    }),
  });
  if (!response.ok) {
      
    console.error('Failed to fetch:', response.statusText);
    setLoading(false);
    setError(true)
    return;
  }
 setResumeData(await response.json())
 
  }
 
  const handleUploadAnim = () => {
    setTimeout(()=> {
scanResume()
    },3000)}

  return ( <>
  <Header />
   <div className="container max-w-3xl mx-auto">
{(!loading && !resumeData) && ( <> <Card className="w-full max-w-3xl mx-auto my-4">
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
        </CardHeader>
        <CardContent>
       <div  {...dropzoneProps}>

       
          <motion.div
           
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            <input {...getInputProps()} />
            {file ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
                
              >
                <FileText className="w-8 h-8 text-green-500 mr-2" />
                <span>{file.name}</span>
              </motion.div>
            ) : (
              <div>
               <UploadIcon className="mx-auto mb-4" size={48} />
                {isDragActive ? (
            <p>Drop the resume here ...</p>
          ) : (<p>Drag and drop your resume here, or click to select a file</p>)}
              </div>
            )}
          </motion.div>
           </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-3xl mx-auto mb-4">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="predefined-jobs" className="block text-sm font-medium mb-1">
              Select a Predefined Job
            </label>
            <Select onValueChange={handleJobSelect}>
              <SelectTrigger id="predefined-jobs">
                <SelectValue placeholder="Choose a job title" />
              </SelectTrigger>
              <SelectContent>
                {predefinedJobs.map((job) => (
                  <SelectItem key={job.label} value={job.label}>
                    {job.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="job-description" className="block text-sm font-medium mb-1">
              Job Description
            </label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter the job description"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="required-skills" className="block text-sm font-medium mb-1">
              Required Skills
            </label>
            <Input
              id="required-skills"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="Enter required skills, separated by commas"
            />
          </div>
        </div>
      </CardContent>
    </Card> 
    </>)
      }


{/* content */}
  {error && <Error />}
    {(!loading && jobDescription && !resumeData) && <ButtonUpload handleClick={handleUploadAnim}/>}
    {loading && <ScannerAnim data={resumeData} setLoading={setLoading}/>}
  </div>
{(resumeData && !loading)? (<>
  <NavigationMenu resumeData={resumeData} myFile={file} handleReset={resetUpload}/>

</>) : ''}
<Footer />
  </>
  );
}

