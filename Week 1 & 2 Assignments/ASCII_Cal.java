import java.util.Scanner;

public class ASCII_Cal {

	public static void main(String[] args) {
		char c1;
		Scanner sc = new Scanner(System.in);
	    System.out.println("Enter a character: ");
		c1 = sc.next().charAt(0);
		System.out.println("ASCII value: " + (int)c1);

	}

}
