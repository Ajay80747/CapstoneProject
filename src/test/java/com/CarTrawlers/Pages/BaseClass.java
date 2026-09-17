package com.CarTrawlers.Pages;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import Utility.BrowserFactory;

public class BaseClass {

    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {

        driver = BrowserFactory.BrowserOptions(
                driver,
                "chrome",
                "https://www.avis.co.in/"
        );
    }

    @AfterMethod
    public void tearDown() {

        BrowserFactory.quitBrowser(driver);
    }
}