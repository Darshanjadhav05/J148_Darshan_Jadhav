import java.util.Scanner;

public class PrimeCheck {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a number: ");
		int num = sc.nextInt();
        System.out.println(num + " is prime: " + isPrime(num));
    }
    static boolean isPrime(int n) {
        if (n <= 1) {
        	return false;        	
        }
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
            	return false;            	
            }
        }
        return true;
    }

}
