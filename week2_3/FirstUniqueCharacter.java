import java.util.Scanner;

public class FirstUniqueCharacter {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.next();

        int[] freq = new int[256];

        for (char c : str.toCharArray()) {
            freq[c]++;
        }

        for (int i = 0; i < str.length(); i++) {
            if (freq[str.charAt(i)] == 1) {
                System.out.println("First unique character: " + str.charAt(i));
                return;
            }
        }

        System.out.println("No unique character found.");

	}

}
