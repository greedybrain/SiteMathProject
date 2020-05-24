class SiteAdapter {
     constructor() {
          this.baseUrl = "http://localhost:3000/"
          this.searchInput = document.querySelector("input[name=url_link]")
     }

     static getUrlData() {
          const adapter = new SiteAdapter()
          const data = {
               url_link: adapter.searchInput.value
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