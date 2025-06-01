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


/***********************
* COPY BUTTON BEHAVIOR *
***********************/

const copyBtn = document.getElementById("copy-btn");

// Copy markdown content to clipboard.
copyBtn.addEventListener("click", () => {
	if (markdown.value.trim() !== "") {
		navigator.clipboard.writeText(markdown.value).then(() => {
			alert("Copied to clipboard!");
		}).catch(error => console.error("Copy failed:", error));
	} else {
		alert("Nothing to copy!")
	}
});

/************************
* RESET BUTTON BEHAVIOR *
************************/

const resetBtn = document.getElementById("reset-btn");

// Reset markdown to its initial state.
resetBtn.addEventListener("click", () => {
	markdown.value = initialMarkdown;
	renderMarkdown();
});


/***************************
* DOWNLOAD BUTTON BEHAVIOR *
***************************/

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", () => {
	const content = markdown.value;
	const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
	const url = URL.createObjectURL(blob);

	// Create a temporary <a> element.
	const a = document.createElement("a");

	// Set download attributes and trigger click.
	a.href = url;
	a.download = "README.md";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	// Free up memory by releasing the temporary object URL.
	URL.revokeObjectURL(url);
});