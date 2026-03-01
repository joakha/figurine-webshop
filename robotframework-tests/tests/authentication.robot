*** Settings ***
Library             Browser

*** Variables ***
${frontend_url}    %{URL}
${testuser_name}    %{USERNAME}
${testuser_password}    %{PASSWORD}

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
    When the user enters correct email
    And the user enters correct password
    Then the user is signed in

The user can sign out
    Given the user can sign in
    When the user clicks the account icon
    And the user clicks the sign out button
    Then the user is signed out

*** Keywords ***
the user navigates to the front page address
    New Page    ${frontend_url}

the front page page is loaded
    ${url}=    Get Url
    Should Be Equal    ${url}    ${frontend_url}

the application title should be displayed
    Wait For Elements State    text=Webshop Project    visible

the front page is displayed
    the user navigates to the front page address
    the front page page is loaded
    the application title should be displayed

the user clicks the sign in button
    Click        text=Sign In

the user is navigated to the sign in page
    ${url}=    Get Url
    Should Be Equal    ${url}    ${frontend_url}sign-in

the sign in form should be displayed
    Wait For Elements State    text=Sign in to My Application    visible

the sign in form is displayed
    the front page is displayed
    the user clicks the sign in button
    the user is navigated to the sign in page
    the sign in form should be displayed

the user enters correct email
    Wait For Elements State    css=#identifier-field    visible
    Fill Secret    css=#identifier-field    $testuser_name
    Click        text="Continue"

the user enters correct password
    Wait For Elements State    css=#password-field    visible
    Fill Secret    css=#password-field    $testuser_password
    Click        text="Continue"

the user is signed in
    Wait For Elements State    text=Webshop Project    visible

the user can sign in
    the sign in form is displayed
    the user enters correct email
    the user enters correct password
    the user is signed in

the user is signed out
    New Page    https://playwright.dev/

the user clicks the account icon
    New Page    https://playwright.dev/

the user clicks the sign out button
    New Page    https://playwright.dev/
