*** Settings ***
Library             Browser

*** Variables ***
${frontend_url}    %{URL}
${testuser_name}    %{USERNAME}
${testuser_password}    %{PASSWORD}
${adminuser_name}    %{ADMINUSERNAME}
${adminuser_password}    %{ADMINPASSWORD}

*** Test Cases ***
The Add Product -form is displayed
    Given the user navigates to the front page address
    When the user logs in as admin
    And the user clicks the add new product button
    Then the add product form should be displayed

Admin user can add a new product
    Given the add product form is displayed
    When the user inputs product data
    And the user clicks the submit button
    Then the new product should be added

The Edit Product -form is displayed
    Given the user navigates to the front page address
    When the user logs in as admin
    And the user clicks the edit button on a product
    Then the edit product form should be displayed

Admin user can edit a product
    Given the edit product form is displayed
    When the user edits product data
    And the user clicks the submit button
    Then the new product data should be edited

*** Keywords ***

the user navigates to the front page address
    New Page    ${frontend_url}

the user logs in as admin
    Click        text=Sign In
    Wait For Elements State    text=Sign in to My Application    visible

    Wait For Elements State    css=#identifier-field    visible
    Fill Secret    css=#identifier-field    $adminuser_name
    Click        text="Continue"

    Wait For Elements State    css=#password-field    visible
    Fill Secret    css=#password-field    $adminuser_password
    Click        text="Continue"

    Wait For Elements State    text=${adminuser_name}

the user clicks the add new product button
    Click        text=Add a new Product

the add product form should be displayed
    Wait For Elements State    text=Add a new product    visible

the add product form is displayed
    the user navigates to the front page address
    the user logs in as admin
    the user clicks the add new product button
    the add product form should be displayed

the user inputs product data
    ${uuid}    Evaluate    __import__('uuid').uuid4()
    ${name}    Set Variable    product_${uuid}
    Fill Text    id=productForm_name    ${name}

    Fill Text    id=productForm_description    testproduct

    Fill Text    id=productForm_price    1000

    Upload File By Selector    //input[@type='file']    ${CURDIR}/images/testimage.png

    Click        id=productForm_category
    Click        text=(1) Nature

    Click        id=productForm_availability
    Click        text=(2) Waiting

    Click        id=productForm_timeToDelivery
    Click        text=(1) 1 to 4 days

the user clicks the submit button
    Click        text=Submit

the new product should be added
    Wait For Elements State    text=Product was successfully added.   visible    timeout=10s

the user clicks the edit button on a product
    Click        text=Edit >> nth=0

the edit product form should be displayed
    Wait For Elements State    text=Edit Product    visible

the edit product form is displayed
    the user navigates to the front page address
    the user logs in as admin
    the user clicks the edit button on a product
    the edit product form should be displayed

the user edits product data
    ${uuid}    Evaluate    __import__('uuid').uuid4()
    ${name}    Set Variable    product_${uuid}
    Fill Text    id=productForm_description    testproduct edited ${name}

the new product data should be edited
    Wait For Elements State    text=Product was successfully edited.   visible    timeout=10s
