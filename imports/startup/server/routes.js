Router.map(function () {
  this.route("/test", function () {
    this.response.end('test');
  }, {where: "server"});
});