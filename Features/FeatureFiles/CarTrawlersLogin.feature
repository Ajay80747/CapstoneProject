Feature: Avis India Login

Scenario: Checking Avis Login Functionality

Given User Should Launch Chrome browser

When User Should Navigate to url 'https://www.avis.co.in/'
Then User Should Verify that Avis home page is visible successfully
Then User Should Click on 'Login' button
Then User Should Verify Login page is visible successfully
Then User Should Enter valid email address
Then User Should Enter valid password
Then User Should Click on 'Login' button
Then User Should Verify user is logged in successfully