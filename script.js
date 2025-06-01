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


/******************************
* MODE TOGGLE BUTTON BEHAVIOR *
******************************/

const LIGHT_CSS = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css";
const DARK_CSS = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css";

const ghMdCss = document.getElementById("gh-md-css");
const modeToggleBtn = document.getElementById("mode-toggle-btn");

// Toggle theme on click.
modeToggleBtn.addEventListener("click", () => {
	const currentHref = ghMdCss.getAttribute("href");

	const body = document.body;
	const header = document.querySelector("header");
	const buttons = document.querySelectorAll("button");
	const aside = document.querySelector("aside");
	const textarea = document.querySelector("textarea");
	const previewSection = document.getElementById("preview-section");
	const footer = document.querySelector("footer");

	const icon = document.createElement("i");

	if (currentHref === LIGHT_CSS) {
		ghMdCss.setAttribute("href", DARK_CSS);

		icon.classList.add("bi", "bi-sun");

		body.classList.remove("light-mode");
		body.classList.add("dark-mode");

		header.classList.remove("light-mode");
		header.classList.add("dark-mode");

		buttons.forEach((buttons) => {
			buttons.classList.remove("light-mode")
			buttons.classList.add("dark-mode")
		});

		aside.classList.remove("light-mode");
		aside.classList.add("dark-mode");

		textarea.classList.remove("light-mode");
		textarea.classList.add("dark-mode");

		previewSection.classList.remove("light-mode");
		previewSection.classList.add("dark-mode");

		footer.classList.remove("light-mode");
		footer.classList.add("dark-mode");
	} else {
		ghMdCss.setAttribute("href", LIGHT_CSS);

		icon.classList.add("bi", "bi-moon-stars");

		body.classList.remove("dark-mode");
		body.classList.add("light-mode");

		header.classList.remove("dark-mode");
		header.classList.add("light-mode");

		buttons.forEach((buttons) => {
			buttons.classList.remove("dark-mode")
			buttons.classList.add("light-mode")
		});

		aside.classList.remove("dark-mode");
		aside.classList.add("light-mode");

		textarea.classList.remove("dark-mode");
		textarea.classList.add("light-mode");

		previewSection.classList.remove("dark-mode");
		previewSection.classList.add("light-mode");

		footer.classList.remove("dark-mode");
		footer.classList.add("light-mode");
	}

	// Replace existing icon safely.
	modeToggleBtn.innerHTML = "";
	modeToggleBtn.appendChild(icon);
});


/*****************************
* MODULES INSERTION BEHAVIOR *
*****************************/

function insertMarkdownAtCursor(markdown, insertText) {
	// Focus the textarea.
	markdown.focus();

	// Get current selection.
	const startPosition = markdown.selectionStart;
	const endPosition = markdown.selectionEnd;

	const before = markdown.value.substring(0, startPosition);
	const after = markdown.value.substring(endPosition);

	// Insert text.
	markdown.value = before + insertText + after;

	// Move cursor after inserted text.
	const newCursorPosition = startPosition + insertText.length;
	markdown.setSelectionRange(newCursorPosition, newCursorPosition);

	// Render updated preview.
	renderMarkdown();
}

// Insert title.
document.getElementById("insert-title-btn").addEventListener("click", () => {
	const insertText = `# Title

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert table of contents.
document.getElementById("insert-toc-btn").addEventListener("click", () => {
	const insertText = `## 🔖 Table of contents

<details>
  <summary>
    CLICK TO ENLARGE 😇
  </summary>
  📄 <a href="#description">Description</a>
  <br>
  🎓 <a href="#objectives">Objectives</a>
  <br>
  🔨 <a href="#tech-stack">Tech stack</a>
  <br>
  📂 <a href="#files-description">Files description</a>
  <br>
  💻 <a href="#installation">Installation</a>
  <br>
  🔧 <a href="#whats-next">What's next?</a>
  <br>
  ♥️ <a href="#thanks">Thanks</a>
  <br>
  👷 <a href="#authors">Authors</a>
  </details>

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert description.
document.getElementById("insert-description-btn").addEventListener("click", () => {
	const insertText = `## 📄 <span id="description">Description</span>

The project description.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert objectives.
document.getElementById("insert-objectives-btn").addEventListener("click", () => {
	const insertText = `## 🎓 <span id="objectives">Objectives</span>

- Objectives list.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert tech stack.
document.getElementById("insert-techstack-btn").addEventListener("click", () => {
	const insertText = `## 🔨 <span id="tech-stack">Tech stack</span>

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5 badge">
  <img src="https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS3 badge">
  <img src="https://img.shields.io/badge/JAVASCRIPT-f7df1e?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript badge">
</p>

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert files description.
document.getElementById("insert-files-btn").addEventListener("click", () => {
	const insertText = `## 📂 <span id="files-description">File description</span>

| **FILE**            | **DESCRIPTION**                                   |
| :-----------------: | ------------------------------------------------- |
| \`file_name\`       | Description of the file.                          |
| \`folder_name\`     | Description of the folder.                        |
| \`.gitignore\`      | Specifies files and folders to be ignored by Git. |
| \`README.md\`       | The README file you are currently reading 😉.     |

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert installation.
document.getElementById("insert-installation-btn").addEventListener("click", () => {
	const insertText = `## 💻 <span id="installation">Installation</span>

1. Clone this repository:
  - Open your preferred Terminal.
  - Navigate to the directory where you want to clone the repository.
  - Run the following command:

\`\`\`bash
git clone <link_to_the_repository>
\`\`\`

2. Open the repository you've just cloned.

3. Remaining installation instructions.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert what's next.
document.getElementById("insert-next-btn").addEventListener("click", () => {
	const insertText = `## 🔧 <span id="whats-next">What's next?</span>

- List of next steps for the project.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert Thanks.
document.getElementById("insert-thanks-btn").addEventListener("click", () => {
	const insertText = `## ♥️ <span id="thanks">Thanks</span>

- Your message of thanks here. 

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert authors.
document.getElementById("insert-authors-btn").addEventListener("click", () => {
	const insertText = `## 👷 <span id="authors">Authors</span>

**Fabien CHAVONET**
- GitHub: [@fchavonet](https://github.com/fchavonet)
- LinkedIn: [@fchavonet](https://www.linkedin.com/in/fchavonet)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

////////////////////////////////////////////////////////////////////////////////

// Insert blockquote.
document.getElementById("insert-blockquote-btn").addEventListener("click", () => {
	const insertText = `> Your blockquotes here.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert break.
document.getElementById("insert-break-btn").addEventListener("click", () => {
	const insertText = `---

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert code.
document.getElementById("insert-code-btn").addEventListener("click", () => {
	const insertText = `\`\`\`
Your code here.
\`\`\`

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert image.
document.getElementById("insert-image-btn").addEventListener("click", () => {
	const insertText = `![Image](./assets/images/logo-markdown.webp)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert link.
document.getElementById("insert-link-btn").addEventListener("click", () => {
	const insertText = `[GitHub](https://github.com/)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert table.
document.getElementById("insert-table-btn").addEventListener("click", () => {
	const insertText = `| **Column 1** | **Column 2** | **Column 3** |
| ------------ | ------------ | ------------ |
| Row 1        | Row 1        | Row 1        |
| Row 2        | Row 2        | Row 2        |
| Row 3        | Row 3        | Row 3        |

`;
	insertMarkdownAtCursor(markdown, insertText);
});