import java.util.Scanner;

public class AreaRectangle {

	public static void main(String[] args) {
		int length, width ;
		Scanner sc = new Scanner(System.in);
		length = sc.nextInt();
		width = sc.nextInt();
        System.out.println("Area: " + (length * width));
	}

}
