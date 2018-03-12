

Vue.component('question-list', {
  template: '<ul><slot></slot></ul>'

});

Vue.component('question-detail', {
  template: '<li><slot></slot></li>'
});


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
            t.message = "API data retrieved";
          }).catch(function(err) {
            console.error(err);
          })
        },
        updateQuestion(q) {
          let now = new Date();
          q.pub_date = now.toISOString();
          fetch('api/questions/' + q.id + '/', {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(q), 
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(function(data) {
            console.log("---PUT---")
            console.log(data);
          }).catch(function(err) {
            console.error("***PUT-ERROR****")
            console.error(err);
          })
        },
        saveQuestion(q) {
          console.log(q);
          let now = new Date();
          q.pub_date = now.toISOString();
          console.log(JSON.stringify(q));
          let t = this;
          fetch('api/questions/', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(q), 
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(function(data) {
            console.log(data);
          }).catch(function(err) {
            console.err(err);
          })
        }
      },
      data: {
        message: 'static data initialized', 
        title: 'Questions',
        questions: []
      }
    })