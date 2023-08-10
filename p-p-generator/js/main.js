

var app = new Vue({
  el: "#app",
  data: {
    iOrWe: "[I/We]",
    typeOfDev: "",
    webName: "",
    siteURL: "",
    webContact: "",
    myOrOur: "[my/our]",
    meOrUs: "[me/us]",
    areOrAm: "[are/am]",
    devName: "",
    companyName: "",
    companyAdd: "",
    companyAddIn: "",
    devOrCompanyName: "[Developer/Company name]",
    effectiveFromDate: new Date().toISOString().slice(0, 10),
    thirdPartyServices: thirdPartyServicesJsonArray,
    showPrivacyModal: false,
    showDisclaimerModal: false,
    hasThirdPartyServicesSelected: true,
    contentRenderType: 1,
    wizardStep: 1,
    totalWizardSteps: 3,
    isRequired: false,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    preview: function (id) {
      this.contentRenderType = 1
    },
    nextStep: function () {
      if (this.wizardStep <= this.totalWizardSteps) {
        if (this.wizardStep == 1) {
          if (this.webName.length == 0 || this.webName == "" || this.webName == null || this.webName == "Please provide the name website!") {
            this.webName = "Please provide the name of website!"
            return
          }

          if (this.webContact.length == 0 || this.webContact == "" || this.webContact == null) {
            this.webContact = "Please provide the contact email!"
            return
          }
          else if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(this.webContact)) {
            this.webContact = "Please provide a valid email!"
            return
          }


          if (this.siteURL.length == 0 || this.siteURL == "" || this.siteURL == null || this.siteURL == "Please provide your website URL!") {
            this.siteURL = "Please provide your website URL!"
            return
          }

          if (this.typeOfDev.length == 0) {
            this.isRequired = true
            return
          }
        }

        this.wizardStep += 1
      }
    },
    prevStep: function () {
      if (this.wizardStep >= 1) {
        this.wizardStep -= 1
      }
    },
    checkForThirdPartyServicesEnabled: function () {
      let listOfEnabledThirdPartyServices = []
      this.thirdPartyServices.forEach((item) => {
        if (item[item.model] == true) {
          listOfEnabledThirdPartyServices.push(true)
        }
      })

      return listOfEnabledThirdPartyServices.length > 0
    },
    toggleState: function (item) {
      let state = item.model

      // console.log('Item:', item.name, item.model, item[state])
      // For reactive update of the json
      // Toggle the state
      Vue.set(thirdPartyServicesJsonArray, item.model, !item[state])
    },
    getHtml: function (id, target) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      this.contentRenderType = 2
      loadInTextView(target, rawHTML)
    },
    getMarkdown: function (id, target) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      let markdown = convertHtmlToMd(rawHTML)
      this.contentRenderType = 2
      loadInTextView(target, markdown)
    },
    generate: function () {
      if (this.typeOfDev === "Individual") {
        this.devOrCompanyName = this.devName
        this.iOrWe = "I"
        this.myOrOur = "my"
        this.meOrUs = "me"
        this.areOrAm = "am"
      } else if (this.typeOfDev === "Company") {
        this.devOrCompanyName = this.companyName
        this.iOrWe = "we"
        this.myOrOur = "our"
        this.meOrUs = "us"
        this.areOrAm = "are"
      }

      if (this.companyAdd === "") {
        this.companyAddIn = ""
      } else {
        this.companyAddIn = "Our Address: " + this.companyAdd
      }
    },
    togglePrivacyModalVisibility: function () {
      this.generate()
      this.hasThirdPartyServicesSelected = this.checkForThirdPartyServicesEnabled()
      this.contentRenderType = 1
      this.showPrivacyModal = !this.showPrivacyModal
    },
    toggleDisclaimerModalVisibility: function () {
      this.showDisclaimerModal = !this.showDisclaimerModal
    },
  },
})