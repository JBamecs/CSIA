let mode = "";
const prompts = {
  Biology: ["Effects of temperature on enzymes", "Plant growth under different light"],
  History: ["Causes of WWI", "Cold War impact on Europe"],
  Math: ["Modeling population growth", "Statistics in sports"]
};

function start(selectedMode) {
  mode = selectedMode;
  document.getElementById("modeHeader").textContent = `Mode: ${mode}`;
  document.getElementById("questionnaire").style.display = "block";
}

function loadQuestions() {
  const subject = document.getElementById("subjectSelect").value;
  const questionsArea = document.getElementById("questionsArea");
  questionsArea.innerHTML = "";

  if (prompts[subject]) {
    prompts[subject].forEach((prompt, index) => {
      questionsArea.innerHTML += `<p>${index + 1}. ${prompt}</p>`;
    });
  }
}

function suggestTopic() {
  const subject = document.getElementById("subjectSelect").value;
  const resultsArea = document.getElementById("resultsArea");
  if (!subject) {
    resultsArea.innerHTML = "Please select a subject.";
    return;
  }

  const topic = prompts[subject][Math.floor(Math.random() * prompts[subject].length)];
  const rq = `To what extent does ${topic.toLowerCase()}...?`;

  resultsArea.innerHTML = `
    <h3>Suggested Topic:</h3><p>${topic}</p>
    <h4>Research Question:</h4><p>${rq}</p>
  `;
}
