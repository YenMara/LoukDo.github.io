const REVIEW_STORAGE_KEY = "loukdo-reviews";

const defaultReviews = [
  {
    name: "Sophea Chan",
    rating: 4,
    comment: "Amazing handmade products and a lovely local shopping experience.",
    date: "26-03-01"
  },
  {
    name: "Mina Sok",
    rating: 5,
    comment: "The quality is excellent and the artisans truly deserve support.",
    date: "18-04-24"
  },
  {
    name: "Rithy Lim",
    rating: 5,
    comment: "I love the authentic Cambodian feel of every product.",
    date: "09-06-24"
  }
];

function getReviews() {
  try {
    const storedReviews = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || "null");
    if (Array.isArray(storedReviews) && storedReviews.length) {
      return storedReviews;
    }
  } catch (error) {
    console.warn("Could not read reviews from storage", error);
  }

  return defaultReviews;
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const list = document.getElementById("review-list");

  if (!list) return;

  const reviews = getReviews();

  if (!reviews.length) {
    list.innerHTML = '<div class="text-center text-muted py-4">No reviews yet. Be the first to share your experience.</div>';
    return;
  }

  list.innerHTML = reviews
    .map((review) => {
      const stars = Array.from({ length: 5 }, (_, index) => {
        const filled = index < review.rating ? "text-warning" : "text-muted";
        return `<i class="fa-solid fa-star ${filled}"></i>`;
      }).join("");

      return `
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0 primary-color">${review.name}</h5>
            <span class="text-muted small">${review.date}</span>
          </div>
          <div class="mb-2">${stars}</div>
          <p class="mb-0 text-secondary">${review.comment}</p>
        </div>
      `;
    })
    .join("");
}

function showMessage(message, type = "success") {
  const messageBox = document.getElementById("form-message");
  if (!messageBox) return;

  messageBox.className = `alert ${type === "error" ? "alert-danger" : "alert-success"} py-2 px-3 mb-3`;
  messageBox.textContent = message;
}

function handleReviewSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.name.value.trim();
  const rating = Number(form.rating.value || 1);
  const comment = form.comment.value.trim();

  if (!name || !comment) {
    showMessage("Please enter your name and a short review.", "error");
    return;
  }

  const reviews = getReviews();
  reviews.unshift({
    name,
    rating,
    comment,
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    })
  });

  saveReviews(reviews);
  renderReviews();
  form.reset();
  showMessage("Your review has been added.");
}

function initReviewPage() {
  renderReviews();

  const form = document.getElementById("review-form");
  if (form) {
    form.addEventListener("submit", handleReviewSubmit);
  }
}

document.addEventListener("DOMContentLoaded", initReviewPage);
