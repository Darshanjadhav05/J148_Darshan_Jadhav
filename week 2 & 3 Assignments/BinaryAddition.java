import java.util.Scanner;

public class BinaryAddition {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter first binary string: ");
        String binary1 = sc.next();
        System.out.print("Enter second binary string: ");
        String binary2 = sc.next();

        int i = binary1.length() - 1;
        int j = binary2.length() - 1;
        int carry = 0;
        StringBuilder result = new StringBuilder();

        while (i >= 0 || j >= 0 || carry > 0) {
            int bit1 = (i >= 0) ? binary1.charAt(i--) - '0' : 0;
            int bit2 = (j >= 0) ? binary2.charAt(j--) - '0' : 0;
            int sum = bit1 + bit2 + carry;
            result.append(sum % 2);
            carry = sum / 2;
        }

        System.out.println("Binary sum: " + result.reverse().toString());

	}

}
