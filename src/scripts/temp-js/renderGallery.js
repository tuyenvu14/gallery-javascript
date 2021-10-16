
  let css = `%%css%%`;
  let html = `%%html%%`;
  
  var result = document.getElementById("test");
  result.innerHTML = "";
  result.innerHTML = `<style>${css}</style>${html}`;

  %%js%%


