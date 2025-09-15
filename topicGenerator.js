const ideasBank = {
  biology: {
    ia: [
      { t: "How does light intensity affect the rate of photosynthesis in Elodea canadensis?", rq: "To what extent does increasing light intensity correlate with a higher rate of oxygen production in Elodea canadensis?" },
      { t: "The effect of different pH levels on the activity of amylase.", rq: "What is the optimal pH for salivary amylase activity, measured by the rate of starch breakdown?" },
      { t: "Investigating the effect of soil salinity on the germination of radish seeds.", rq: "How does increasing concentrations of NaCl in soil affect the germination rate and root growth of Raphanus sativus?" },
    ],
    ee: [
      { t: "The ecological impact of invasive lionfish on coral reef biodiversity in the Caribbean.", rq: "To what extent do antibiotic-resistant bacteria populations in local soil samples reflect agricultural fertilizer use?" },
      { t: "A study on the genetic variation within isolated populations of the Alpine marmot.", rq: "How does genetic drift in isolated Alpine marmot populations influence their susceptibility to endemic diseases?" },
      { t: "The role of CRISPR-Cas9 in potential therapeutic applications for cystic fibrosis.", rq: "To what extent can CRISPR-Cas9 gene editing be feasibly applied to correct the CFTR gene mutation in human cell lines?" },
    ],
  },
  chemistry: {
    ia: [
      { t: "How does temperature affect the solubility of potassium nitrate in water?", rq: "What is the quantitative relationship between temperature and the mass of potassium nitrate that can be dissolved in a fixed volume of water?" },
      { t: "Determining the vitamin C content in different fruit juices using redox titration.", rq: "Which commercially available orange juice has the highest concentration of ascorbic acid, as determined by titration with potassium iodate?" },
      { t: "The effect of catalyst concentration on the rate of decomposition of hydrogen peroxide.", rq: "How does varying the concentration of potassium iodide affect the rate of oxygen production from the decomposition of H2O2?" },
    ],
    ee: [
      { t: "An analysis of the effectiveness of different transition metal complexes as catalysts in esterification.", rq: "To what extent can the activation energy of the iodine clock reaction be altered by different catalysts?" },
      { t: "The application of green chemistry principles in the synthesis of aspirin.", rq: "How can the traditional synthesis of aspirin be modified to improve its atom economy and reduce environmental impact?" },
      { t: "Investigating the electrochemical properties of graphene-oxide-based supercapacitors.", rq: "To what extent can the specific capacitance of a supercapacitor be enhanced by incorporating doped graphene oxide into its electrodes?" },
    ],
  },
  physics: {
    ia: [
      { t: "How does the length of a pendulum affect its oscillation period?", rq: "What is the relationship between the length of a simple pendulum and its period, and how does it compare to the theoretical model?" },
      { t: "Investigating the relationship between the angle of a ramp and the acceleration of a rolling object.", rq: "How does the sine of the angle of an inclined plane relate to the measured acceleration of a cart rolling down it?" },
      { t: "The effect of temperature on the resistance of a thermistor.", rq: "What is the mathematical relationship between temperature and the electrical resistance of a standard NTC thermistor?" },
    ],
    ee: [
      { t: "An investigation into the aerodynamics of different Formula 1 rear wing designs.", rq: "To what extent does wind speed influence the efficiency of different blade designs in model wind turbines?" },
      { t: "The application of quantum tunneling in Scanning Tunneling Microscopes (STM).", rq: "How can the principles of quantum tunneling be modeled to explain the imaging capabilities of an STM at the atomic level?" },
      { t: "Analyzing the dampening efficiency of tuned mass dampers in mitigating skyscraper oscillations.", rq: "How effectively can a scaled model of a tuned mass damper reduce the resonant oscillations of a model skyscraper structure?" },
    ],
  },
  mathematics: {
    ia: [
      { t: "Modeling the cooling of a cup of coffee using Newton's Law of Cooling.", rq: "How accurately can Newton's Law of Cooling model the temperature change of a hot beverage over time?" },
      { t: "Using regression analysis to correlate study hours and exam scores.", rq: "What is the strength of the linear correlation between hours spent studying and final exam scores for a sample of IB students?" },
      { t: "The birthday problem: An exploration of probability.", rq: "How many people need to be in a room for the probability of two sharing a birthday to exceed 50%, and how does this compare to the theoretical calculation?" },
    ],
    ee: [
      { t: "The application of Fourier analysis in digital music compression.", rq: "How effectively can graph theory be used to model optimal delivery routes in an urban setting?" },
      { t: "Exploring the mathematics of fractals in generating realistic natural landscapes.", rq: "To what extent can iterated function systems based on fractal geometry be used to create realistic computer-generated images of coastlines?" },
      { t: "A cryptographic analysis of the Enigma machine using group theory.", rq: "How can the principles of group theory be used to explain the cryptographic weaknesses of the German Enigma machine?" },
    ],
  },
  history: {
    ia: [
      { t: "The effectiveness of propaganda in the Bolsheviks' rise to power in 1917.", rq: "To what extent was propaganda responsible for the success of the Bolsheviks in the October Revolution (1917)?" },
      { t: "An analysis of the causes of the 1929 Wall Street Crash.", rq: "To what extent was unregulated stock market speculation the primary cause of the Wall Street Crash of 1929?" },
      { t: "The role of women in the British suffrage movement.", rq: "How significant were the militant tactics of the WSPU compared to the peaceful methods of the NUWSS in achieving female suffrage in Britain?" },
    ],
    ee: [
      { t: "The impact of the Marshall Plan on the economic recovery of West Germany, 1948-1952.", rq: "How significant was the role of the Catholic Church in Francoist Spain between 1939–1975?" },
      { t: "A comparative study of the decline of the Roman and Han empires.", rq: "To what extent did internal political decay, as opposed to external pressures, lead to the collapse of the Western Roman and Han Chinese empires?" },
      { t: "The role of espionage in the outcome of the Cuban Missile Crisis.", rq: "How crucial was the intelligence gathered by spies and reconnaissance flights in preventing nuclear war during the Cuban Missile Crisis?" },
    ],
  },
  // Default for other subjects
  default: {
    ia: [
      { t: "An analysis of [core concept] in the context of [specific case study].", rq: "To what extent does [concept] explain the outcomes observed in [case study]?" },
      { t: "The impact of [independent variable] on [dependent variable] in [your local area].", rq: "How does [independent variable] affect [dependent variable] within the context of [local area]?" },
      { t: "A comparative study of [method A] and [method B] in achieving [a specific goal].", rq: "Which method, A or B, is more effective in achieving [goal] and why?" },
    ],
    ee: [
      { t: "The evolution of [a key theory or movement] from [start year] to [end year].", rq: "To what extent has [theory/movement] changed in response to [major historical/social events] between [start year] and [end year]?" },
      { t: "An investigation into the long-term consequences of [a major policy or event].", rq: "What have been the most significant long-term social and economic consequences of [policy/event]?" },
      { t: "The influence of [cultural/technological trend] on [a specific industry or field].", rq: "In what ways has [trend] fundamentally reshaped the practices and values of [industry/field]?" },
    ],
  },
};

// Simple shuffle function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateIdeas = (mode, subject, answers) => {
  const subjectIdeas = ideasBank[subject] || ideasBank.default;
  const modeIdeas = subjectIdeas[mode] || subjectIdeas.ia; // Default to IA if mode is weird

  const shuffledIdeas = shuffle([...modeIdeas]);
  const selectedIdeas = shuffledIdeas.slice(0, 3);

  const topics = selectedIdeas.map(idea => idea.t);
  const researchQuestions = selectedIdeas.map(idea => idea.rq);

  // You could optionally weave in the user's answers here for more personalization
  // For now, we'll just return the pre-written, high-quality examples.
  
  return { topics, researchQuestions };
};
