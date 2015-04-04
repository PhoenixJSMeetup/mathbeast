(function($) {
  /**
   * Settings
   */
  // Show and hide settings
  $('.settings-button').click(function() {
      $('.settings').fadeToggle();
    }
  );

  // Start game
  $('.settings-save').click(function() {
    var Level1 = new Level(3, 4);
    Level1.init();
  });

  // Use JQuery UI to replace operator dropdown with selectmenu widget
  $('#operatorInput').selectmenu();


}(jQuery));