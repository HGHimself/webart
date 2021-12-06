export const copyToClipboard = (text) => {
  console.log(text);
  const copy = function (e) {
      e.preventDefault();
      if (e.clipboardData) {
          e.clipboardData.setData('text/plain', text);
      } else if (window.clipboardData) {
          window.clipboardData.setData('Text', text);
      }
  }

  window.addEventListener('copy', copy);
  document.execCommand('copy');
  window.removeEventListener('copy', copy);
}

export const imgFromSvg = (gif, vector, cb) => {
  const img = new Image()
  const serialized = new XMLSerializer().serializeToString(vector.node())
  const svg = new Blob([serialized], {type: "image/svg+xml"})
  const url = URL.createObjectURL(svg)
  img.onload = () => {
    gif.addFrame(img, {delay: 1})
    cb()
  }
  img.src = url
}
