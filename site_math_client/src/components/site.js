class Site {
     constructor(siteId, siteName, overallWorth, revDaily, revMonthly, revYearly, viewsDaily, viewsMonthly, viewsYearly, visitsDaily, visitsMonthly, visitsYearly, alexaRank) {
          this.siteId = siteId
          this.siteName = siteName
          this.overallWorth = overallWorth
          this.revDaily = revDaily
          this.revMonthly = revMonthly
          this.revYearly = revYearly
          this.viewsDaily = viewsDaily
          this.viewsMonthly = viewsMonthly
          this.viewsYearly = viewsYearly
          this.visitsDaily = visitsDaily
          this.visitsMonthly = visitsMonthly
          this.visitsYearly = visitsYearly
          this.alexaRank = alexaRank
          this.search = document.querySelector("input.search")
          this.siteDataCont = document.querySelector("div.site-data-cont")
          this.container = document.querySelector("div.container")
          this.dots = document.querySelectorAll('.dot')
     }

     static sitesArr = []

     handleFormSubmit() {
          const form = document.querySelector("input[name=url_link]").parentElement.parentElement
          
          
          // detect input 
          this.handleKeyUp()
          this.handleOnBlurEvent()

          form.addEventListener("submit", e => {
               e.preventDefault()

               SiteAdapter.getUrlData()
                    .then(site => {
                         // clear site data container
                         this.siteDataCont.querySelectorAll('*').forEach(ele => {
                              ele.remove()
                         })
                         // push site data into array
                         Site.sitesArr.push(site)
                         const newSite = new Site()
                         newSite.buildDomElementsForSiteData(site)
                         this.siteDataCont.style.backgroundImage = "none"
                         form.parentElement.style.height = "25vh"
                         form.parentElement.style.transition = "height .2s linear"
                         localStorage.setItem("sites", JSON.stringify(Site.sitesArr))
                    })
               form.reset()
          })

     }

     handleKeyUp() {
          const dot1 = document.querySelector('span.dot1')
          const dot2 = document.querySelector('span.dot2')
          const dot3 = document.querySelector('span.dot3')
          this.search.addEventListener("keyup", () => {
               setTimeout(() => {
                    dot3.classList.add(
                         "animate__animated",
                         "animate__bounce",
                         "animate__repeat-3",
                         "animate__fast",
                    )
               }, 700);
               setTimeout(() => {
                    dot2.classList.add(
                         "animate__animated",
                         "animate__bounce",
                         "animate__repeat-3",
                         "animate__fast",
                    )
               }, 800);
               setTimeout(() => {
                    dot1.classList.add(
                         "animate__animated",
                         "animate__bounce",
                         "animate__repeat-3",
                         "animate__fast",
                    )
               }, 900);
          })
     }

     handleOnBlurEvent() {
          this.search.addEventListener("blur", () => {
               this.dots.forEach(dot => {
                    dot.classList.remove(
                         "animate__animated",
                         "animate__bounce",
                         "animate__repeat-3",
                         "animate__fast"
                    )
               })
          })
     }

     buildDomElementsForSiteData(site) {
          const newSite = new Site(
               site.id,
               site.url_link,
               site.overall_site_worth,
               site.rev_per_day,
               site.rev_per_month,
               site.rev_per_year,
               site.pg_views_per_day,
               site.pg_views_per_month,
               site.pg_views_per_year,
               site.pg_visits_per_day,
               site.pg_visits_per_month,
               site.pg_visits_per_year,
               site.alexa_rank
          )
          // this line creates new site data card div
          const siteCard = document.createElement("div")
          siteCard.setAttribute("data-id", newSite.siteId)
          siteCard.classList.add("site-card")
          // this line builds h1 for site name searched
          const siteHeading = document.createElement('h1')
          siteHeading.classList.add("site-name")
          if (newSite.siteName !== undefined) {
               if (newSite.siteName.includes('.')) {
                    siteHeading.textContent = [newSite.siteName[0].toUpperCase(), ...newSite.siteName.slice(1, newSite.siteName.indexOf('.'))].join('')
               } else {
                    siteHeading.textContent = [newSite.siteName[0].toUpperCase(), ...newSite.siteName.slice(1)].join('')
               }
          } else {
               siteHeading.textContent = "N/A"
          }

          // create ul for all site data under heading
          const siteDataList = document.createElement("ul")
          siteDataList.classList.add("data-list")
          const dataRevDailyLi = document.createElement('li')
          dataRevDailyLi.innerHTML += `<span class="dollar-sign">${newSite.revDaily[0]}</span> ${newSite.revDaily.slice(1)} /day`
          const dataRevMonthlyLi = document.createElement('li')
          dataRevMonthlyLi.innerHTML += `<span class="dollar-sign">${newSite.revMonthly[0]}</span> ${newSite.revMonthly.slice(1)} /mon`
          const dataRevYearlyLi = document.createElement('li')
          dataRevYearlyLi.innerHTML += `<span class="dollar-sign">${newSite.revYearly[0]}</span> ${newSite.revYearly.slice(1)} /yr`
          // final appending to site data container goes here
          siteDataList.append(dataRevDailyLi, dataRevMonthlyLi, dataRevYearlyLi)
          siteCard.append(siteHeading, siteDataList)
          this.siteDataCont.prepend(siteCard)
     }

}