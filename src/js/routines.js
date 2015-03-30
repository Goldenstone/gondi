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
    this.fromCond = m.prop(null);
    this.toCond = m.prop(null);

    //this.typeCond = m.prop(null); TODO: add type attribute to model

    this.filters = m.prop([
      function(r) {
        return vm.fromCond() === null || vm.fromCond() === r.from;
      },
      function(r) {
        return vm.toCond() === null || vm.toCond() === r.to; 
      }
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
      var routines = vm.routines();
      var extract = function(attr) {
        return _.uniq(_.pluck(routines, attr));
      }
      var destinations = extract('to') 
        , departures = extract('from') 
        , types = extract('type');

      if (destinations.length > 1) destinations.unshift(null);
      if (departures.length > 1) departures.unshift(null);
      if (types.length > 1) types.unshift(null);

      return m('.controls', [
        m('span.control', [
          m('span', '出发地'),
          m('select', { onchange: vm.changeCond.bind('from') }, _.map(departures, function(depart) {
            if (depart === null)
              return m('option', { value: '' }, '全部');
            return m('option', { value: depart }, depart);
          }))
        ]),
        m('span.control', [
          m('span', '目的地'),
          m('select', { onchange: vm.changeCond.bind('to') }, _.map(destinations, function(dest) {
            if (dest === null)
              return m('option', { value: '' }, '全部');
            return m('option', { value: dest }, dest);
          }))
        ]),
        m('span.control', [
          m('span', '类型'),
          m('select', { onchange: vm.changeCond.bind('type') }, _.map(types, function(type) {
            if (type === null)
              return m('option', { value: '' }, '全部');
            return m('option', { value: type }, type);
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
