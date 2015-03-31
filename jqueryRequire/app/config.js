require.config({
  // make components more sensible
  // expose jquery
  paths: {
    "components": "../bower_components",
    "jquery": "../bower_components/jquery/dist/jquery",
    "jquery-ui": "../bower_components/jquery-ui/jquery-ui"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





