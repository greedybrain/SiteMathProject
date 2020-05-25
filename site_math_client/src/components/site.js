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
          this.siteCards = document.querySelectorAll("div.site-card")
          this.yesFavs = document.querySelector(".yes-favs")
          this.noFavs = document.querySelector(".no-favs")
     }

     static sitesArr = []
     static visitorSaves = []

     static handleInitRender() {
          const favAmt = document.querySelector("span.fav-amt")
          if (localStorage.length !== 0) {
               const saves = JSON.parse(localStorage.visitorSaves)
               if (saves.length > 0) {
                    new this().yesFavs.style.display = "inline-block"
               } else {
                    new this().noFavs.style.display = "inline-block"
               }
          } else {
               new this().noFavs.style.display = "inline-block"
          }
     }

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
                          const cards = this.siteDataCont.querySelectorAll("div.site-card")
                          Array.from(cards).forEach(card => {
                               this.handleSiteCardRemoveAnimation(card)
                          })
                         // push site data into array
                         Site.sitesArr.push(site)
                         const newSite = new Site()
                         newSite.buildDomElementsForSiteData(site)
                         form.parentElement.style.height = "20vh"
                         this.siteDataCont.style.backgroundImage = "none"
                    
                         this.siteDataCont.firstElementChild.classList.add(
                              "animate__animated",
                              "animate__backInUp",
                              "animate__fast",
                         )
                         localStorage.setItem("sites", JSON.stringify(Site.sitesArr))
                         form.reset()
                         this.handleSaveBtnClick(site)
                    })
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

     handleSiteCardRemoveAnimation(siteCard) {
          siteCard.classList.add(
                "animate__animated",
                "animate__bounceOutDown",
                "animate__fast"
          )
          setTimeout(() => {
               siteCard.remove()
          }, 500);
     }

     handleSaveBtnClick(site) {
          setTimeout(() => {
               const saveBtn = document.querySelector("button.save-btn")
               saveBtn.addEventListener("click", () => {
                    if (Site.visitorSaves.includes(site)) {
                         alert("You already saved that site")
                    } else {
                         Site.visitorSaves.push(site)
                         alert("Site data saved!")
                    }
                    localStorage.setItem("visitorSaves", JSON.stringify(Site.visitorSaves))
               })
          }, 3000);
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
          const siteHeadingDiv = document.createElement('div')
          siteHeadingDiv.classList.add("card-header")
          const siteHeading = document.createElement('h1')
          siteHeading.title = "Website Name/Domain"
          const siteOverallWorth = document.createElement("h2")
          siteOverallWorth.textContent = `OW ${newSite.overallWorth}`
          siteOverallWorth.title = "Overall Worth"
          const siteAlexaRank = document.createElement("h2")
          siteAlexaRank.textContent = `Alexa Rank #${newSite.alexaRank}`
          siteAlexaRank.title = "Alexa Rank"
          siteHeading.classList.add("site-name")
          const saveBtn = document.createElement("button")
          saveBtn.classList.add("save-btn")
          saveBtn.textContent = `Save ${newSite.siteName} Data`

          if (newSite.siteName !== undefined) {
               if (newSite.siteName.includes('.')) {
                    siteHeading.textContent = [newSite.siteName[0].toUpperCase(), ...newSite.siteName.slice(1, newSite.siteName.indexOf('.'))].join('')
               } else {
                    siteHeading.textContent = [newSite.siteName[0].toUpperCase(), ...newSite.siteName.slice(1)].join('')
               }
          } else {
               siteHeading.textContent = "N/A"
          }
          siteHeadingDiv.append(siteHeading, siteOverallWorth, siteAlexaRank)

          // create ul for all site rev data under heading
          const siteRevList = document.createElement("ul")
          siteRevList.title = "Est. Revenue Data"
          siteRevList.classList.add("data-rev-list")
          const dataRevDailyLi = document.createElement('li')
          dataRevDailyLi.innerHTML += `<span class="dollar-sign">${newSite.revDaily[0]}</span> ${newSite.revDaily.slice(1)}/day`
          const dataRevMonthlyLi = document.createElement('li')
          dataRevMonthlyLi.innerHTML += `<span class="dollar-sign">${newSite.revMonthly[0]}</span> ${newSite.revMonthly.slice(1)}/mon`
          const dataRevYearlyLi = document.createElement('li')
          dataRevYearlyLi.innerHTML += `<span class="dollar-sign">${newSite.revYearly[0]}</span> ${newSite.revYearly.slice(1)}/yr`

          // create ul for all site view data under heading
          const siteViewsList = document.createElement("ul")
          siteViewsList.title = "Est. Page View Data"
          siteViewsList.classList.add("data-views-list")
          const dataViewsDailyLi = document.createElement('li')
          dataViewsDailyLi.innerHTML += `<span class="view-count"><i class="fas fa-eye"></i></span> ${newSite.viewsDaily}/day`
          const dataViewsMonthlyLi = document.createElement('li')
          dataViewsMonthlyLi.innerHTML += `<span class="view-count"><i class="fas fa-eye"></i></span> ${newSite.viewsMonthly}/mon`
          const dataViewsYearlyLi = document.createElement('li')
          dataViewsYearlyLi.innerHTML += `<span class="view-count"><i class="fas fa-eye"></i></span> ${newSite.viewsYearly}/yr`

          // create ul for all site visit data under heading
          const siteVisitsList = document.createElement("ul")
          siteVisitsList.title = "Est. Page Visit Data"
          siteVisitsList.classList.add("data-views-list")
          const dataVisitsDailyLi = document.createElement('li')
          dataVisitsDailyLi.innerHTML += `<span class="visit-count"><i class="fas fa-chart-line"></i></span> ${newSite.visitsDaily}/day`
          const dataVisitsMonthlyLi = document.createElement('li')
          dataVisitsMonthlyLi.innerHTML += `<span class="visit-count"><i class="fas fa-chart-line"></i></span> ${newSite.visitsMonthly}/mon`
          const dataVisitsYearlyLi = document.createElement('li')
          dataVisitsYearlyLi.innerHTML += `<span class="visit-count"><i class="fas fa-chart-line"></i></span> ${newSite.visitsYearly}/yr`

          // final appending to site data container goes here
          siteCard.append(siteHeadingDiv, siteRevList, siteViewsList, siteVisitsList)
          setTimeout(() => {
               dataRevDailyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteRevList.appendChild(dataRevDailyLi)
          }, 700);
          setTimeout(() => {
               dataRevMonthlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteRevList.appendChild(dataRevMonthlyLi)
          }, 800);
          setTimeout(() => {
               dataRevYearlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteRevList.appendChild(dataRevYearlyLi)
          }, 900);

          // handling data views 
          setTimeout(() => {
               dataViewsDailyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteViewsList.appendChild(dataViewsDailyLi)
          }, 1100);
          setTimeout(() => {
               dataViewsMonthlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteViewsList.appendChild(dataViewsMonthlyLi)
          }, 1200);
          setTimeout(() => {
               dataViewsYearlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteViewsList.appendChild(dataViewsYearlyLi)
          }, 1300);

          // handling traffic visits
          setTimeout(() => {
               dataVisitsDailyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteVisitsList.appendChild(dataVisitsDailyLi)
          }, 1500);
          setTimeout(() => {
               dataVisitsMonthlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteVisitsList.appendChild(dataVisitsMonthlyLi)
          }, 1600);
          setTimeout(() => {
               dataVisitsYearlyLi.classList.add(
                    "animate__animated",
                    "animate__slideInRight",
                    "animate__fast"
               )
               siteVisitsList.appendChild(dataVisitsYearlyLi)
          }, 1700);
          setTimeout(() => {
               saveBtn.classList.add(
                    "animate__animated",
                    "animate__zoomIn",
                    "animate__fast"
               )
               siteCard.append(saveBtn)
          }, 1600);
          
          this.siteDataCont.prepend(siteCard)
     }

}