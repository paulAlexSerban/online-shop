/**
 * @param { object } req 
 * @param { object } res 
 * @param { object } next
 * 
 * - responds with `404` code and renders the `404.ejs` view
 */

exports.get404 = (req, res, next) => {
  res.status(404).render('404', { 
    pageTitle: 'Page Not Found',
    path: '/'
  });
}