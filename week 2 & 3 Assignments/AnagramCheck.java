import java.util.Scanner;

public class AnagramCheck {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter first string: ");
        String str1 = sc.next();
        System.out.print("Enter second string: ");
        String str2 = sc.next();

        if (str1.length() != str2.length()) {
            System.out.println("Not an anagram.");
            return;
        }

        int[] freq = new int[256];
        for (char c : str1.toCharArray()) {
            freq[c]++;
        }
        for (char c : str2.toCharArray()) {
            freq[c]--;
        }

        for (int i = 0; i < 256; i++) {
            if (freq[i] != 0) {
                System.out.println("Not an anagram.");
                return;
            }
        }

        System.out.println("Strings are anagrams.");

	}

}
