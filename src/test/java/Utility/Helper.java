package Utility;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
public class Helper {
    public static void capturedScreenShot(WebDriver driver) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            String date =
                    new SimpleDateFormat("MM_dd_yyyy_HH_mm_ss")
                    .format(new Date());
            File destination =
                    new File("./Screenshots/CarTrawlers_" + date + ".png");
            FileUtils.copyFile(source, destination);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}