import * as monaco from "monaco-editor";

document.addEventListener("DOMContentLoaded", () => {
  let editor;

  // Fetch file content and load Monaco Editor
  fetch("/file")
    .then((response) => response.text())
    .then((data) => {
      editor = monaco.editor.create(document.getElementById("editor"), {
        value: data,
        language: "yaml",
        theme: "vs-dark",
      });
    });

  // Save file on button click
  document.getElementById("save-button").addEventListener("click", () => {
    const content = editor.getValue();
    fetch("/file", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: content,
    })
      .then((response) => {
        if (response.ok) {
          alert("✅ File saved successfully!");
        } else {
          alert("❌ Error saving file");
        }
      })
      .catch(() => {
        alert("❌ Network error");
      });
  });
});
