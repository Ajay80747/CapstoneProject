package Utility;
import java.io.FileInputStream;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
public class ExcelDataProvider {
    Workbook workbook;
    public ExcelDataProvider() {
        try {
            FileInputStream file =
                    new FileInputStream("./TestData/TestData.xlsx");
            workbook = WorkbookFactory.create(file);
       } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public String getData(String sheetName, int row, int column) {
        return workbook
                .getSheet(sheetName)
                .getRow(row)
                .getCell(column)
                .toString();
    }
}