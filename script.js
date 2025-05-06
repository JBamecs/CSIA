function goToQuestions() {
  localStorage.setItem("mode", document.getElementById("mode").value);
  localStorage.setItem("subject", document.getElementById("subject").value);

  // Show questionnaire section
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("questionnaireSection").style.display = "block";
}

function generateIdeas() {
  const subject = localStorage.getItem("subject");
  const interest = document.getElementById("interest").value;
  const personal = document.getElementById("personal").value;
  const data = document.getElementById("data").value;

  localStorage.setItem("interest", interest);
  localStorage.setItem("personal", personal);
  localStorage.setItem("data", data);

  let ideas = [
    `${subject}: Exploring ${interest} from a ${personal} perspective`,
    `${subject}: An analysis of ${interest} with data on ${data}`,
    `${subject}: Investigating the impact of ${interest} on ${personal}`
  ];

  let rq = `To what extent does ${interest} relate to ${personal} in the context of ${subject}?`;

  document.getElementById("ideasList").innerHTML = ideas.map(i => `<li>${i}</li>`).join("");
  document.getElementById("researchQuestion").innerText = rq;

  document.getElementById("questionnaireSection").style.display = "none";
  document.getElementById("outputSection").style.display = "block";
}

function editAnswers() {
  document.getElementById("interest").value = localStorage.getItem("interest");
  document.getElementById("personal").value = localStorage.getItem("personal");
  document.getElementById("data").value = localStorage.getItem("data");

  document.getElementById("outputSection").style.display = "none";
  document.getElementById("questionnaireSection").style.display = "block";
}
