class Site {
     constructor() {
          this.searchInput = document.querySelector("input[name=url_link]")
     }

     handleOnKeyUp() {
          this.searchInput.addEventListener("keyup", e => {
               SiteAdapter.getUrl(e)
                    .then(data => {
                         debugger
                    })
          })
     }

}