
exports.seed = function(knex) {
  return knex('devs').del()
    .then(function () {
      return knex('devs').insert([
        {urn: 'tecnospeed'},
      ]);
    });
};
