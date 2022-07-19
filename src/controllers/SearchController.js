class SearchController {
  index(req, res) {
    // res.render("pages/search", {
    //     title: 'Search'
    // });
    res.send("Ahihih")
  }
}

module.exports = new SearchController();
