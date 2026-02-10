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

The Sign in Form is displayed
    Given the user navigates to the front page address
    When the user clicks to login button
    And the user is navigated to the sign in page
    Then the sign in form should be displayed

*** Keywords ***
the user navigates to the front page address
    New Browser    chromium    headless=False
    New Page    http://localhost:5173/

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

the user clicks to login button
    Click        text=Sign In

the user is navigated to the sign in page
    ${url}=    Get Url
    Should Be Equal    ${url}    http://localhost:5173/sign-in

the sign in form should be displayed
    Wait For Elements State    text=Sign in to My Application    visible
    