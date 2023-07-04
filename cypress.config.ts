import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    specPattern: "cypress/e2e/**/*.{spec,test}.{js,ts,tsx}",
  },

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.{spec,test}.{js,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
