import java.util.Scanner;

class PatternPrinter {
    public static void printPattern(int n) {
        if (n < 1) return;
        printPattern(n - 1);
        for (int i = 0; i < n; i++) System.out.print("* ");
        System.out.println();
    }
}

public class PatternPrinterMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter Number of Rows: ");
		int num = sc.nextInt();
		PatternPrinter.printPattern(num);

	}

}
