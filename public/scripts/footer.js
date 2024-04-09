document.addEventListener('DOMContentLoaded', function () {
  const feedbackBtn = document.querySelector('.feedback-btn');
  const feedbackForm = document.querySelector('.feedback-form');
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;'; // Кнопка закрытия

  feedbackBtn.addEventListener('click', function () {
    feedbackForm.style.display = 'block';
    feedbackForm.appendChild(closeButton);
  });

  closeButton.addEventListener('click', function () {
    feedbackForm.style.display = 'none';
    feedbackForm.removeChild(closeButton);
  });
});
