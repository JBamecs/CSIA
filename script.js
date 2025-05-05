function startQuestionnaire() {
  localStorage.setItem("mode", document.getElementById("mode").value);
  localStorage.setItem("subject", document.getElementById("subject").value);
  document.getElementById("questionnaire").style.display = "block";
}

function generateIdeas() {
  const subject = localStorage.getItem("subject");
  const interest = document.getElementById("interest").value;
  const personal = document.getElementById("personal").value;
  const data = document.getElementById("data").value;

  // Save for regeneration
  localStorage.setItem("interest", interest);
  localStorage.setItem("personal", personal);
  localStorage.setItem("data", data);

  let ideas = [
    `${subject}: Exploring ${interest} from a ${personal} perspective`,
    `${subject}: An analysis of ${interest} with available data on ${data}`,
    `${subject}: Investigating how ${interest} affects or is influenced by ${personal}`
  ];

  let rq = `To what extent does ${interest} relate to ${personal} in the context of ${subject}?`;

  document.getElementById("ideasList").innerHTML = ideas.map(idea => `<li>${idea}</li>`).join("");
  document.getElementById("researchQuestion").innerText = rq;

  localStorage.setItem("rq", rq);
  document.getElementById("output").style.display = "block";
}

function editAnswers() {
  document.getElementById("interest").value = localStorage.getItem("interest");
  document.getElementById("personal").value = localStorage.getItem("personal");
  document.getElementById("data").value = localStorage.getItem("data");
  document.getElementById("output").style.display = "none";
  document.getElementById("questionnaire").style.display = "block";
}

function exportPDF() {
  const ideas = document.getElementById("ideasList").innerText;
  const rq = document.getElementById("researchQuestion").innerText;
  const docContent = `Topic Ideas:\n${ideas}\n\nResearch Question:\n${rq}`;

  const blob = new Blob([docContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "IB_Topic_Organizer.txt";
  link.click();
}
