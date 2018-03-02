

    var app = new Vue({
      el: '#app',
      data: {
        message: 'static data initialized', 
        title: 'Question list',
        questions: [ { text: "q1" }, { text: "q2"} ]
      }
    })