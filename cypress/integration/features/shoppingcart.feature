Feature: End to End Ecommerce Validation

    Regress the End to End Ecommerce Flow

    @regression
    Scenario: Ecommerce Products Delivery
        Given user is navigated to Ecommerce Page
        When user adds items to Cart
        And user validate the total prices
        Then user should be able to place the order
    
    @smoke
    Scenario: Filling the Form to Shop
        Given user is navigated to Ecommerce Page
        When user fill the form details
            | name  | gender |
            | Aatif | Male   |
        Then user validate the form behavior
