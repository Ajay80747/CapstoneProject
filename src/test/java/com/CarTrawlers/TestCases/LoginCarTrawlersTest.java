package com.CarTrawlers.TestCases;

import org.testng.annotations.Test;

import com.CarTrawlers.Pages.BaseClass;
import com.CarTrawlers.Pages.LoginPage;

public class LoginCarTrawlersTest extends BaseClass {

    @Test
    public void loginTest() {

        LoginPage loginPage = new LoginPage(driver);
        loginPage.clickLogin();
        loginPage.enterMobileNumber("8074704568");
        loginPage.enterPassword("Ajay@2004");
        loginPage.clickLoginButton();
    }
}