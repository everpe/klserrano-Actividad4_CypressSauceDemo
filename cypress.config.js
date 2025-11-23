module.exports = {
  e2e: {
    setupNodeEvents(on, config) {},
    //URL base de la aplicación de prueba
    baseUrl: "https://www.saucedemo.com/",
    //Reintentos para casos de prueba fallidos
    retries: {
      openMode: 1,
      runMode: 1,
    },
  },
};

//import "@cypress-audit/lighthouse/commands"; en archivo de comandos

/*const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");

module.exports = {
  e2e: {
    baseUrl: "https://www.saucedemo.com/", // this is your app
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y(console.log.bind(console)),
      });
      on("task", {
        saveLighthouseReport(results) {
          const filePath = "cypress/reports/lighthouse-report.json";
          fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
          console.log(" Reporte Lighthouse guardado en:", filePath);
          return null;
        },
      });
    },
  },
};*/
