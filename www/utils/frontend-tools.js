export const copyToClipboard = (text) => {
  console.log(text);
  const copy = function (e) {
      e.preventDefault();
      console.log(text);
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
