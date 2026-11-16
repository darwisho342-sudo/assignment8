const statusDisplay = document.getElementById('status-display');
const responseBody = document.getElementById('response-body');
const buttons = document.querySelectorAll('button[data-url]');

async function callApi(method, url) {
  statusDisplay.textContent = 'Loading...';
  responseBody.textContent = '';

  try {
    const response = await fetch(url, { method });
    statusDisplay.textContent = `${response.status} ${response.statusText}`;

    const rawText = await response.text();
    try {
      const parsed = JSON.parse(rawText);
      responseBody.textContent = JSON.stringify(parsed, null, 2);
    } catch {
      responseBody.textContent = rawText;
    }
  } catch (error) {
    statusDisplay.textContent = 'Network Error';
    responseBody.textContent = `Request failed: ${error.message}`;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { method, url } = button.dataset;
    callApi(method, url);
  });
});