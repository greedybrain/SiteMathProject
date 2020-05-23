class SiteAdapter {
     constructor() {
          this.baseUrl = "http://localhost:3000/"
     }

     static getUrl(e) {
          const adapter = new this
          const data = {
               url: e.target.value
          }
          const options = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
               },
               body: JSON.stringify(data)
          }
          return fetch(adapter.baseUrl + 'url_data', options)
               .then(res => res.json())
     }
}