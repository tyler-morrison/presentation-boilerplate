let template = require('./time.jade');

setInterval(function () {
  let div = document.getElementById('main');
  div.innerHTML = template({ time: new Date() });
  div.style.color = 'navy';
}, 1000);
