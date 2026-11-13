-- ==============================================================================
-- LOCKIN Seed Reference Data
-- Branches, Roadmaps, Semesters, Milestones, Skills, Resources, and Projects
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SEED SKILLS
-- ------------------------------------------------------------------------------
INSERT INTO public.skills (id, name, category, icon_name, description, importance_level) VALUES
('11111111-0001-0000-0000-000000000001', 'Python Programming', 'Programming Language', 'Code', 'Foundational language for AI, data science, automation, and backend systems.', 'High'),
('11111111-0001-0000-0000-000000000002', 'Data Structures & Algorithms', 'Core CS', 'Binary', 'Essential problem-solving foundation for technical interviews and efficient software design.', 'High'),
('11111111-0001-0000-0000-000000000003', 'Machine Learning', 'Artificial Intelligence', 'Brain', 'Supervised, unsupervised algorithms, model evaluation, and scikit-learn.', 'High'),
('11111111-0001-0000-0000-000000000004', 'Deep Learning & Neural Networks', 'Artificial Intelligence', 'Cpu', 'Convolutional and Transformer architectures with PyTorch and TensorFlow.', 'High'),
('11111111-0001-0000-0000-000000000005', 'Relational Databases & SQL', 'Databases', 'Database', 'Query optimization, schema design, and ACID transactions using PostgreSQL/MySQL.', 'High'),
('11111111-0001-0000-0000-000000000006', 'Web Development (React & Node.js)', 'Full Stack', 'Globe', 'Modern component-driven web architectures, state management, and REST APIs.', 'Medium'),
('11111111-0001-0000-0000-000000000007', 'Embedded Systems & Microcontrollers', 'Hardware & IoT', 'Radio', 'Interfacing microcontrollers (ARM, ESP32, Arduino) with sensors and actuators.', 'High'),
('11111111-0001-0000-0000-000000000008', 'Digital Signal Processing', 'Electronics', 'Activity', 'Fourier transforms, filtering, and real-time audio/image processing algorithms.', 'High'),
('11111111-0001-0000-0000-000000000009', 'Computer-Aided Design (CAD)', 'Mechanical', 'PenTool', '3D modeling, parametric drafting, and assembly using SolidWorks / Fusion 360.', 'High'),
('11111111-0001-0000-0000-000000000010', 'Finite Element Analysis (FEA)', 'Mechanical', 'Layers', 'Stress, thermal, and deformation simulation using ANSYS / Abaqus.', 'Medium'),
('11111111-0001-0000-0000-000000000011', 'Structural Analysis', 'Civil Engineering', 'Building', 'Shear force, bending moments, and load distribution in concrete and steel structures.', 'High'),
('11111111-0001-0000-0000-000000000012', 'Power Electronics & Control Systems', 'Electrical', 'Zap', 'Inverters, converters, feedback control loops, and motor drive systems.', 'High')
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. SEED BRANCHES
-- ------------------------------------------------------------------------------
INSERT INTO public.branches (
  id, name, slug, short_name, tagline, description, why_choose, 
  subjects_overview, tools_technologies, career_opportunities, specializations, 
  industry_applications, higher_studies, icon_name, category, is_popular, hero_bg_accent
) VALUES
(
  '22222222-0001-0000-0000-000000000001',
  'Artificial Intelligence and Data Science',
  'ai-data-science',
  'AI & Data Science',
  'Turn data into innovation.',
  'Explore the world of artificial intelligence, machine learning, and data-driven technologies to solve complex predictive problems and build autonomous intelligent agents.',
  '["Unprecedented market demand across tech, finance, and healthcare", "Direct access to frontier AI engineering and research roles", "Opportunity to develop generative AI, autonomous systems, and predictive models", "Strong interdisciplinary foundation blending mathematics, algorithms, and domain modeling"]'::jsonb,
  '["Machine Learning", "Deep Learning", "Data Structures & Algorithms", "Applied Statistics & Probability", "Database Management Systems", "Natural Language Processing", "Computer Vision", "Big Data Analytics"]'::jsonb,
  '["Python", "PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "Jupyter", "SQL", "Hugging Face", "Docker"]'::jsonb,
  '[
    {"title": "Machine Learning Engineer", "avg_salary": "₹12 - 28 LPA", "growth": "Very High", "description": "Design and scale predictive ML systems in production pipelines."},
    {"title": "Data Scientist", "avg_salary": "₹10 - 24 LPA", "growth": "High", "description": "Extract strategic business insights and develop predictive statistical models."},
    {"title": "AI Research Scientist", "avg_salary": "₹18 - 40 LPA", "growth": "Exceptional", "description": "Conduct frontier research in foundational model architectures and reasoning."},
    {"title": "Data Engineer", "avg_salary": "₹9 - 22 LPA", "growth": "Very High", "description": "Construct high-throughput streaming and ETL data infrastructure."}
  ]'::jsonb,
  '["Generative AI & LLMs", "Computer Vision & Perception", "Reinforcement Learning & Robotics", "Healthcare AI & Bioinformatics"]'::jsonb,
  '["Autonomous Vehicles", "Algorithmic High-Frequency Trading", "Personalized Medicine & Drug Discovery", "Recommendation Engines & Voice Assistants"]'::jsonb,
  '["M.Tech / MS in Artificial Intelligence", "MS in Data Science", "PhD in Machine Learning & Robotics", "MBA in Business Analytics"]'::jsonb,
  'Brain',
  'Circuits & AI',
  true,
  'cyan'
),
(
  '22222222-0002-0000-0000-000000000002',
  'Computer Science and Engineering',
  'computer-science',
  'Computer Science',
  'Code. Build. Innovate.',
  'The flagship engineering branch focused on computing theory, algorithms, software architecture, operating systems, networking, and distributed cloud computing systems.',
  '["Highest placement volume and broadest array of software career tracks", "Versatile skill set applicable to virtually every modern global industry", "Solid mathematical and conceptual foundations for lifetime tech adaptability", "Pioneering access to open-source communities, hackathons, and venture capital"]'::jsonb,
  '["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems", "Compiler Design", "Software Engineering", "Computer System Architecture", "Theory of Computation"]'::jsonb,
  '["C++", "Java", "Python", "TypeScript", "Linux", "Git", "PostgreSQL", "Docker", "Kubernetes", "AWS"]'::jsonb,
  '[
    {"title": "Software Development Engineer (SDE)", "avg_salary": "₹10 - 32 LPA", "growth": "High", "description": "Architect high-performance distributed web applications and microservices."},
    {"title": "Systems Software Engineer", "avg_salary": "₹12 - 30 LPA", "growth": "Steady", "description": "Develop low-level operating system kernels, drivers, and runtime environments."},
    {"title": "Cloud Architect / DevOps", "avg_salary": "₹11 - 26 LPA", "growth": "Very High", "description": "Automate cloud deployment topologies, CI/CD pipelines, and cluster resilience."},
    {"title": "Cybersecurity Specialist", "avg_salary": "₹9 - 25 LPA", "growth": "Very High", "description": "Safeguard enterprise networks, perform pen-testing, and verify protocols."}
  ]'::jsonb,
  '["Distributed Systems & Cloud Computing", "Cybersecurity & Cryptography", "Full-Stack Software Architecture", "Human-Computer Interaction"]'::jsonb,
  '["Global Financial Cloud Networks", "Video Game Engines & Rendering", "Search Engines & Social Platforms", "Defense & Aerospace Avionics"]'::jsonb,
  '["MS in Computer Science (USA/Europe)", "M.Tech at IITs/IISc via GATE CS", "Direct PhD in Systems / Theory", "MIM / MS in Information Systems"]'::jsonb,
  'Code',
  'Computer Science',
  true,
  'blue'
),
(
  '22222222-0003-0000-0000-000000000003',
  'Electronics and Communication Engineering',
  'electronics-communication',
  'Electronics & Communication',
  'Connect. Communicate. Innovate.',
  'Bridge silicon hardware and telecommunications. Master semiconductor microchips, wireless 5G/6G networks, embedded microcontrollers, and signal processing.',
  '["Critical for India’s booming semiconductor manufacturing and chip design ecosystem", "Bilingual mastery of both hardware microarchitectures and firmware programming", "Massive expansion in 5G telecommunications, defense radar, and satellite tech", "High eligibility for both hardware VLSI roles and mainstream software positions"]'::jsonb,
  '["Digital Electronics", "Microprocessors & Microcontrollers", "Signals and Systems", "VLSI Design", "Analog Circuits", "Electromagnetic Fields", "Wireless Communications", "Digital Signal Processing"]'::jsonb,
  '["Verilog / VHDL", "MATLAB", "Cadence Virtuoso", "Xilinx Vivado", "C / Embedded C", "Oscilloscopes", "SPICE"]'::jsonb,
  '[
    {"title": "VLSI Design Engineer", "avg_salary": "₹12 - 35 LPA", "growth": "Exceptional", "description": "Design integrated silicon circuits, logic verification, and physical layout."},
    {"title": "Embedded Firmware Engineer", "avg_salary": "₹8 - 20 LPA", "growth": "High", "description": "Write deterministic real-time firmware for IoT devices and automotive ECUs."},
    {"title": "RF & Telecom Engineer", "avg_salary": "₹7 - 18 LPA", "growth": "Steady", "description": "Design baseband antennas, cellular towers, and microwave communication links."}
  ]'::jsonb,
  '["VLSI & Semiconductor Fabrication", "Embedded Systems & Robotics", "RF and Optical Communications", "Biomedical Signal Instrumentation"]'::jsonb,
  '["Smartphone Processors (Apple, Qualcomm, MediaTek)", "Satellite & Aerospace Telemetry (ISRO, NASA)", "Electric Vehicle Power Electronics", "Medical Imaging & Ultrasound"]'::jsonb,
  '["MS in Electrical & Computer Engineering", "M.Tech in Microelectronics & VLSI", "PhD in Photonics & Quantum Computing"]'::jsonb,
  'Radio',
  'Electronics',
  true,
  'emerald'
),
(
  '22222222-0004-0000-0000-000000000004',
  'Mechanical Engineering',
  'mechanical-engineering',
  'Mechanical Engineering',
  'Design. Build. Improve.',
  'The quintessential mother branch of engineering. Understand thermodynamics, fluid mechanics, robotic kinematics, materials science, and modern additive manufacturing.',
  '["Tangible impact: turn physics principles into real-world machinery and robotics", "Surging revolution in Electric Vehicles (EVs), renewable wind turbines, and aerospace", "Hands-on mastery of 3D CAD modeling, simulations, and rapid CNC manufacturing", "Strong opportunities in heavy industry, Formula Student racing, and global tech"]'::jsonb,
  '["Thermodynamics", "Fluid Mechanics", "Strength of Materials", "Kinematics & Dynamics of Machines", "Manufacturing Technology", "Heat and Mass Transfer", "Automobile Engineering", "Robotics & Mechatronics"]'::jsonb,
  '["SolidWorks", "Autodesk Fusion 360", "ANSYS Workbench", "AutoCAD", "MATLAB & Simulink", "Python for Kinematics"]'::jsonb,
  '[
    {"title": "Robotics & Automation Engineer", "avg_salary": "₹8 - 22 LPA", "growth": "Very High", "description": "Program industrial robot arms, AGVs, and automated warehouse machinery."},
    {"title": "Automotive / EV Design Engineer", "avg_salary": "₹7 - 19 LPA", "growth": "High", "description": "Design battery thermal management, chassis structural dynamics, and powertrains."},
    {"title": "Aerospace Stress Analyst", "avg_salary": "₹9 - 25 LPA", "growth": "Steady", "description": "Simulate aerodynamic turbulence and structural integrity of aircraft fuselages."}
  ]'::jsonb,
  '["Robotics & Autonomous Systems", "Thermal & Energy Systems", "Automotive & Electric Powertrains", "Biomechanics & Medical Implants"]'::jsonb,
  '["Electric Cars & Hypercars (Tesla, Tata EV)", "Reusable Space Rockets (SpaceX, ISRO)", "Renewable Energy Turbines (Vestas, GE)", "Robotic Surgery Instruments"]'::jsonb,
  '["MS in Mechanical / Mechatronics Engineering", "M.Tech in Thermal / Machine Design", "MS in Industrial Engineering & Supply Chain", "MBA in Operations Management"]'::jsonb,
  'Settings',
  'Mechanical',
  true,
  'amber'
),
(
  '22222222-0005-0000-0000-000000000005',
  'Electrical and Electronics Engineering',
  'electrical-electronics',
  'Electrical & Electronics',
  'Power. Innovate. Sustain.',
  'Master the generation, transmission, and intelligent control of electrical energy. Powers smart electric grids, renewable energy microgrids, and high-voltage power converters.',
  '["Central to the global zero-carbon energy transition and renewable solar/wind grids", "Expertise in high-voltage industrial machinery and miniaturized control electronics", "Broad career versatility across public utilities, automotive EVs, and tech labs"]'::jsonb,
  '["Electric Circuit Analysis", "Electrical Machines", "Power Systems", "Control Systems", "Power Electronics", "Electromagnetic Theory", "Renewable Energy Technologies"]'::jsonb,
  '["MATLAB / Simulink", "PSCAD", "ETAP", "LabVIEW", "Keil uVision", "Altium Designer"]'::jsonb,
  '[
    {"title": "Power Systems & Grid Engineer", "avg_salary": "₹7 - 18 LPA", "growth": "Steady", "description": "Plan high-voltage substation grids and smart transmission networks."},
    {"title": "EV Battery Systems Engineer", "avg_salary": "₹8 - 22 LPA", "growth": "Very High", "description": "Engineer Battery Management Systems (BMS) and DC fast-charging stations."},
    {"title": "Renewable Energy Consultant", "avg_salary": "₹7 - 16 LPA", "growth": "High", "description": "Design solar photovoltaic farms and wind energy conversion plants."}
  ]'::jsonb,
  '["Smart Grids & Power Quality", "Power Electronics & Drives", "Renewable Energy Systems", "High Voltage Engineering"]'::jsonb,
  '["Modern Electric Vehicle Charging Stations", "Nuclear, Hydro, and Solar Power Grids", "Smart City Automated Street Lighting & Metros", "Aerospace Power Distribution"]'::jsonb,
  '["MS in Electrical Engineering & Clean Energy", "M.Tech in Power Systems / Power Electronics", "MBA in Energy Management"]'::jsonb,
  'Zap',
  'Electronics',
  false,
  'yellow'
),
(
  '22222222-0006-0000-0000-000000000006',
  'Civil Engineering',
  'civil-engineering',
  'Civil Engineering',
  'Plan. Build. Create.',
  'Shape the physical world: design iconic skyscrapers, resilient transport bridges, water distribution networks, underground metro tunnels, and sustainable green cities.',
  '["Foundational to human civilization and monumental national infrastructure projects", "High government engineering opportunities (UPSC ESE, state PWDs, NHAI, Railways)", "Leading the shift to smart zero-emission green buildings and earthquake-resistant design"]'::jsonb,
  '["Structural Engineering", "Geotechnical Engineering", "Fluid Mechanics & Hydraulics", "Transportation Engineering", "Surveying & Geomatics", "Environmental Engineering", "Concrete Technology"]'::jsonb,
  '["AutoCAD", "STAAD Pro", "ETABS", "Revit BIM", "GIS / ArcGIS", "Primavera P6", "MS Project"]'::jsonb,
  '[
    {"title": "Structural Engineer", "avg_salary": "₹6 - 18 LPA", "growth": "Steady", "description": "Calculate load tolerances and ensure structural safety for high-rise buildings."},
    {"title": "Transportation & Highway Planner", "avg_salary": "₹6 - 16 LPA", "growth": "High", "description": "Design expressway interchanges, metro networks, and traffic flow models."},
    {"title": "BIM (Building Information Modeling) Manager", "avg_salary": "₹8 - 20 LPA", "growth": "Very High", "description": "Coordinate digital 3D architectural, structural, and plumbing building models."}
  ]'::jsonb,
  '["Structural & Earthquake Engineering", "Geotechnical & Tunneling Engineering", "Water Resources & Environmental Engineering", "Smart Infrastructure & BIM"]'::jsonb,
  '["Bullet Train Corridors & Underwater Tunnels", "Hyper-tall Skyscrapers & Suspension Bridges", "Smart Mega-cities & Flood Mitigation Canals", "Offshore Wind Turbine Foundations"]'::jsonb,
  '["MS in Structural / Construction Engineering", "M.Tech in Geotechnical Engineering", "Master of Urban Planning", "MBA in Real Estate & Infrastructure"]'::jsonb,
  'HardHat',
  'Civil',
  false,
  'stone'
),
(
  '22222222-0007-0000-0000-000000000007',
  'Information Science and Engineering',
  'information-science',
  'Information Science',
  'Architect. Secure. Scale.',
  'Focuses on data engineering, information retrieval, cloud databases, cybersecurity, and enterprise software engineering systems that empower the modern internet.',
  '["Direct curriculum overlap with computer science with specialized focus on data & cloud", "High campus placement parity with CSE across all major technology companies", "Emphasis on big data processing, enterprise software engineering, and web scale architecture"]'::jsonb,
  '["Data Structures & Algorithms", "Database Management Systems", "Software Engineering & Agile", "Data Mining & Warehousing", "Information Security & Cryptography", "Cloud Computing"]'::jsonb,
  '["Python", "Java", "React", "PostgreSQL", "Apache Kafka", "Docker", "AWS", "Git"]'::jsonb,
  '[
    {"title": "Enterprise Software Engineer", "avg_salary": "₹10 - 28 LPA", "growth": "High", "description": "Construct dependable backend services and business workflow engines."},
    {"title": "Information Security Analyst", "avg_salary": "₹9 - 24 LPA", "growth": "Very High", "description": "Protect corporate data warehouses against breaches and enforce encryption."},
    {"title": "Data Architect", "avg_salary": "₹14 - 32 LPA", "growth": "High", "description": "Model enterprise schemas, data lakes, and transactional pipelines."}
  ]'::jsonb,
  '["Enterprise Cloud Architecture", "Information Security", "Big Data Analytics", "Web & Mobile Systems"]'::jsonb,
  '["Global E-Commerce Platforms (Amazon, Flipkart)", "Fintech Payment Gateways (Stripe, UPI)", "Hospital Patient Information Networks", "Enterprise Resource Planning (ERP)"]'::jsonb,
  '["MS in Information Systems", "M.Tech in Computer Science", "MS in Cybersecurity"]'::jsonb,
  'Database',
  'Computer Science',
  false,
  'indigo'
)
ON CONFLICT (slug) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 3. SEED ROADMAP & SEMESTERS FOR AI & DATA SCIENCE
-- ------------------------------------------------------------------------------
INSERT INTO public.roadmaps (id, branch_id, title, description, total_semesters) VALUES
(
  '33333333-0001-0000-0000-000000000001',
  '22222222-0001-0000-0000-000000000001',
  'AI & Data Science 4-Year Undergraduate Roadmap',
  'A rigorous 8-semester roadmap taking students from basic Python and linear algebra through classical ML, deep learning, MLOps, and capstone deployment.',
  8
)
ON CONFLICT (branch_id) DO NOTHING;

-- Semesters 1 through 8
INSERT INTO public.semesters (id, roadmap_id, semester_number, year_number, title, focus_area, order_index) VALUES
('44444444-0001-0000-0000-000000000001', '33333333-0001-0000-0000-000000000001', 1, 1, 'Semester 1: Foundations of Problem Solving', 'Python Basics, Engineering Calculus & Git Version Control', 1),
('44444444-0001-0000-0000-000000000002', '33333333-0001-0000-0000-000000000001', 2, 1, 'Semester 2: Data Structures & Linear Algebra', 'C/C++ DSA, Matrix Decompositions & Statistics Foundations', 2),
('44444444-0001-0000-0000-000000000003', '33333333-0001-0000-0000-000000000001', 3, 2, 'Semester 3: Core Machine Learning & Databases', 'Scikit-Learn, SQL Schema Design, Exploratory Data Analysis', 3),
('44444444-0001-0000-0000-000000000004', '33333333-0001-0000-0000-000000000001', 4, 2, 'Semester 4: Deep Learning Foundations', 'PyTorch, Neural Networks, Computer Vision & NLP Basics', 4),
('44444444-0001-0000-0000-000000000005', '33333333-0001-0000-0000-000000000001', 5, 3, 'Semester 5: Advanced AI & Big Data Pipelines', 'Transformers, LLMs, Distributed Spark, Cloud Data Lakes', 5),
('44444444-0001-0000-0000-000000000006', '33333333-0001-0000-0000-000000000001', 6, 3, 'Semester 6: MLOps & Pre-Placement Internships', 'Model Serving, Docker, CI/CD, Summer Research/Industry Internship', 6),
('44444444-0001-0000-0000-000000000007', '33333333-0001-0000-0000-000000000001', 7, 4, 'Semester 7: Capstone Project Phase 1 & Placements', 'Major Project Architecture, Mock Technical Interviews, Campus Placement Drives', 7),
('44444444-0001-0000-0000-000000000008', '33333333-0001-0000-0000-000000000001', 8, 4, 'Semester 8: Industry Capstone Deployment & Graduation', 'Final Project Thesis Defense, Production Handover, Career Onboarding', 8)
ON CONFLICT (roadmap_id, semester_number) DO NOTHING;

-- Milestones for Semesters
INSERT INTO public.roadmap_milestones (id, semester_id, title, description, milestone_type, importance, order_index) VALUES
('55555555-0001-0000-0000-000000000001', '44444444-0001-0000-0000-000000000001', 'Master Python Core Syntax & OOP', 'Understand variables, lists, dicts, list comprehensions, functions, and OOP principles in Python 3.', 'skill', 'essential', 1),
('55555555-0001-0000-0000-000000000002', '44444444-0001-0000-0000-000000000001', 'Set Up Git & GitHub Workflow', 'Learn terminal navigation, git clone, commit, branch, merge, and pull requests.', 'technology', 'essential', 2),
('55555555-0001-0000-0000-000000000003', '44444444-0001-0000-0000-000000000001', 'Build a Command-Line Utility Project', 'Create a CLI tool (e.g. personal expense tracker or flashcard quiz) using standard libraries.', 'project', 'recommended', 3),

('55555555-0001-0000-0000-000000000004', '44444444-0001-0000-0000-000000000002', 'Master Core Data Structures (Arrays to Graphs)', 'Implement stacks, queues, linked lists, binary trees, heaps, and graph traversals (BFS/DFS).', 'skill', 'essential', 1),
('55555555-0001-0000-0000-000000000005', '44444444-0001-0000-0000-000000000002', 'Linear Algebra for Machine Learning', 'Vectors, dot products, eigenvalues, eigenvectors, and matrix transformations.', 'academic', 'essential', 2),
('55555555-0001-0000-0000-000000000006', '44444444-0001-0000-0000-000000000002', 'Solve 50 LeetCode Easy/Medium Problems', 'Build muscle memory in two-pointer, sliding window, and recursion patterns.', 'career_prep', 'recommended', 3),

('55555555-0001-0000-0000-000000000007', '44444444-0001-0000-0000-000000000003', 'Exploratory Data Analysis with Pandas & Seaborn', 'Clean messy CSVs, handle missing values, visualize distributions, and detect outliers.', 'skill', 'essential', 1),
('55555555-0001-0000-0000-000000000008', '44444444-0001-0000-0000-000000000003', 'Implement Classical Supervised Learning Algorithms', 'Linear regression, logistic regression, decision trees, random forests, and SVMs from scratch and scikit-learn.', 'skill', 'essential', 2),
('55555555-0001-0000-0000-000000000009', '44444444-0001-0000-0000-000000000003', 'Project: Housing Price Prediction Model', 'End-to-end regression model with feature engineering and cross-validated hyperparameter tuning.', 'project', 'essential', 3),

('55555555-0001-0000-0000-000000000010', '44444444-0001-0000-0000-000000000004', 'Train Deep Neural Networks with PyTorch', 'Tensors, autograd, forward/backward passes, loss functions, optimizers, and dropout regularization.', 'skill', 'essential', 1),
('55555555-0001-0000-0000-000000000011', '44444444-0001-0000-0000-000000000004', 'Computer Vision with CNNs', 'Convolutions, pooling, transfer learning with ResNet, and image classification.', 'technology', 'essential', 2),
('55555555-0001-0000-0000-000000000012', '44444444-0001-0000-0000-000000000004', 'Project: Facial Emotion Classifier Web App', 'Train a CNN model and wrap it into a lightweight Streamlit/FastAPI interactive web app.', 'project', 'recommended', 3),

('55555555-0001-0000-0000-000000000013', '44444444-0001-0000-0000-000000000005', 'Attention Mechanisms & Transformers', 'Self-attention, multi-head attention, Hugging Face Transformers, and fine-tuning BERT/Llama.', 'skill', 'essential', 1),
('55555555-0001-0000-0000-000000000014', '44444444-0001-0000-0000-000000000005', 'Project: Domain-Specific RAG Chatbot', 'Build a Retrieval-Augmented Generation agent with LangChain, FAISS vector database, and an open LLM.', 'project', 'essential', 2),

('55555555-0001-0000-0000-000000000015', '44444444-0001-0000-0000-000000000006', 'Deploy ML Models with Docker & FastAPI', 'Containerize inference microservices, configure health checks, and expose OpenAPI docs.', 'technology', 'essential', 1),
('55555555-0001-0000-0000-000000000016', '44444444-0001-0000-0000-000000000006', 'Summer Engineering Internship', 'Complete an 8-to-12 week industry or research lab internship working on production pipelines.', 'internship', 'essential', 2),

('55555555-0001-0000-0000-000000000017', '44444444-0001-0000-0000-000000000007', 'Campus Placement Season & Tech Mock Interviews', 'Complete 100+ LeetCode problems, system design reviews, and behavioral STAR interview prep.', 'career_prep', 'essential', 1),
('55555555-0001-0000-0000-000000000018', '44444444-0001-0000-0000-000000000007', 'Major Final-Year Capstone Project', 'End-to-end production AI system with team collaboration, user testing, and academic paper submission.', 'project', 'essential', 2)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 4. SEED VERIFIED LEARNING RESOURCES
-- ------------------------------------------------------------------------------
INSERT INTO public.resources (
  id, title, url, resource_type, skill_id, difficulty, is_free, 
  pricing_label, recommended_order, description, provider, is_verified
) VALUES
(
  '66666666-0001-0000-0000-000000000001',
  'CS50P: Introduction to Programming with Python',
  'https://cs50.harvard.edu/python/',
  'free_course',
  '11111111-0001-0000-0000-000000000001',
  'Beginner',
  true,
  'Free',
  1,
  'Harvard University comprehensive beginner course on Python, testing, regular expressions, and object-oriented programming.',
  'Harvard CS50',
  true
),
(
  '66666666-0001-0000-0000-000000000002',
  'Official Python 3 Documentation & Tutorial',
  'https://docs.python.org/3/tutorial/',
  'documentation',
  '11111111-0001-0000-0000-000000000001',
  'Beginner',
  true,
  'Free',
  2,
  'The official Python standard library documentation and first-party tutorial guide.',
  'Python Software Foundation',
  true
),
(
  '66666666-0001-0000-0000-000000000003',
  'NeetCode DSA Roadmap & LeetCode Solutions',
  'https://neetcode.io/roadmap',
  'practice_platform',
  '11111111-0001-0000-0000-000000000002',
  'Intermediate',
  true,
  'Free Tier',
  1,
  'Structured visual roadmap covering Blind 75 and 150 essential data structure problems with video explanations.',
  'NeetCode',
  true
),
(
  '66666666-0001-0000-0000-000000000004',
  'Machine Learning Specialization by Andrew Ng',
  'https://www.coursera.org/specializations/machine-learning-introduction',
  'paid_course',
  '11111111-0001-0000-0000-000000000003',
  'Beginner',
  false,
  'Free to Audit / Paid Certificate',
  1,
  'Stanford Online & DeepLearning.AI gold-standard curriculum covering regression, classification, clustering, and decision trees.',
  'DeepLearning.AI / Coursera',
  true
),
(
  '66666666-0001-0000-0000-000000000005',
  'Official PyTorch Tutorials & 60-Minute Blitz',
  'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html',
  'documentation',
  '11111111-0001-0000-0000-000000000004',
  'Intermediate',
  true,
  'Free',
  1,
  'First-party deep dive into PyTorch tensors, autograd differentiation, neural network modules, and GPU acceleration.',
  'PyTorch Foundation',
  true
),
(
  '66666666-0001-0000-0000-000000000006',
  'Fast.ai Practical Deep Learning for Coders',
  'https://course.fast.ai/',
  'free_course',
  '11111111-0001-0000-0000-000000000004',
  'Intermediate',
  true,
  'Free',
  2,
  'Top-down, hands-on deep learning course taking students straight to training state-of-the-art vision and NLP models.',
  'Fast.ai',
  true
),
(
  '66666666-0001-0000-0000-000000000007',
  'SQLBolt: Interactive SQL Tutorials',
  'https://sqlbolt.com/',
  'practice_platform',
  '11111111-0001-0000-0000-000000000005',
  'Beginner',
  true,
  'Free',
  1,
  'Interactive browser-based lessons on SQL queries, joins, aggregations, schema creation, and constraints.',
  'SQLBolt',
  true
),
(
  '66666666-0001-0000-0000-000000000008',
  'Pro Git Book (Free 2nd Edition)',
  'https://git-scm.com/book/en/v2',
  'book',
  '11111111-0001-0000-0000-000000000002',
  'All Levels',
  true,
  'Free Online',
  1,
  'The official authoritative handbook explaining internal plumbing, branching strategies, and collaborative GitHub workflows.',
  'Git SCM Official',
  true
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 5. LINK MILESTONES TO RESOURCES
-- ------------------------------------------------------------------------------
INSERT INTO public.milestone_resources (milestone_id, resource_id) VALUES
('55555555-0001-0000-0000-000000000001', '66666666-0001-0000-0000-000000000001'),
('55555555-0001-0000-0000-000000000001', '66666666-0001-0000-0000-000000000002'),
('55555555-0001-0000-0000-000000000002', '66666666-0001-0000-0000-000000000008'),
('55555555-0001-0000-0000-000000000004', '66666666-0001-0000-0000-000000000003'),
('55555555-0001-0000-0000-000000000008', '66666666-0001-0000-0000-000000000004'),
('55555555-0001-0000-0000-000000000010', '66666666-0001-0000-0000-000000000005'),
('55555555-0001-0000-0000-000000000010', '66666666-0001-0000-0000-000000000006')
ON CONFLICT (milestone_id, resource_id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 6. SEED CURATED PROJECTS
-- ------------------------------------------------------------------------------
INSERT INTO public.projects (
  id, title, slug, branch_id, difficulty, description, 
  required_technologies, skills_gained, learning_guidance, starter_repo_url, year_recommended, order_index
) VALUES
(
  '77777777-0001-0000-0000-000000000001',
  'Automated Real Estate Price Predictor',
  'real-estate-price-predictor',
  '22222222-0001-0000-0000-000000000001',
  'Beginner',
  'Train a multivariable regression model using Boston/Ames housing dataset to predict property sales prices based on square footage, location coordinates, and bedroom count.',
  ARRAY['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Streamlit'],
  ARRAY['Feature Engineering', 'Cross-Validation', 'Outlier Treatment', 'Model Evaluation Metrics (RMSE, R2)'],
  'Start by loading the CSV using Pandas. Remove extreme outliers, impute missing values with median values, apply one-hot encoding on neighborhood categories, and train a Ridge or XGBoost regressor.',
  'https://github.com/scikit-learn/scikit-learn',
  2,
  1
),
(
  '77777777-0001-0000-0000-000000000002',
  'Real-Time Facial Emotion & Fatigue Detector',
  'facial-emotion-detector',
  '22222222-0001-0000-0000-000000000001',
  'Intermediate',
  'Detect faces in real-time webcam video stream and classify emotions (Happy, Sad, Neutral, Angry, Surprised) along with eye-aspect ratio for driver drowsiness alerts.',
  ARRAY['Python', 'OpenCV', 'PyTorch', 'CNN', 'MediaPipe'],
  ARRAY['Convolutional Neural Networks', 'Transfer Learning', 'Real-Time Video Frame Buffering', 'Facial Landmark Tracking'],
  'Utilize MediaPipe face mesh to extract 468 landmark points. Calculate the Eye Aspect Ratio (EAR) to detect prolonged blinks and pass cropped face bounding boxes to a pretrained MobileNetV2 classifier.',
  'https://github.com/opencv/opencv',
  2,
  2
),
(
  '77777777-0001-0000-0000-000000000003',
  'Enterprise RAG Knowledge Assistant',
  'enterprise-rag-assistant',
  '22222222-0001-0000-0000-000000000001',
  'Advanced',
  'Build a production-grade question-answering assistant over hundreds of internal PDF/Markdown documents using semantic chunking, vector embedding, and reciprocal rank fusion.',
  ARRAY['Python', 'LangChain', 'FAISS', 'Hugging Face Transformers', 'FastAPI', 'Docker'],
  ARRAY['Vector Embeddings', 'Chunking Strategies', 'Hallucination Mitigation', 'API Microservice Containerization'],
  'Chunk incoming documents into 500-token blocks with 50-token overlap. Store embeddings in FAISS, retrieve top-5 relevant chunks, and pass them into an open-source model prompt template with source attribution.',
  'https://github.com/langchain-ai/langchain',
  3,
  3
),
(
  '77777777-0001-0000-0000-000000000004',
  'Distributed Key-Value Store with Raft Consensus',
  'distributed-raft-kv-store',
  '22222222-0002-0000-0000-000000000002',
  'Advanced',
  'Implement an in-memory replicated key-value storage engine using the Raft consensus algorithm to handle node failures and split-brain network partitions.',
  ARRAY['Go / C++', 'gRPC', 'Distributed Systems', 'Sockets'],
  ARRAY['Raft Leader Election', 'Log Replication', 'Network Partition Recovery', 'Linearizable Consistency'],
  'Read the Stanford Raft paper. First implement leader election with randomized election timers. Next implement log replication with commit index heartbeats.',
  'https://github.com/etcd-io/etcd',
  3,
  1
),
(
  '77777777-0001-0000-0000-000000000005',
  'Smart Autonomous Quadcopter Drone with ESP32',
  'autonomous-quadcopter-esp32',
  '22222222-0003-0000-0000-000000000003',
  'Intermediate',
  'Design and solder an ESP32-based flight controller with MPU6050 gyroscope and ultrasonic altitude sensor running PID stabilization loops.',
  ARRAY['Embedded C++', 'ESP32', 'I2C Sensors', 'PID Control Loops', 'PWM'],
  ARRAY['Inertial Measurement Units', 'Complementary Filtering', 'Brushless Motor Electronic Speed Control', 'Wireless Telemetry'],
  'Sample gyro and accelerometer data at 250Hz. Implement a complementary filter to avoid gyro drift and drive four ESCs using hardware PWM timers.',
  'https://github.com/espressif/arduino-esp32',
  3,
  1
)
ON CONFLICT (slug) DO NOTHING;
