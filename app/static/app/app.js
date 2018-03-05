

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
        },
        updateQuestion(q) {
          console.log(q);
          let now = new Date();
          q.pub_date = now.toISOString();
          console.log(JSON.stringify(q));
          let t = this;
          fetch('api/questions/' + q.id + '/', {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(q), 
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(function(data) {
            console.log("---DATA---")
            console.log(data);
          }).catch(function(err) {
            console.error("***ERROR****")
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
        title: 'Question list',
        questions: []
      }
    })