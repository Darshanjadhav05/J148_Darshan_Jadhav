import java.util.Scanner;

public class ReplaceDigits {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string with digits: ");
        String str = sc.next();

        char[] result = str.toCharArray();
        for (int i = 0; i < result.length; i++) {
            if (result[i] >= '0' && result[i] <= '9') {
                result[i] = (char) ('A' + (result[i] - '0'));
            }
        }

        System.out.println("Modified string: " + new String(result));

	}

}
