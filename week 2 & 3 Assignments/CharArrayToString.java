import java.util.Scanner;

public class CharArrayToString {

	public static void main(String[] args) {
		 Scanner sc = new Scanner(System.in);
	     System.out.print("Enter size of character array: ");
	     int n = sc.nextInt();
	     char[] charArray = new char[n];

	     System.out.println("Enter characters:");
	     for (int i = 0; i < n; i++) {
	          charArray[i] = sc.next().charAt(0);
	      }

	     String result = "";
	     for (char c : charArray) {
	          result += c;
	      }

	      System.out.println("Converted string: " + result);

	}

}
