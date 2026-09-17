Feature: Avis India Contact Us Form

Scenario: Checking Contact Us Form Functionalities

Given User Should Launch Chrome browser

When User Should Navigate to url 'https://www.avis.co.in/contact-us'
Then User Should Verify that Contact Us page is visible successfully
Then User Should Verify 'Contact Us' is visible
Then User Should Enter name
Then User Should Enter email
Then User Should Enter phone number
Then User Should Enter message
Then User Should Click 'Submit' button
Then User Should Verify success message is visible
Then User Should Click 'Home' button
Then User Should Verify that user is landed on home page successfully