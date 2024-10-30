import { Job } from "@/types"
export const resumeTips = [
    {
      category: "Format",
      tips: [
        { text: "Use a clean, simple layout", important: true },
        { text: "Stick to standard fonts like Arial or Calibri", important: false },
        { text: "Use consistent formatting throughout", important: true },
        { text: "Save your resume as a PDF", important: true },
      ],
    },
    {
      category: "Content",
      tips: [
        { text: "Include your full name and contact information at the top", important: true },
        { text: "Use a clear, concise summary or objective statement", important: true },
        { text: "List your work experience in reverse chronological order", important: true },
        { text: "Use bullet points to describe your achievements and responsibilities", important: false },
      ],
    },
    {
      category: "Keywords",
      tips: [
        { text: "Include relevant keywords from the job description", important: true },
        { text: "Use industry-specific terminology", important: true },
        { text: "Avoid overusing keywords (keyword stuffing)", important: true },
        { text: "Spell out acronyms at least once", important: false },
      ],
    },
    {
      category: "Customization",
      tips: [
        { text: "Tailor your resume for each job application", important: true },
        { text: "Highlight skills and experiences most relevant to the position", important: true },
        { text: "Use the same job title as in the job posting, if applicable", important: false },
        { text: "Quantify your achievements with numbers and percentages", important: true },
      ],
    },
  ]
  

  
export const predefinedJobs:Job[] = [
    {
      "label": "Frontend Developer",
      "description": "We are looking for a skilled Frontend Developer proficient in React and modern JavaScript.",
      "skills": ["React", "JavaScript", "HTML", "CSS", "Redux"]
    },
    {
      "label": "Backend Developer",
      "description": "Seeking an experienced Backend Developer to build scalable APIs using Node.js and Express.",
      "skills": ["Node.js", "Express", "MongoDB", "RESTful APIs", "JavaScript"]
    },
    {
      "label": "Full Stack Developer",
      "description": "Join our team as a Full Stack Developer with expertise in MERN stack.",
      "skills": ["MongoDB", "Express", "React", "Node.js", "JavaScript"]
    },
    {
      "label": "Data Analyst",
      "description": "Analyze large data sets to provide actionable insights using Python and SQL.",
      "skills": ["Python", "SQL", "Data Visualization", "Pandas", "Excel"]
    },
   
    {
      "label": "Machine Learning Engineer",
      "description": "Develop and deploy machine learning models using TensorFlow and Python.",
      "skills": ["Python", "TensorFlow", "Machine Learning", "Data Science", "Pandas"]
    },
    {
      "label": "Digital Marketing Specialist",
      "description": "Create and manage online marketing campaigns to drive traffic and increase engagement.",
      "skills": ["SEO", "Google Analytics", "Content Marketing", "Social Media", "PPC"]
    },
    {
      "label": "UX/UI Designer",
      "description": "Design user interfaces and experiences for web and mobile applications.",
      "skills": ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"]
    },
    {
      "label": "DevOps Engineer",
      "description": "Implement CI/CD pipelines and manage cloud infrastructure using AWS and Docker.",
      "skills": ["AWS", "Docker", "Kubernetes", "Jenkins", "CI/CD"]
    },
    {
      "label": "Content Writer",
      "description": "Write and edit content for blogs, social media, and websites.",
      "skills": ["Content Writing", "SEO", "Copywriting", "Research", "Editing"]
    },
    {
      "label": "Mobile App Developer",
      "description": "Develop mobile applications for iOS and Android using React Native.",
      "skills": ["React Native", "JavaScript", "iOS Development", "Android Development", "API Integration"]
    },
    {
      "label": "Cloud Engineer",
      "description": "Manage and optimize cloud resources for high availability and cost efficiency.",
      "skills": ["AWS", "Azure", "Google Cloud Platform", "Terraform", "Cloud Security"]
    },
    {
      "label": "Cybersecurity Analyst",
      "description": "Monitor and protect networks from security threats and vulnerabilities.",
      "skills": ["Network Security", "Firewalls", "SIEM", "Penetration Testing", "Incident Response"]
    },
    {
      "label": "Product Manager",
      "description": "Oversee product development and work closely with stakeholders to define requirements.",
      "skills": ["Product Management", "Agile", "Roadmap Planning", "User Stories", "Market Research"]
    },
    {
      "label": "Data Scientist",
      "description": "Use data analysis and machine learning techniques to solve complex problems.",
      "skills": ["Python", "R", "Machine Learning", "Data Analysis", "Scikit-Learn"]
    },
    {
      "label": "Technical Support Specialist",
      "description": "Provide technical support to customers and resolve software-related issues.",
      "skills": ["Troubleshooting", "Customer Service", "Windows", "Linux", "Remote Support"]
    }
  ]

  export const skillSuggestions = [  'HTML', 'CSS', 'TypeScript', 'GraphQL', 'Vue.js', 'Angular', 'Django', 'Flask',  'Ruby on Rails', 'PHP', 'Laravel', 'MongoDB', 'PostgreSQL', 'NoSQL', 'Redis',  'Firebase', 'TensorFlow', 'PyTorch', 'Natural Language Processing (NLP)',  'Computer Vision', 'Deep Learning', 'Data Mining', 'Big Data', 'Apache Spark',  'Hadoop', 'Tableau', 'Power BI', 'Google Analytics', 'SEO', 'Content Marketing',  'Copywriting', 'Digital Marketing', 'Social Media Management', 'Email Marketing',  'Salesforce', 'CRM Systems', 'UI Design', 'Wireframing', 'Prototyping',  'Information Architecture', 'Usability Testing', 'Scrum', 'JIRA', 'CI/CD',  'Terraform', 'Ansible', 'Linux', 'Azure', 'Google Cloud Platform (GCP)',  'Microservices', 'REST APIs']
  
  