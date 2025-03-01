import java.util.Scanner;

public class CountDigitOccurrence {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number (N): ");
        int N = sc.nextInt();
        System.out.print("Enter the digit to count (D): ");
        int D = sc.nextInt();

        int count = 0, temp = N;
        while (temp > 0) {
            if (temp % 10 == D) {
                count++;
            }
            temp /= 10;
        }

        System.out.println("The total count of digit " + D + " occurring in the number " + N + " is: " + count);

	}

}
