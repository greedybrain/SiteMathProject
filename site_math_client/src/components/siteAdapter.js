class SiteAdapter {
     constructor() {
          this.baseUrl = "http://localhost:3000/"
          this.searchInput = document.querySelector("input[name=url_link]")
     }

     static getUrlData(e) {
          const adapter = new this
          const data = {
               url_link: new this().searchInput.value 
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