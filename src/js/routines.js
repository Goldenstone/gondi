var m = require('mithril');
var _ = require('underscore');

var makeRoutines = function(options) {
  if (!options.root) throw Error("missing root!");

  var routines = {};

  routines.vm = {};
  routines.vm.init = function() {
    this.routines = m.request({ method: 'GET', url: '/api/routines/' }); 
  };

  routines.view = function(ctrl) {
    var vm = routines.vm;

    var getTableHeaders = function() {
      var headers = ['发车地点', '终点站', '价格', '发车时间', '备注'];
      return _.map(headers, function(h) {
        return m('th', h); 
      });
    };
    var getRoutines = function(routines) {
      return _.map(routines, function(r) {
        return m('tr', [
          m('td', r.from),
          m('td', r.to),
          m('td', r.price),
          m('td', r.startTime),
          m('td', r.note)
        ]);
      });
    };

    return m('table.pure-table.pure-table-bordered', [
      m('thead', [
        m('tr', getTableHeaders())
      ]),
        m('tbody', getRoutines(vm.routines()))
    ]);
  };

  routines.controller = function() {
    var vm = routines.vm;
    vm.init();
  }

  m.module(options.root, routines);
  return routines;
};

makeRoutines({
  root: document.getElementById('routines')
});
