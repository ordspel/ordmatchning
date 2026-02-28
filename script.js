const testButton = document.getElementById("test-button");

testButton.addEventListener("click", () => {
  if (selected.length !== 4) {
    alert("Välj fyra rutor först!");
    return;
  }
  checkGroup();
});
const descriptionContainer = document.getElementById("description-container");
let completedGroups = []; // sparar grupper man redan klarat
let mistakes = 0;
const mistakesDisplay = document.getElementById("mistakes");
const words = [
  { group: 1, text: "Hund", description: "Är djur" },
  { group: 1, text: "Katt", description: "Är djur" },
  { group: 1, text: "Ko", description: "Är djur" },
  { group: 1, text: "Häst", description: "Är djur" },

  { group: 2, text: "Röd", description: "Är färger" },
  { group: 2, text: "Blå", description: "Är färger" },
  { group: 2, text: "Grön", description: "Är färger" },
  { group: 2, text: "Gul", description: "Är färger" },

  { group: 3, text: "Bil", description: "Är fordon" },
  { group: 3, text: "Buss", description: "Är fordon" },
  { group: 3, text: "Tåg", description: "Är fordon" },
  { group: 3, text: "Flyg", description: "Är fordon" },

  { group: 4, text: "Äpple", description: "Är frukter" },
  { group: 4, text: "Banan", description: "Är frukter" },
  { group: 4, text: "Päron", description: "Är frukter" },
  { group: 4, text: "Apelsin", description: "Är frukter" }
];

const game = document.getElementById("game");
let selected = [];

// Blanda orden
words.sort(() => Math.random() - 0.5);

// Skapa rutorna
words.forEach(word => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.textContent = word.text;
  div.dataset.group = word.group;
  div.dataset.description = word.description;

  // Klick-hanterare för varje ruta
  div.addEventListener("click", () => {
    if (div.classList.contains("correct")) return;

    // Markera / avmarkera
    div.classList.toggle("selected");

    if (div.classList.contains("selected")) {
      selected.push(div);
    } else {
      // Ta bort från selected om man avmarkerar
      selected = selected.filter(card => card !== div);
    }

    // Om man klickar fler än 4, avmarkera den första
    if (selected.length > 4) {
      const removed = selected.shift();
      removed.classList.remove("selected");
    }
  });

  // Lägg till rutan i spelet
  game.appendChild(div);
});

function checkGroup() {
  const group = selected[0].dataset.group;
  const description = selected[0].dataset.description;
  const allSame = selected.every(card => card.dataset.group === group);

  if (allSame) {
    selected.forEach(card => {
      card.classList.remove("selected");
      card.classList.add("correct");
    });

    // Lägg till gruppen om den inte redan finns
    if (!completedGroups.includes(group)) {
      completedGroups.push(group);

      const wordsInGroup = words
        .filter(word => word.group == group)
        .map(word => word.text)
        .join(", ");

      const p = document.createElement("p");
      p.textContent = `${wordsInGroup} → ${description}`;
      descriptionContainer.appendChild(p);
    }

  } else {
    mistakes++;
    mistakesDisplay.textContent = mistakes;

    // Lägg till tillfällig felklass
    selected.forEach(card => card.classList.add("wrong"));

    // Ta bort rött efter 0.5s och avmarkera
    setTimeout(() => {
      selected.forEach(card => {
        card.classList.remove("wrong");
        card.classList.remove("selected");
      });
      selected = [];
    }, 500);
  }

}