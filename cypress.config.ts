import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: "cypress/e2e/**/*.{spec,test}.{js,ts,tsx}",
    baseUrl: "https://localhost:3000",
  },

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.{spec,test}.{js,ts,tsx}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
