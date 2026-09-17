Feature: Avis India Car Rental

Scenario: Checking Car Rental Functionality

Given User Should Launch Chrome browser

When User Should Navigate to url 'https://www.avis.co.in/'
Then User Should Verify that Avis home page is visible successfully
Then User Should Click on 'Car Rentals' option
Then User Should Verify Car Rental page is visible successfully
Then User Should Verify 'Pick-up Location' is visible
Then User Should Enter pick-up location
Then User Should Verify 'Start Date' is visible
Then User Should Select start date
Then User Should Verify 'Return Date' is visible
Then User Should Select return date
Then User Should Click on 'Search' button
Then User Should Verify available rental cars are displayed