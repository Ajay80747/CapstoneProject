package Utility;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class BrowserFactory {

    public static WebDriver BrowserOptions(WebDriver driver, String browserName, String appUrl) {

        if (browserName.equalsIgnoreCase("chrome")) {
            driver = new ChromeDriver();
        } else if (browserName.equalsIgnoreCase("firefox")) {
            driver = new FirefoxDriver();
        } else if (browserName.equalsIgnoreCase("edge")) {
            driver = new EdgeDriver();
        } else {
            throw new IllegalArgumentException("Browser not supported: " + browserName);
        }        driver.manage().window().maximize();
        driver.get(appUrl);
        return driver;
    }
    public static void quitBrowser(WebDriver driver) {
        if (driver != null) {
            driver.quit();
        }
    }
}