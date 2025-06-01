/*******************************
* MARKDOWN RENDENRING BEHAVIOR *
*******************************/

const markdown = document.getElementById("markdown");
const preview = document.getElementById("preview");

// Save the initial content of the markdown textarea.
const initialMarkdown = markdown.value;

// Render the markdown preview.
function renderMarkdown() {
	// Get raw markdown from textarea.
	const raw = markdown.value;
	// Convert markdown to sanitized HTML.
	const html = DOMPurify.sanitize(marked.parse(raw));
	// Update the preview container with the HTML.
	preview.innerHTML = html;
}

// Initial render.
renderMarkdown();
// Update preview on every input change.
markdown.addEventListener("input", renderMarkdown);