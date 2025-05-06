(function() {
  // IB subject groups and subjects (simplified for demo)
  const ibGroupsSubjects = {
    "Group 1": ["Language A: Literature", "Language A: Language and Literature"],
    "Group 2": ["Language B", "Ab Initio Language"],
    "Group 3": ["Business Management", "Economics", "Geography", "History"],
    "Group 4": ["Biology", "Chemistry", "Physics", "Psychology"],
    "Group 5": ["Mathematics: Analysis and Approaches", "Mathematics: Applications and Interpretation"],
    "Group 6": ["Visual Arts", "Music", "Theatre", "Film"],
  };

  // Questions per subject and mode - tailored small questionnaire samples
  const questionnaireData = {
    "Internal Assessment": {
      "Biology": [
        "Which biological concept fascinates you the most?",
        "Do you prefer plant or animal studies?",
        "What experiment or observation can you conduct?"
      ],
      "History": [
        "Which historical period interests you?",
        "Are you interested in political, social, or economic history?",
        "What primary sources can you analyze?"
      ],
      "Mathematics: Analysis and Approaches": [
        "What area of math do you enjoy (e.g., calculus, algebra)?",
        "Would you prefer theoretical or applied math?",
        "What real-world problem can you model?"
      ],
      "Economics": [
        "Are you interested in microeconomics or macroeconomics?",
        "Which economic theory appeals to you?",
        "What data can you collect or analyze?"
      ],
      "English": [
        "What genre or author do you admire?",
        "Which theme do you want to investigate?",
        "What literary technique do you want to explore?"
      ],
      "Psychology": [
        "Which psychological concept intrigues you?",
        "Would you focus on an experiment or literature review?",
        "What age group or demographic interests you?"
      ]
    },
    "Extended Essay": {
      "Biology": [
        "What biological question do you want to investigate deeply?",
        "What sources or data will you consult?",
        "What is a potential hypothesis or claim?"
      ],
      "History": [
        "What is a significant historical event or trend?",
        "What primary and secondary sources will you use?",
        "What argument or thesis will you develop?"
      ],
      "Mathematics: Analysis and Approaches": [
        "What advanced math topic excites you?",
        "How will you prove or explore this topic?",
        "What real or hypothetical application will you examine?"
      ],
      "Economics": [
        "What economic issue or policy will you research?",
        "Which data and methods will you use?",
        "What will you attempt to prove or assess?"
      ],
      "English": [
        "What author, work, or theme will you analyze?",
        "What critical perspectives will you employ?",
        "What will your thesis or main argument be?"
      ],
      "Psychology": [
        "What psychological question will you explore?",
        "Which studies or experiments will support your essay?",
        "What conclusion or implication do you expect?"
      ]
    }
  };

  // Templates for generating research questions per subject - simplified examples
  const researchQuestionTemplates = {
    "Biology": [
      "To what extent does {answer1} affect {answer2} in {answer3}?",
      "How does {answer2} influence {answer1} in {answer3}?",
      "What is the relationship between {answer1} and {answer2} in the context of {answer3}?"
    ],
    "History": [
      "How did {answer1} impact {answer2} during {answer3}?",
      "To what extent did {answer2} shape {answer1} in {answer3}?",
      "What were the causes and effects of {answer1} on {answer2} in {answer3}?"
    ],
    "Mathematics: Analysis and Approaches": [
      "How can {answer1} be applied to solve {answer3} using {answer2}?",
      "What are the implications of {answer1} in {answer3} with respect to {answer2}?",
      "How effective is {answer2} in analyzing {answer1} related to {answer3}?"
    ],
    "Economics": [
      "What is the effect of {answer1} on {answer2} in {answer3}?",
      "To what extent does {answer1} influence {answer2} in the {answer3} market?",
      "How does {answer2} mediate the relationship between {answer1} and {answer3}?"
    ],
    "English": [
      "How does {answer2} illustrate the theme of {answer1} in {answer3}?",
      "What role does {answer1} play in expressing {answer2} within {answer3}?",
      "In what ways does {answer3} explore the concepts of {answer1} and {answer2}?"
    ],
    "Psychology": [
      "To what extent does {answer1} affect {answer2} in {answer3}?",
      "How does {answer2} moderate the influence of {answer1} on {answer3}?",
      "What is the effect of {answer1} on {answer3} among {answer2}?"
    ]
  };

  // Store state
  const state = {
    mode: null,
    subject: null,
    answers: []
  };

  // Elements
  const modeSelect = document.getElementById('modeSelect');
  const subjectSelect = document.getElementById('subjectSelect');
  const startBtn = document.getElementById('startBtn');
  const questionnaireForm = document.getElementById('questionnaire');
  const landingDiv = document.getElementById('landing');
  const resultsDiv = document.getElementById('results');
  const topicsDiv = document.getElementById('topics');
  const researchQuestionsDiv = document.getElementById('researchQuestions');
  const regenerateBtn = document.getElementById('regenerateBtn');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const resultSection = document.getElementById('resultSection');

  // Helper: Populate subjects select
  function populateSubjects() {
    subjectSelect.innerHTML = '<option value="" disabled selected>Choose subject...</option>';
    let allSubjects = [];
    Object.values(ibGroupsSubjects).forEach(arr => allSubjects = allSubjects.concat(arr));
    allSubjects.sort();
    allSubjects.forEach(subj => {
      const option = document.createElement('option');
      option.value = subj;
      option.textContent = subj;
      subjectSelect.appendChild(option);
    });
  }

  // Save and load from localStorage
  function saveState() {
    localStorage.setItem('ibOrganizerState', JSON.stringify(state));
  }
  function loadState() {
    const saved = localStorage.getItem('ibOrganizerState');
    if (!saved) return false;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.mode) {
        state.mode = parsed.mode;
        modeSelect.value = parsed.mode;
      }
      if (parsed.subject) {
        state.subject = parsed.subject;
        subjectSelect.value = parsed.subject;
      }
      if (parsed.answers) {
        state.answers = parsed.answers;
      }
      return true;
    } catch {
      return false;
    }
  }

  // Enable subject select after mode chosen
  modeSelect.addEventListener('change', () => {
    state.mode = modeSelect.value;
    subjectSelect.disabled = false;
    startBtn.disabled = true;
    saveState();
  });

  // Enable start button after subject chosen
  subjectSelect.addEventListener('change', () => {
    state.subject = subjectSelect.value;
    startBtn.disabled = !state.subject || !state.mode;
    saveState();
  });

  // Start questionnaire
  startBtn.addEventListener('click', e => {
    e.preventDefault();
    if (!state.mode || !state.subject) return;
    showQuestionnaire();
  });

  // Show questionnaire dynamically
  function showQuestionnaire() {
    landingDiv.style.display = 'none';
    resultsDiv.style.display = 'none';
    questionnaireForm.style.display = 'flex';
    questionnaireForm.innerHTML = '';

    const modeName = (state.mode === "IA") ? "Internal Assessment" : "Extended Essay";
    const questionKey = modeName;

    const questions = questionnaireData[questionKey]?.[state.subject] || [];

    if (!questions.length) {
      questionnaireForm.innerHTML = '<p>No questions defined for this subject and mode yet.</p>';
      return;
    }

    // Create question inputs, prefill from saved answers if any
    state.answers = state.answers.length === questions.length ? state.answers : new Array(questions.length).fill('');
    questions.forEach((q, i) => {
      const div = document.createElement('div');
      div.className = 'question';

      const label = document.createElement('label');
      label.setAttribute('for', 'ans' + i);
      label.textContent = q;

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'ans' + i;
      input.name = 'ans' + i;
      input.value = state.answers[i] || '';
      input.setAttribute('aria-describedby', 'help'+i);
      input.required = true;
      input.autocomplete = 'off';

      input.addEventListener('input', () => {
        state.answers[i] = input.value.trim();
        saveState();
        updateGenerateBtn();
      });

      div.appendChild(label);
      div.appendChild(input);
      questionnaireForm.appendChild(div);
    });

    // Add generate button
    const generateBtn = document.createElement('button');
    generateBtn.type = 'submit';
    generateBtn.textContent = 'Generate Topics and RQs';
    generateBtn.id = 'generateBtn';
    generateBtn.disabled = true;
    generateBtn.style.marginTop = '15px';
    questionnaireForm.appendChild(generateBtn);

    // Enable button only if all fields are filled
    function updateGenerateBtn() {
      const allFilled = state.answers.every(a => a && a.length > 0);
      generateBtn.disabled = !allFilled;
    }
    updateGenerateBtn();

    questionnaireForm.addEventListener('submit', e => {
      e.preventDefault();
      if (generateBtn.disabled) return;
      generateSuggestions();
    });
  }

  // Generate topic ideas and research questions
  function generateSuggestions() {
    // Show results area, hide questionnaire
    questionnaireForm.style.display = 'none';
    resultsDiv.style.display = 'flex';

    // Generate 3 topic suggestions (simple concatenations inspired by answers)
    const topics = [];
    const ans = state.answers;

    // Some very basic realistic topic ideas using answers
    topics.push(`Exploring the impact of "${ans[0]}" on "${ans[1]}"`);
    topics.push(`A study of "${ans[1]}" within the context of "${ans[2]}"`);
    topics.push(`Investigating the role of "${ans[0]}" and "${ans[2]}" in "${state.subject}"`);

    // Render topics
    topicsDiv.innerHTML = '';
    topics.forEach(t => {
      const p = document.createElement('p');
      p.textContent = t;
      p.style.marginBottom = '8px';
      topicsDiv.appendChild(p);
    });

    // Generate editable research questions by filling templates
    const templates = researchQuestionTemplates[state.subject] || [];

    if (templates.length === 0) {
      researchQuestionsDiv.innerHTML = '<p>No research question templates defined.</p>';
      return;
    }

    researchQuestionsDiv.innerHTML = '';
    // Generate 3 research questions and create textareas
    for (let i=0; i<3; i++) {
      const rqText = templates[i % templates.length]
        .replace(/{answer1}/g, ans[0])
        .replace(/{answer2}/g, ans[1])
        .replace(/{answer3}/g, ans[2]);
      const textarea = document.createElement('textarea');
      textarea.className = 'editable-textarea';
      textarea.rows = 3;
      textarea.value = rqText;
      textarea.setAttribute('aria-label', `Research Question ${i+1}`);
      researchQuestionsDiv.appendChild(textarea);
    }
  }

  // Regenerate: go back to questionnaire to edit answers
  regenerateBtn.addEventListener('click', () => {
    resultsDiv.style.display = 'none';
    questionnaireForm.style.display = 'flex';
  });

  // Export as PDF using jsPDF
  exportPdfBtn.addEventListener('click', () => {
    import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(({ jsPDF }) => {
      const doc = new jsPDF.jsPDF({
        unit: 'pt',
        format: 'a4'
      });

      doc.setFontSize(20);
      doc.text('IB IA & EE Topic Organizer Results', 40, 60);

      // Write Mode and Subject
      doc.setFontSize(12);
      doc.text(`Mode: ${state.mode}`, 40, 90);
      doc.text(`Subject: ${state.subject}`, 40, 110);

      // Write Topic Suggestions
      doc.setFontSize(16);
      doc.text('Topic Suggestions:', 40, 140);
      doc.setFontSize(12);
      let y = 160;
      Array.from(topicsDiv.children).forEach(p => {
        doc.text(`- ${p.textContent}`, 50, y);
        y += 20;
      });

      // Write Research Questions
      y += 10;
      doc.setFontSize(16);
      doc.text('Research Questions:', 40, y);
      y += 20;
      doc.setFontSize(12);
      Array.from(researchQuestionsDiv.querySelectorAll('textarea')).forEach((ta, i) => {
        const lines = doc.splitTextToSize(`${i + 1}. ${ta.value}`, 500);
        doc.text(lines, 50, y);
        y += lines.length * 16 + 5;
      });

      doc.save('IB_Topic_Suggestions.pdf');
    });
  });

  // Populate subjects on page load and load saved state
  window.addEventListener('load', () => {
    populateSubjects();
    if (loadState()) {
      if (state.mode && state.subject) {
        subjectSelect.disabled = false;
        startBtn.disabled = false;
      }
    }
  });
})();
