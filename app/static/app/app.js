

    var app = new Vue({
      el: '#app',
      mounted() {
        this.fetchData();
      },
      methods: {
        fetchData() {
          let t = this; // this will not be in scope in the callback
          fetch('api/questions/').then(function(res) {
            return res.json()
          }).then(function(data) {
            t.questions = data;
            t.message = "API data fetched"
          }).catch(function(err) {
            console.error(err);
          })
        }
      },
      data: {
        message: 'static data initialized', 
        title: 'Question list',
        questions: []
      }
    })