package com.CarTrawlers.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

    WebDriver driver;

    // Login link
    By loginLink = By.xpath("//div[normalize-space()='Login/Signup']");

    // Mobile number
    By mobileNumber = By.xpath("//input[@placeholder='Enter Email / Phone No']");

    // Password
    By password = By.xpath("//input[@placeholder='Enter Email / Phone No']");

    // Login button
    By loginButton = By.xpath("//button[@class='btn radius10 with-loader w-100 mT20 ']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickLogin() {
        driver.findElement(loginLink).click();
    }

    public void enterMobileNumber(String mobile) {
        driver.findElement(mobileNumber).sendKeys(mobile);
    }

    public void enterPassword(String pwd) {
        driver.findElement(password).sendKeys(pwd);
    }

    public void clickLoginButton() {
        driver.findElement(loginButton).click();
    }
}