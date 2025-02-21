import java.util.Scanner;

public class No_Palindrome {

	public static void main(String[] args) {
		 int num , rev = 0;
		 Scanner sc = new Scanner(System.in);
		 System.out.println("Enter a number: ");
		 num = sc.nextInt();
		 int temp = num;
	     while (temp > 0) {
	         rev = rev * 10 + temp % 10;
	         temp /= 10;
	     }
	      System.out.println(num + " is palindrome: " + (num == rev));
	  }

}
