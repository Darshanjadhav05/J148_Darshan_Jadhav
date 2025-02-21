import java.util.Scanner;

public class Addition {

	public static void main(String[] args) {
		 int a, b ;
		 Scanner sc = new Scanner(System.in);
		 System.out.println("Enter two numbers: ");
		 a = sc.nextInt();
		 b = sc.nextInt();
	     System.out.println("Sum: " + (a + b));
	        
	     String binary1 = "1010", binary2 = "1101";
	     int sum = Integer.parseInt(binary1, 2) + Integer.parseInt(binary2, 2);
	     System.out.println("Binary Sum: " + Integer.toBinaryString(sum));
	        
	     char c1, c2;
	     System.out.println("Enter two character: ");
		 c1 = sc.next().charAt(0);
		 c2 = sc.next().charAt(0);
		 

	     System.out.println("Character Sum: " + (c1 + c2));
	}

}
