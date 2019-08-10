module.exports = {
    'GET /repos/hello': function(req, res) {
      res.json({
        code: 0,
        mesage: '',
        data: {
          title: 'mock',
          author: 'yoranfu',
        },
      });
    },
  };
  