
Vue.component('question-detail', {
  props: {
    id: {
      required: true
    },
    pub_date: { 
      required: true 
    },
    question_text: { 
      required: true
    }
  },
  data() {
    return {
      isExpanded: false,
      q: {
        id: this.id, 
        pub_date: this.pub_date,
        question_text: this.question_text
      }
    };
  },
  template: `
      <li class="list-group-item">
        {{ q.question_text }}
        <b-button variant="outline-secondary" size="sm" @click="toggle">toggle details view</b-button>
        <div v-show="isExpanded"> 
          <p>Expanded details go here.</p>
          <input v-model="q.question_text" @blur="update"></input>
        </div>
      </li>
    `,
    methods: {
      toggle() {
        //console.log("expand toggled");
        this.isExpanded = !this.isExpanded
      },
      update() {
        // console.log("blur - save changes: " + JSON.stringify(this.q));
        this.$emit("input", this.q);
      }
    }
});

Vue.component('question-list', {
  template: `
    <div>
      <div class="card">
        <ul class="list-group list-group-flush">
          <question-detail  
            v-for="question in questions" :key="question.id"
            v-bind="question"
            @input="updateQuestion">
          </question-detail>
        </ul>
      </div>
      <b-alert variant="secondary" show>{{ message }} </b-alert>
    </div>

  `,
  data() {
    return {
      questions: [],
      message: "question-list component initializing..."
    }
  },
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
        t.message = "API data retrieved in component";
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
    }
  }
});




    var app = new Vue({
      el: '#app',
      methods: {

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