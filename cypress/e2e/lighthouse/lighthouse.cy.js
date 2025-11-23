describe("Medición Lighthouse en SauceDemo", () => {
  it("Evalúa rendimiento básico", () => {
    cy.visit("");
    cy.lighthouse(
      {
        performance: 40,
        accessibility: 70,
        seo: 50,
        "best-practices": 50,
      },
      {
        formFactor: "desktop",
        screenEmulation: { disabled: true },
      }
    ).then((results) => {
      // Guarda los resultados
      cy.task("saveLighthouseReport", results);
    });
  });
});
