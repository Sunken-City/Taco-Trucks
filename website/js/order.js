
window.addEventListener('load', function(event) {
  
  //Set up the menu
  $("#accordion").accordion({ active: 0 });
  $(".quantity").spinner({
    min : 1,
    max : 100,
    showOn : 'both'
  });
  
  
});
