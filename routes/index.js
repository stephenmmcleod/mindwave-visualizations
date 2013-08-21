
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Stream Graph' });
};

exports.circle = function(req, res){
  res.render('circle', { title: 'Circle Graph' });
};