import java.util.Scanner;

public class ToggleString {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.next();

        char[] result = str.toCharArray();
        for (int i = 0; i < result.length; i++) {
            if (result[i] >= 'A' && result[i] <= 'Z') {
                result[i] = (char) (result[i] + 32);
            } else if (result[i] >= 'a' && result[i] <= 'z') {
                result[i] = (char) (result[i] - 32);
            }
        }

        System.out.println("Toggled string: " + new String(result));

	}

}
