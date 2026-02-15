*** Settings ***
Library             Browser

*** Test Cases ***
The Front page is displayed
    Given the user navigates to the front page address
    When the front page page is loaded
    Then the application title should be displayed

The Sign in Form is displayed
    Given the front page is displayed
    When the user clicks the sign in button
    And the user is navigated to the sign in page
    Then the sign in form should be displayed

The user can sign in
    Given the sign in form is displayed
    When the user enters correct credentials
    Then the user is signed in

The user can sign out
    Given the user can sign in
    When the user clicks the account icon
    And the user clicks the sign out button
    Then the user is signed out

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

the sign in form is displayed
    the front page is displayed
    the user is navigated to the sign in page
    the sign in form should be displayed

the user can sign in
    the sign in form is displayed
    the user enters correct credentials
    the user is signed in

the user enters correct credentials
    New Page    https://playwright.dev/

the user is signed in
    New Page    https://playwright.dev/

the user is signed out
    New Page    https://playwright.dev/

the user clicks the sign in button
    Click        text=Sign In

the user is navigated to the sign in page
    ${url}=    Get Url
    Should Be Equal    ${url}    http://localhost:5173/sign-in

the sign in form should be displayed
    Wait For Elements State    text=Sign in to My Application    visible
    
the user clicks the account icon
    New Page    https://playwright.dev/

the user clicks the sign out button
    New Page    https://playwright.dev/