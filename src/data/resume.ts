// All site content lives in this file. See CONTENT-GUIDE.md for what each value controls.
// Content is taken from Resume-Pavan-Updated-v2.docx.

export const profile = {
  name: 'Pavan Kalyan Kama',
  shortName: 'Pavan',
  role: 'Dot Net Developer',
  email: 'pavankalyankama99@gmail.com',
  phone: '+91 8885394611',
  address: 'D.no:2-46, Pedanandipadu, Pedanandipadu, Guntur - 522235.',
  experience: '5.10',
  resumeFile: '/Resume-Pavan-Kalyan-Kama.docx',
  currentProject: 'CM-Core',
  // Profile photo: copy the image into /public and set its path here, e.g. '/profile.png'.
  // Leave it empty ('') to show the code window instead.
  photo: '',
};

export const home = {
  // Words inside [square brackets] are shown in purple.
  headline: 'is a [Dot Net developer] building [enterprise web applications]',
  lead: 'He crafts scalable solutions with ASP.NET Core, Web API, Angular, React and microservices',
  quote: { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  contactIntro:
    "I'm open to new opportunities. However, if you have other request or question, don't hesitate to contact me",
};

export const pageSubtitles = {
  works: 'List of my projects',
  about: 'Who am i?',
  contacts: 'Get in touch',
};

export const summary: string[] = [
  'Dot Net Developer with around 5.10 years of IT experience covering all phases of the Software Design Life Cycle (SDLC) including Analysis, Design, Development, Testing, and Support of Web Applications, based on Object Oriented Programming (OOP), Client/Server, N-tier architecture, Web based and Internet Technologies.',
  'Experienced in building enterprise web applications using ASP.NET Core, Web API, Angular, and microservices/micro-frontend architectures. Skilled in translating business requirements into scalable solutions with multi-level approval workflows, role-based access control, tenant scoping, and scheduled publication features.',
  'Proficient in AI-assisted development using GitHub Copilot, Cursor, and Claude to improve productivity, code quality, and delivery speed. Worked closely with business analysts and converted the requirements into Dot Net code.',
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: 'Languages', items: ['C#', 'T-SQL', 'PL/SQL', 'JavaScript', 'TypeScript'] },
  { title: 'Databases', items: ['MS SQL', 'PostgreSQL', 'MongoDB'] },
  {
    title: 'Frameworks',
    items: ['Dot Net Core', 'Asp.Net', 'Asp.Net MVC', 'Asp.Net Core', 'WEB API', 'Entity Framework', 'Dapper', 'LINQ', 'WCF'],
  },
  {
    title: 'Front-end',
    items: ['Angular 16, 18 & 20', 'React', 'RxJS', 'Nx', 'Module Federation', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Architecture',
    items: [
      'Microservices',
      'Micro-frontend',
      'REST APIs',
      'Multi-tenant',
      'RBAC',
      'Caching (IMemoryCache)',
      'Performance Tuning & Query Optimization',
    ],
  },
  {
    title: 'DevOps',
    items: ['TFS', 'Git', 'Azure DevOps CI/CD', 'Docker', 'Azure Container Apps'],
  },
  {
    title: 'Tools',
    items: [
      'Visual Studio .NET',
      'SQL Server Management Studio',
      'pgAdmin',
      'Visual Studio Code',
      'Postman',
      'GitHub Copilot',
      'Cursor',
      'Claude',
    ],
  },
  { title: 'Methodologies', items: ['Agile', 'Scrum'] },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  tech: string[];
  description: string;
  responsibilities: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'cm-core',
    name: 'CM-Core',
    tagline: 'Campaign Management Platform',
    duration: 'Jan 2025 - Present',
    tech: ['C#', 'ASP.NET Core 9', 'Web API', 'Entity Framework Core', 'SQL Server', 'Angular 20', 'Nx', 'Module Federation', 'TypeScript', 'Tailwind CSS'],
    description:
      'CM-Core (CM 2.0) is an enterprise campaign management platform for digital asset and template library management, multi-level approval workflows, and scheduled publication of marketing content. The solution uses a micro-frontend architecture with Angular Nx remotes (Library, Approvals, Campaigns, Dashboard) integrated with .NET microservices (Auth, Core, Campaign). It supports tenant-scoped access control, approval policies, publish-now/publish-later scheduling, effective date validation, and automatic content expiration.',
    responsibilities: [
      'Responsible for implementing publish configuration for assets and templates with scheduled publication, effective from/to validation, and 30-day minimum span enforcement.',
      'Responsible for multi-level approval policy integration, final-level approver publish configuration, and approval review workflows.',
      'Developed reusable shared UI components and synchronized frontend/backend validation for publication schedules and effective dates.',
      'Implemented background expiration services to automatically mark assets and templates as Expired when effective end dates pass.',
      'Enhanced access-point and tenant scoping for role-based permissions across library and approval modules.',
      'Worked on API contract alignment between Angular services and .NET Core microservices with unit test coverage.',
      'Leveraged AI coding assistants (GitHub Copilot, Cursor, and Claude) for rapid root-cause analysis, query and API performance optimization, and automated code generation across the Auth, Library, and Campaign microservices, accelerating debugging cycles and feature delivery.',
    ],
    accent: '#C778DD',
  },
  {
    slug: 'ipay-billpay',
    name: 'iPay-BillPay',
    tagline: 'Online banking & bill payments',
    duration: 'Jan 2024 - Dec 2024',
    tech: ['C#', 'ASP.NET Core', 'Web Api', 'SQL Server', 'React'],
    description:
      "iPay-BillPay is a banking application which is under Jack Henry Associations. The Associations addresses the trade finance, lending, payments, limits, collateral's, treasury, deposits, liquidity management, online banking and mobile banking requirements of corporate banks worldwide and enables them to deliver customized offerings to enterprise clients of all sizes. It provides services to different type of banking like retail banking, corporate banking. The most of the world's leading banks choose Online Banking to offer more features to their customers. Retail customers get full visibility into all their banking accounts and are enabled to transfer and schedule recurring payments safely. As well as corporate customers can manage their unique cash management policies to manage receivables, payables, account services and investments, efficiently.",
    responsibilities: [
      'Responsible for analyzing the flow of data, analysis of data mismatch and various business related issues.',
      'Responsible for sending money or making transfers from one to many and one to one.',
      'System knowledge sharing and updating/ modifying Design Documents',
      "Implementation activities based on Client's requirement.",
      'Analysis and maintenance of Database.',
      'Creating Queries to generate reports based on given conditions.',
      'Implementing Queries to make scripts execute only onetime in the whole execution.',
      'Collaborated with cross-functional teams in an Agile/Scrum environment, participating in sprint planning and code reviews to deliver secure, high-availability banking features on schedule.',
    ],
    accent: '#61AFEF',
  },
  {
    slug: 'gastly',
    name: 'Gastly',
    tagline: 'Online tax & transaction payments',
    duration: 'Sep 2023 - Jan 2024',
    tech: ['C#', 'ASP.NET Core', 'Web Api', 'SQL Server', 'T-SQL', 'Angular14', 'HTML5', 'CSS3'],
    description:
      "Gastly was developed under KPMG to provide services to their customers such as making online transactions and paying tax's of their own consumption's as per their basis. This one will enables to user better way to make or pay their cash related transactions through online very securely. Allows users to calculate, report, and pay their taxes based on their consumption patterns and financial activities and then supports various payment methods, including bank transfers, credit/debit cards, and digital wallets.",
    responsibilities: [
      'Responsible for analyzing the flow of data, analysis of data mismatch and various business related issues.',
      'System knowledge sharing and updating/ modifying Design Documents.',
      "Implementation activities based on Client's requirement.",
      'Analysis and maintenance of Database.',
      'Creating Queries to generate reports based on given conditions.',
      'Designed with an intuitive UI/UX to provide a seamless experience for users managing their payments and transactions',
      'Integrated secure payment gateways and digital wallet support, ensuring compliance with financial data-handling best practices.',
    ],
    accent: '#98C379',
  },
  {
    slug: 'amr',
    name: 'AMR',
    tagline: 'Automatic Meter Reading',
    duration: 'May 2022 - Aug 2023',
    tech: ['C#', 'ASP.NET Core', 'Web Api', 'SQL Server', 'T-SQL', 'Angular11', 'HTML5', 'CSS3'],
    description:
      'Implemented and maintained Automatic Meter Reading (AMR) technology to enhance utility data collection and monitoring. Utilized various communication methods (radio, telephone, power line communication) for remote data transmission, ensuring high accuracy, efficiency, and real-time consumption tracking. Expertise in both walk-by/drive-by and fixed network AMR systems, contributing to optimized billing, resource management, and consumer awareness. Demonstrated ability to streamline utility operations and improve customer satisfaction through advanced AMR solutions. The transmitter unit consists of a reed switch that reads the meter data, board that processes the data, and an RF transmitter that sends the data to the receiver unit. The receiver unit then displays the data on an LCD screen.',
    responsibilities: [
      'Interaction with Client for Requirement Analysis.',
      'Enhancing and Developing various rules in the application according to customer business requirements.',
      'System knowledge sharing and updating/ modifying Design Documents.',
      'Implementation activities.',
      'Analysis and maintenance of Database.',
      'Creating Queries to generate reports based on given conditions.',
      'Responsible for analyzing the flow of data, analysis of data mismatch and various business related issues.',
      'Collaborated with cross-functional engineering teams to monitor system performance and resolve production issues, improving data accuracy and billing reliability.',
    ],
    accent: '#E5C07B',
  },
  {
    slug: 'psms',
    name: 'PSMS',
    tagline: 'Project State Management System',
    duration: 'Oct 2020 - Mar 2022',
    tech: ['C#', 'ASP.NET MVC', 'Entity Framework', 'JQuery', 'SQL Server'],
    description:
      'Implemented and maintained the Project State Management System (PSMS) to enhance both project schedule and safety management. Utilized standardized communication modules and methods based on the STEP (Standard for the Exchange of Product Data) Domain Object Model to synchronize project schedules across departments and companies. Integrated PSMS with PLM/ERP systems, supporting both conventional and agile methodologies, to ensure stable, efficient processes and improved collaboration. Developed tools for real-time safety reports, remote monitoring, and intervention, ensuring adherence to safety policies and reducing project site risks. Demonstrated expertise in optimizing project management and enhancing safety compliance through advanced PSMS solutions.',
    responsibilities: [
      'Design Web page and back-end coding using MVC structure.',
      'Analysis of current Website to understand the work-flow.',
      'Worked on the Application Design and Functional Specification documents.',
      'Responsible for analyzing the flow of data between various interfaces to create the application.',
      'Development of the code for the application and deploying it accordingly.',
      'Taking bottom-line responsibility for deliverables in all phases of the project implementation activities',
      'Contributed to process improvements that streamlined cross-department schedule synchronization, reducing manual coordination effort.',
    ],
    accent: '#E06C75',
  },
];

export type Job = { company: string; client?: string; period: string; current?: boolean };

export const experience: Job[] = [
  { company: 'IBridge Techsoft', client: 'Warrous', period: 'November 2025 - Present', current: true },
  { company: 'Aspire Systems Private Limited', period: 'September 2023 - July 2025' },
  { company: "Visionary Software Solution's Private Limited", period: 'July 2020 - July 2023' },
];

export const education = {
  degree: 'B.Sc',
  university: 'Acharya Nagarjuna University',
  year: '2020',
  score: '68.2%',
};

export const quickFacts: { text: string; highlights?: string[] }[] = [
  { text: 'Around 5.10 years of IT experience', highlights: ['5.10 years'] },
  { text: 'Covers all phases of the SDLC', highlights: ['SDLC'] },
  { text: 'B.Sc from Acharya Nagarjuna University, 2020', highlights: ['B.Sc', 'Acharya Nagarjuna University'] },
  { text: 'Builds with ASP.NET Core, Web API, Angular and React', highlights: ['ASP.NET Core', 'Web API', 'Angular', 'React'] },
  { text: 'Works in Agile / Scrum teams', highlights: ['Agile', 'Scrum'] },
  { text: 'AI-assisted development with GitHub Copilot, Cursor and Claude', highlights: ['GitHub Copilot', 'Cursor', 'Claude'] },
  { text: 'Microservices & micro-frontend architectures', highlights: ['Microservices', 'micro-frontend'] },
];
