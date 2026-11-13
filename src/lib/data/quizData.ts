export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    branchWeights: Record<string, number>; // branch slug -> score
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you look at a modern product (like an iPhone or Tesla), what excites you most?",
    subtitle: "Notice what your curiosity naturally gravitated toward first.",
    options: [
      {
        label: "The intelligent algorithms",
        description: "FaceID neural networks, predictive text, autonomous driving vision models.",
        branchWeights: { 'ai-data-science': 3, 'computer-science': 2 },
      },
      {
        label: "The seamless software and cloud operating system",
        description: "The instant responsiveness, synced cloud services, and scalable web apps.",
        branchWeights: { 'computer-science': 3, 'information-science': 3 },
      },
      {
        label: "The silicon chip architecture and wireless radios",
        description: "5G antennas, miniaturized processors, sensors, and PCB boards.",
        branchWeights: { 'electronics-communication': 3, 'electrical-electronics': 1 },
      },
      {
        label: "The physical chassis, aerodynamics, and thermal cooling",
        description: "Aerodynamic curves, battery thermal management, materials, and crash safety.",
        branchWeights: { 'mechanical-engineering': 3, 'civil-engineering': 1 },
      },
      {
        label: "The electric motor, battery pack, and charging infrastructure",
        description: "High-voltage inverters, superchargers, power distribution, and clean energy.",
        branchWeights: { 'electrical-electronics': 3, 'mechanical-engineering': 1 },
      },
    ],
  },
  {
    id: 2,
    question: "What style of high-school mathematics or science do you genuinely enjoy?",
    subtitle: "Your academic comfort zone will make university study exhilarating instead of exhausting.",
    options: [
      {
        label: "Probability, Statistics & Matrix Linear Algebra",
        description: "Finding trends in distributions, calculating odds, working with multidimensional vectors.",
        branchWeights: { 'ai-data-science': 3, 'computer-science': 2 },
      },
      {
        label: "Logic, Discrete Math & Algorithmic Problem Solving",
        description: "Set theory, boolean algebra, recursion, and step-by-step puzzle solving.",
        branchWeights: { 'computer-science': 3, 'information-science': 2 },
      },
      {
        label: "Electromagnetism, Wave Optics & Semiconductor Physics",
        description: "Electric fields, light propagation, p-n junctions, and resonance circuits.",
        branchWeights: { 'electronics-communication': 3, 'electrical-electronics': 2 },
      },
      {
        label: "Classical Mechanics, Forces, Vectors & Thermodynamics",
        description: "Newtonian laws, friction, fluid pressure, heat cycles, and mechanical work.",
        branchWeights: { 'mechanical-engineering': 3, 'civil-engineering': 2 },
      },
      {
        label: "Statics, Material Strengths & Environmental Sciences",
        description: "Equilibrium of structures, tension, compression, and water flow systems.",
        branchWeights: { 'civil-engineering': 3, 'mechanical-engineering': 1 },
      },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to spend your project time?",
    subtitle: "Think about what kind of creation gives you a sense of pride.",
    options: [
      {
        label: "Training models and interpreting data patterns",
        description: "Feeding datasets into machine learning algorithms and observing improvements.",
        branchWeights: { 'ai-data-science': 3, 'information-science': 1 },
      },
      {
        label: "Writing clean code, designing databases, and building full-stack apps",
        description: "Creating web/mobile apps, APIs, and seeing people use what you programmed.",
        branchWeights: { 'computer-science': 3, 'information-science': 3 },
      },
      {
        label: "Soldering circuits, flashing firmware, and connecting sensors",
        description: "Getting microcontrollers (like ESP32 or Arduino) to blink, read sensors, and move.",
        branchWeights: { 'electronics-communication': 3, 'electrical-electronics': 2 },
      },
      {
        label: "Designing 3D objects in CAD and testing physical mechanisms",
        description: "3D printing parts, assembling gears, testing structural durability under load.",
        branchWeights: { 'mechanical-engineering': 3, 'civil-engineering': 1 },
      },
      {
        label: "Drawing architectural plans, designing bridges, and surveying land",
        description: "Planning large-scale structures, calculating load distribution, and urban flow.",
        branchWeights: { 'civil-engineering': 3, 'mechanical-engineering': 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Which global challenge would you feel most fulfilled solving over your career?",
    subtitle: "Engineering is fundamentally about creating solutions that impact society.",
    options: [
      {
        label: "Curing diseases with predictive AI and autonomous robotics",
        description: "Accelerating drug discovery and robotic surgeries using machine intelligence.",
        branchWeights: { 'ai-data-science': 3, 'computer-science': 1 },
      },
      {
        label: "Safeguarding global digital infrastructure and financial clouds",
        description: "Preventing cyber warfare, scaling high-frequency transactions, and data security.",
        branchWeights: { 'computer-science': 2, 'information-science': 3 },
      },
      {
        label: "Building indigenous semiconductor chips and next-gen 6G communications",
        description: "Designing cutting-edge microchips, satellite telemetry, and wireless networks.",
        branchWeights: { 'electronics-communication': 3, 'electrical-electronics': 1 },
      },
      {
        label: "Scaling electric mobility, aerospace rockets, and renewable energy",
        description: "Designing zero-emission EVs, hypersonic aircraft, and wind turbines.",
        branchWeights: { 'mechanical-engineering': 3, 'electrical-electronics': 2 },
      },
      {
        label: "Building climate-resilient cities, high-speed rail, and clean water networks",
        description: "Protecting populations against earthquakes, rising sea levels, and urban congestion.",
        branchWeights: { 'civil-engineering': 3, 'mechanical-engineering': 1 },
      },
    ],
  },
];
