const categories = {
  addOns: {
    images: [
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/21.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/22.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/23.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/24.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/25.png",
    ],
    index: 0,
    element: document.getElementById("addOns"),
    nextBtn: "0nextBtn",
    prevBtn: "0prevBtn",
  },
  tops: {
    images: [
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/01.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/02.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/03.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/04.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/05.png",
    ],
    index: 0,
    element: document.getElementById("tops"),
    nextBtn: "1nextBtn",
    prevBtn: "1prevBtn",
  },
  bottoms: {
    images: [
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/11.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/12.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/13.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/14.png",
      "https://cdn.glitch.global/61b7b4da-9ad2-4a9f-abea-326808d0ac33/15.png",
    ],
    index: 0,
    element: document.getElementById("bottoms"),
    nextBtn: "2nextBtn",
    prevBtn: "2prevBtn",
  },
};

// update image with fade
function updateImage(cat) {
  const category = categories[cat];
  category.element.classList.add("fade");
  setTimeout(() => {
    category.element.src = category.images[category.index];
    category.element.onload = () =>
      category.element.classList.remove("fade");
  }, 150);
}

/* setup buttons */
function setupButtons() {
  for (const cat in categories) {
    const category = categories[cat];
    document
      .getElementById(category.nextBtn)
      .addEventListener("click", () => {
        category.index = (category.index + 1) % category.images.length;
        updateImage(cat);
      });
    document
      .getElementById(category.prevBtn)
      .addEventListener("click", () => {
        category.index =
          (category.index - 1 + category.images.length) %
          category.images.length;
        updateImage(cat);
      });
  }
}

// randomize
function randomize() {
  for (const cat in categories) {
    const category = categories[cat];
    category.index = Math.floor(Math.random() * category.images.length);
    updateImage(cat);
  }
  createConfetti();
}
document.getElementById("random-btn").addEventListener("click", randomize);

// confetti effect
function createConfetti() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.style.opacity = 1;

  for (let i = 0; i < 120; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.backgroundColor = getRandomColor();
    confettiPiece.style.left = `${Math.random() * window.innerWidth}px`;
    confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;
    confettiContainer.appendChild(confettiPiece);
    setTimeout(() => confettiPiece.remove(), 2500);
  }

  setTimeout(() => {
    confettiContainer.style.opacity = 0;
  }, 3000);
}

function getRandomColor() {
  const colors = ["#d4af37", "#c5b358", "#ef476f", "#f8f5f2"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// share button
document.getElementById("share-btn").addEventListener("click", async () => {
  const outfitLinks = Object.values(categories).map(
    (cat) => cat.images[cat.index]
  );
  const textMessage =
    "check out my outfit ✨\n" +
    outfitLinks.join("\n");

  if (navigator.share) {
    try {
      await navigator.share({
        title: "my outfit",
        text: textMessage,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share cancelled:", err);
    }
  } else {
    navigator.clipboard.writeText(textMessage).then(() => {
      alert("outfit links copied to clipboard!");
    });
  }
});

for (const cat in categories) {
  updateImage(cat);
}
setupButtons();
