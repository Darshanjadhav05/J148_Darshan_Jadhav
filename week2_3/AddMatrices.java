import java.util.Scanner;

public class AddMatrices {

	public static void main(String[] args) {
		 Scanner sc = new Scanner(System.in);
	     System.out.print("Enter number of rows and columns: ");
	     int rows = sc.nextInt(), cols = sc.nextInt();
	     int[][] mat1 = new int[rows][cols], mat2 = new int[rows][cols], sum = new int[rows][cols];

	     System.out.println("Enter elements of first matrix:");
	     for (int i = 0; i < rows; i++)
	         for (int j = 0; j < cols; j++)
	              mat1[i][j] = sc.nextInt();

	     System.out.println("Enter elements of second matrix:");
	     for (int i = 0; i < rows; i++)
	         for (int j = 0; j < cols; j++)
	              mat2[i][j] = sc.nextInt();

	     System.out.println("Sum of matrices:");
	     for (int i = 0; i < rows; i++) {
	          for (int j = 0; j < cols; j++) {
	              sum[i][j] = mat1[i][j] + mat2[i][j];
	              System.out.print(sum[i][j] + " ");
	         }
	         System.out.println();
	      }

	}

}
