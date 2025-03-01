import java.util.Scanner;

public class UniqueCharacters {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.next();

        boolean[] present = new boolean[256];

        System.out.print("Unique characters: ");
        for (char c : str.toCharArray()) {
            if (!present[c]) {
                System.out.print(c);
                present[c] = true;
            }
        }

	}

}
