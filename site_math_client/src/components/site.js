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
     }

     handleOnKeyUp() {
          const form = document.querySelector("input[name=url_link]").parentElement
          form.addEventListener("submit", e => {
               e.preventDefault()

               SiteAdapter.getUrlData()
                    .then(site => {
                         debugger
                         form.reset()
                    })
          })
     }

     static buildDomElementsForSiteData(site) {
          const newSite = new this(
               site.id,
               site.url_link,
               site.overall_site_worth,
               site.rev_per_day,
               site.rev_per_month,
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

          
     }



}