String.prototype.strReplace = function(needle, replacement) {return this.split(needle).join(replacement||"");};

let get = function(url, callback){
  let request = new XMLHttpRequest()
  request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
      callback(JSON.parse(this.responseText))
    }
  }
  request.open('GET', url)
  request.send()
}


let app = new Vue({
  el: '#app',
  data: {
    city: '',
    result: {},
    error: '',
    loaded: false,
    loading: false
  },
  methods: {
    search(){
      this.loading = true
      get(
        'https://www.prevision-meteo.ch/services/json/' +
        this.city.strReplace(' ', '-').strReplace("'", '-').toLowerCase(),
        (resp) => {
          this.loading = false
          this.loaded = true
          if(resp.errors){
            this.error = resp.errors[0].text
          }else{
            this.error = ''
            this.result = resp
          }
        }
      )
    }
  }
})
