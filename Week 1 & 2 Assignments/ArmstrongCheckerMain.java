import java.util.Scanner;

class ArmstrongChecker {
    public static boolean isArmstrong(int num) {
        int originalNum = num, remainder, result = 0;
        int n = String.valueOf(num).length();
        while (num != 0) {
            remainder = num % 10;
            result += Math.pow(remainder, n);
            num /= 10;
        }
        return result == originalNum;
    }
}

public class ArmstrongCheckerMain {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a Number: ");
		int num = sc.nextInt();
		System.out.println("Armstrong: " + ArmstrongChecker.isArmstrong(num));

	}

}
