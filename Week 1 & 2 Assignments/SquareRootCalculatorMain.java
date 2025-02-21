import java.util.Scanner;

class SquareRootCalculator {
    public static double sqrt(int num) {
        double t;
        double sqrtRoot = num / 2;
        do {
            t = sqrtRoot;
            sqrtRoot = (t + (num / t)) / 2;
        } while ((t - sqrtRoot) != 0);
        return sqrtRoot;
    }
}
public class SquareRootCalculatorMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a number: ");
		int num = sc.nextInt();
		System.out.println("Square Root: " + SquareRootCalculator.sqrt(num));
	}

}
