*** Settings ***
Library             Browser

*** Test Cases ***
The Front page is displayed
    Given the user navigates to the front page address
    When the front page page is loaded
    Then the application title should be displayed

The user can login
    Given the front page is displayed
    When the user clicks the login button
    And the user clicks the login button
    And the user enters correct credentials
    Then the user should be logged in


*** Keywords ***
the user navigates to the front page address
    New Page    https://playwright.dev/

the front page page is loaded
    New Page    https://playwright.dev/

the application title should be displayed
    New Page    https://playwright.dev/

the front page is displayed
    the user navigates to the front page address
    the front page page is loaded
    the application title should be displayed

the user clicks the login button
    New Page    https://playwright.dev/

the user enters correct credentials
        New Page    https://playwright.dev/

the user should be logged in
    New Page    https://playwright.dev/