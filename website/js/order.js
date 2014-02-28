
window.addEventListener('load', function(event) {
  
  //Set up the menu
  $("#accordion").accordion({ active: 2 });
  $("#time").spinner({
    min : 0,
    max : 100,
    showOn : 'both'
  });
  
  
});
