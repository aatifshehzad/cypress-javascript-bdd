/// <reference types="Cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import HomePage from '../../../support/pageObjects/homePage'
import ProductPage from '../../../support/pageObjects/productPage'

const homepage = new HomePage()
const productpage = new ProductPage()

var finalTotal = 0

Given('user is navigated to Ecommerce Page', () => {
    cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('user adds items to Cart', function () {
    homepage.getShopTab().click()
    if (Array.isArray(this.data.product)) {
        this.data.product.forEach(function (prodName) {
            cy.selectProduct(prodName)
        })

    }
    else {
        cy.selectProduct(this.data.product)
    }
})

When('user validate the total prices', () => {
    productpage.getCheckOut().click()
    productpage.getProducts().should('have.length', 2)
    productpage.getTotaleachrow()
        .each(($el, index, $list) => {
            const actualText = $el.text()
            var res = actualText.split(" ")
            res = res[1].trim()
            finalTotal = Number(finalTotal) + Number(res)
        }).then(function () {
            cy.log(finalTotal)
        })
    productpage.getTotal().then(function ($el) {
        const actualTotalText = $el.text()
        var actualTotal = actualTotalText.split(" ")
        actualTotal = actualTotal[1].trim()
        expect(actualTotal).to.equal(String(finalTotal))
    })
})

Then('user should be able to place the order', function () {
    productpage.getCheckoutFinal().click()
    productpage.getCountry().type(this.data.country)
    productpage.getCountrySuggestion()
        .each(($el, index, $list) => {
            if ($el.text().includes(this.data.country)) {
                //wrap resolves the promise
                cy.wrap($el).click()
            }
        })

    productpage.getCountry().should('have.value', this.data.country)
    productpage.getCheckBoxTerms().check({ force: true }).should('be.checked')
    productpage.getPurchase().click()
    productpage.getSuccessAlert().should('contain', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
})


When('user fill the form details', function (dataTable) {
    dataTable.hashes().forEach((element) =>{
        homepage.getEditBox().type(element.name)
        homepage.getGender().select(element.gender)
        homepage.getTwoWayDataBinding().should('have.value', element.name)
    })

})

Then('user validate the form behavior', function () {
    
    homepage.getEntrepreneur().should('be.disabled')
    homepage.getEditBox().clear()
    homepage.getEditBox().should('have.attr', 'minlength', '2')

})