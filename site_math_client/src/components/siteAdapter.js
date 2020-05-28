class SiteAdapter {
     constructor() {
          // this.baseUrl = "http://localhost:3000/"
          this.baseUrl = "https://site-math.herokuapp.com/url_data"
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
          return fetch(adapter.baseUrl, options)
               .then(res => res.json())
     }
}