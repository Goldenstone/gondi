var m = require('mithril');
var _ = require('underscore');

var makeRoutines = function(options) {
  if (!options.root) throw Error("missing root!");

  // namespace
  var routines = {};

  // view-model
  routines.vm = {};
  routines.vm.init = function() {
    var vm = routines.vm;

    this.routines = m.request({ method: 'GET', url: '/api/routines/' }); 
    
    // Conditions
    this.toCond = m.prop(null);
    //this.typeCond = m.prop(null);
    this.filters = m.prop([
      function(r) {
        return vm.toCond() === null || vm.toCond() === r.to; 
      },
      /*function(r) {
        return vm.typeCond
      }*/
    ]);

    this.changeCond = function(e) {
      var condType = this + 'Cond'
        , value = e.target.value;

      if (vm.hasOwnProperty(condType)) {
        vm[condType](value?value:null);
      }
    }

    this.filteredRoutines = function() {
      return _.filter(this.routines(), function(r) {
        var filters = this.filters();
        for(var i = 0; i < filters.length; i++) {
          if (!filters[i].apply(this, [r])) return false;
        }
        return true;
      }, this);
    };
  };

  // view
  routines.view = function(ctrl) {
    var vm = routines.vm;

    var getTableHeaders = function() {
      var headers = ['发车地点', '目的地', '价格', '发车时间', '备注'];
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
    
    var getRoutineTable = function(routines) {
      return m('table.pure-table.pure-table-bordered', [
        m('thead', [
          m('tr', getTableHeaders())
        ]),
        m('tbody', getRoutines(routines))
      ]);
    };
    
    var getControlSection = function() {
      var destinations = _.uniq(_.pluck(vm.routines(), 'to'));
      destinations.unshift(null);

      return m('.controls', [
        m('.control', [
          m('span', '目的地'),
          m('select', { onchange: vm.changeCond.bind('to') }, _.map(destinations, function(dest) {
            if (dest === null)
              return m('option', { value: '' }, '无');
            return m('option', { value: dest }, dest);
          }))
        ])
      ]);
    }

    return [
      getControlSection(),
      getRoutineTable(vm.filteredRoutines())
    ]
  };

  // controller
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
