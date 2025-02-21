import java.util.Scanner;

public class Compound_Int {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

        System.out.print("Enter Principal amount: ");
        double p = sc.nextDouble();

        System.out.print("Enter Rate of interest (in %): ");
        double r = sc.nextDouble();

        System.out.print("Enter Time period (in years): ");
        double t = sc.nextDouble();

        double ci = p * Math.pow((1 + r / 100), t);

        System.out.println("Compound Interest: " + ci);
	}

}
