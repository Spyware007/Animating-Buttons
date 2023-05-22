export default function getPagesInText(id) {
  var data = [];
  fetch(`/Buttons/${id}/index.html`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  fetch(`/Buttons/${id}/style.css`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  fetch(`/Buttons/${id}/app.js`)
    .then((res) => res.text())
    .then((text) => data.push(text));

  return data;
}
